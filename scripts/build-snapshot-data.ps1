[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$dataDir = Join-Path $root 'data'

if (-not (Test-Path -LiteralPath $dataDir)) {
    New-Item -ItemType Directory -Path $dataDir | Out-Null
}

function Get-HtmlRaw {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Path
    )

    Get-Content -LiteralPath $Path -Raw
}

function Decode-HtmlText {
    param(
        [AllowNull()]
        [string]$Value
    )

    if ($null -eq $Value) {
        return ''
    }

    $decoded = $Value -replace '&nbsp;', ' '
    $decoded = [System.Net.WebUtility]::HtmlDecode($decoded)
    $decoded = $decoded -replace '\s+', ' '

    return $decoded.Trim()
}

function Strip-HtmlToText {
    param(
        [AllowNull()]
        [string]$Value
    )

    if ($null -eq $Value) {
        return ''
    }

    $clean = $Value -replace '<br\s*/?>', ' '
    $clean = $clean -replace '<[^>]+>', ' '
    $clean = Decode-HtmlText $clean

    return $clean
}

function Keep-SafeInlineHtml {
    param(
        [AllowNull()]
        [string]$Value
    )

    if ($null -eq $Value) {
        return ''
    }

    $clean = $Value -replace '<biblenote>(.*?)</biblenote>', '<mark>$1</mark>'
    $clean = $clean -replace '<i>(.*?)</i>', '<em>$1</em>'
    $clean = $clean -replace '<\/?a[^>]*>', ''
    $clean = Decode-HtmlText $clean

    return $clean
}

function Get-Matches {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Html,
        [Parameter(Mandatory = $true)]
        [string]$Pattern
    )

    $options = [System.Text.RegularExpressions.RegexOptions]::IgnoreCase `
        -bor [System.Text.RegularExpressions.RegexOptions]::Singleline

    [System.Text.RegularExpressions.Regex]::Matches($Html, $Pattern, $options)
}

$files = [ordered]@{
    home        = Join-Path $root 'King James Bible Online.html'
    advanced    = Join-Path $root 'Advanced Bible Search.html'
    chapter     = Join-Path $root 'King James Bible - Genesis _span class=_redletter__Chapter_ 1__span_.html'
    dictionary  = Join-Path $root 'Kings Bible Dictionary.html'
    concordance = Join-Path $root 'Kings Bible Concordance -.html'
    atlas       = Join-Path $root 'Kings Bible Atlas -.html'
    library     = Join-Path $root 'The Kings Bible Library.html'
}

$homeHtml = Get-HtmlRaw $files.home
$advancedHtml = Get-HtmlRaw $files.advanced
$chapterHtml = Get-HtmlRaw $files.chapter
$dictionaryHtml = Get-HtmlRaw $files.dictionary
$concordanceHtml = Get-HtmlRaw $files.concordance
$atlasHtml = Get-HtmlRaw $files.atlas
$libraryHtml = Get-HtmlRaw $files.library

$bookMatches = Get-Matches $homeHtml '<li(?: class="[^"]*")?>\s*<a href="/Bible/(?<id>\d+)/1">(?<name>.*?)</a></li>'
$books = foreach ($match in $bookMatches) {
    $name = Strip-HtmlToText $match.Groups['name'].Value

    if ([string]::IsNullOrWhiteSpace($name)) {
        continue
    }

    [pscustomobject][ordered]@{
        id        = [int]$match.Groups['id'].Value
        name      = $name
        testament = if ([int]$match.Groups['id'].Value -le 39) { 'Old Testament' } else { 'New Testament' }
    }
}

$books = $books |
    Group-Object id |
    ForEach-Object {
        $_.Group |
            Sort-Object { $_.name.Length } -Descending |
            Select-Object -First 1
    } |
    Sort-Object id

$searchFilterMatches = Get-Matches $advancedHtml '<option value="(?<value>[^"]*)">(?<label>.*?)</option>'
$searchFilters = foreach ($match in $searchFilterMatches) {
    $value = Decode-HtmlText $match.Groups['value'].Value
    $label = Strip-HtmlToText $match.Groups['label'].Value

    if ([string]::IsNullOrWhiteSpace($value)) {
        continue
    }

    [pscustomobject][ordered]@{
        value = $value
        label = $label
    }
}

$chapterAnchorMatches = Get-Matches $chapterHtml '<a href="/Bible/1/(?<chapter>\d+)" data-chapter="(?<same>\d+)">'
$genesisChapters = foreach ($match in $chapterAnchorMatches) {
    [int]$match.Groups['chapter'].Value
}

$verseMatches = Get-Matches $chapterHtml '<tr>\s*<td class="ref">(?<ref>[^<]+)</td>\s*<td>(?<text>.*?)</td>\s*<td class="glyph">'
$genesisVerses = foreach ($match in $verseMatches) {
    $reference = Strip-HtmlToText $match.Groups['ref'].Value
    $html = Keep-SafeInlineHtml $match.Groups['text'].Value
    $text = Strip-HtmlToText $match.Groups['text'].Value
    $verseNumber = 0

    if ($reference -match ':(\d+)$') {
        $verseNumber = [int]$Matches[1]
    }

    [pscustomobject][ordered]@{
        reference   = $reference
        verseNumber = $verseNumber
        html        = $html
        text        = $text
        hasNote     = $match.Groups['text'].Value -match '<biblenote>'
    }
}

$dictionaryBulletMatches = Get-Matches $dictionaryHtml '<ul>\s*(?<items>.*?)</ul>'
$dictionaryBullets = @()
if ($dictionaryBulletMatches.Count -gt 0) {
    $dictionaryBullets = foreach ($item in (Get-Matches $dictionaryBulletMatches[0].Groups['items'].Value '<li>(?<item>.*?)</li>')) {
        Strip-HtmlToText $item.Groups['item'].Value
    }
}

$dictionaryLetters = foreach ($match in (Get-Matches $dictionaryHtml '<div class="alphabetnav">\s*(?<letters>.*?)</div>')) {
    foreach ($letter in (Get-Matches $match.Groups['letters'].Value '<a href="#">(?<letter>[A-Z])</a>')) {
        $letter.Groups['letter'].Value
    }
}
$dictionaryLetters = $dictionaryLetters | Select-Object -Unique

$concordanceParagraphs = foreach ($match in (Get-Matches $concordanceHtml '<div class="col-lg-8">\s*(?<content>.*?)</div>')) {
    foreach ($paragraph in (Get-Matches $match.Groups['content'].Value '<p(?: style="[^"]*")?>(?<text>.*?)</p>')) {
        $value = Strip-HtmlToText $paragraph.Groups['text'].Value
        if (-not [string]::IsNullOrWhiteSpace($value)) {
            $value
        }
    }
    break
}

$concordanceLetters = foreach ($match in (Get-Matches $concordanceHtml '<div class="alphabetnav">\s*(?<letters>.*?)</div>')) {
    foreach ($letter in (Get-Matches $match.Groups['letters'].Value '<a href="#">(?<letter>[A-Z])</a>')) {
        $letter.Groups['letter'].Value
    }
}
$concordanceLetters = $concordanceLetters | Select-Object -Unique

$atlasBookMatches = Get-Matches $atlasHtml '<option value="(?<value>\d+)">(?<label>.*?)</option>'
$atlasBooks = foreach ($match in $atlasBookMatches) {
    [pscustomobject][ordered]@{
        id    = [int]$match.Groups['value'].Value
        label = Strip-HtmlToText $match.Groups['label'].Value
    }
}

$atlasLetters = foreach ($match in (Get-Matches $atlasHtml '<div class="alphabetnav">\s*(?<letters>.*?)</div>')) {
    foreach ($letter in (Get-Matches $match.Groups['letters'].Value '<a href="#">(?<letter>[A-Z])</a>')) {
        $letter.Groups['letter'].Value
    }
}
$atlasLetters = $atlasLetters | Select-Object -Unique

$libraryMatches = Get-Matches $libraryHtml '<div class="library-item">\s*<a href="(?<href>[^"]+)">\s*<div class="hideoverflow(?: [^"]*)?"><img src="(?<image>[^"]+)" alt="(?<alt>[^"]+)" class="grow"></div>\s*<div class="library-item-text">\s*(?<title>.*?)\s*</div>'
$libraryItems = foreach ($match in $libraryMatches) {
    [pscustomobject][ordered]@{
        title = Strip-HtmlToText $match.Groups['title'].Value
        alt   = Strip-HtmlToText $match.Groups['alt'].Value
        image = Decode-HtmlText $match.Groups['image'].Value
        href  = Decode-HtmlText $match.Groups['href'].Value
    }
}

$snapshot = [pscustomobject][ordered]@{
    generatedAt = (Get-Date).ToString('o')
    sources = @(
        'King James Bible Online.html'
        'Advanced Bible Search.html'
        'King James Bible - Genesis _span class=_redletter__Chapter_ 1__span_.html'
        'Kings Bible Dictionary.html'
        'Kings Bible Concordance -.html'
        'Kings Bible Atlas -.html'
        'The Kings Bible Library.html'
    )
    home = [pscustomobject][ordered]@{
        title     = Strip-HtmlToText ((Get-Matches $homeHtml '<h1>(?<value>.*?)</h1>')[0].Groups['value'].Value)
        subtitle  = Strip-HtmlToText ((Get-Matches $homeHtml '<div class="subhead">(?<value>.*?)</div>')[0].Groups['value'].Value)
        books     = @($books)
        bookCount = @($books).Count
    }
    search = [pscustomobject][ordered]@{
        heading = 'Advanced Bible Search'
        filters = @($searchFilters)
    }
    sampleChapter = [pscustomobject][ordered]@{
        book            = 'Genesis'
        chapter         = 1
        chapterCount    = ($genesisChapters | Measure-Object -Maximum).Maximum
        verseCount      = @($genesisVerses).Count
        verses          = @($genesisVerses)
        glyphLegendText = 'Margin Notes, Dictionary, Atlas'
    }
    dictionary = [pscustomobject][ordered]@{
        heading = 'Bible Dictionary'
        intro = [pscustomobject][ordered]@{
            title   = 'Bible Dictionary'
            bullets = @($dictionaryBullets)
        }
        alphabet = @($dictionaryLetters)
    }
    concordance = [pscustomobject][ordered]@{
        heading    = 'Bible Concordance'
        paragraphs = @($concordanceParagraphs)
        alphabet   = @($concordanceLetters)
    }
    atlas = [pscustomobject][ordered]@{
        heading   = 'Bible Atlas'
        books     = @($atlasBooks)
        alphabet  = @($atlasLetters)
        bookCount = @($atlasBooks).Count
    }
    library = [pscustomobject][ordered]@{
        heading    = 'Study Library'
        itemCount  = @($libraryItems).Count
        items      = @($libraryItems)
        assetsPath = 'The Kings Bible Library_files'
    }
}

$outputPath = Join-Path $dataDir 'snapshot-data.json'
$snapshot | ConvertTo-Json -Depth 12 | Set-Content -LiteralPath $outputPath -Encoding utf8

Write-Host "Built $outputPath"
