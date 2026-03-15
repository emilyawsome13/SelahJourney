[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$targetDir = Join-Path $root 'library'

if (-not (Test-Path -LiteralPath $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir | Out-Null
}

$items = @(
    @{ slug = 'bible-stories'; title = 'Bible Stories' }
    @{ slug = 'bible-topics'; title = 'Bible Topics' }
    @{ slug = 'bible-history'; title = 'Bible History' }
    @{ slug = 'king-james-bible-preface'; title = 'King James Bible Preface' }
    @{ slug = 'the-translators-speech'; title = 'The Translators Speech' }
    @{ slug = 'title-page'; title = 'Title Page' }
    @{ slug = 'hampton-court'; title = 'Hampton Court' }
    @{ slug = 'king-james-translators'; title = 'King James Translators' }
    @{ slug = 'instructions-to-the-translators'; title = 'Instructions to the Translators' }
    @{ slug = 'great-fire-of-london'; title = 'Great Fire of London' }
    @{ slug = 'textus-receptus'; title = 'Textus Receptus' }
    @{ slug = 'masoretic-text'; title = 'Masoretic Text' }
    @{ slug = 'margin-notes'; title = 'Margin Notes' }
    @{ slug = 'strongs-numbers'; title = 'Strongs Numbers' }
    @{ slug = 'bible-facts-statistics'; title = 'Bible Facts & Statistics' }
)

foreach ($item in $items) {
    $content = @"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>$($item.title) | Kings Bible Compass</title>
  <meta name="description" content="A local study page for $($item.title).">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/styles.css">
  <link rel="stylesheet" href="/library-detail.css">
</head>
<body class="detail-body" data-library-slug="$($item.slug)">
  <div class="detail-shell">
    <header class="detail-topbar">
      <a class="ghost-link" href="/index.html?panel=library">Back to library</a>
      <div class="detail-mark" id="detailMark" aria-hidden="true"></div>
      <a class="ghost-link" href="/index.html">Open main app</a>
    </header>

    <main id="detailRoot" class="detail-root">
      <section class="detail-loading">
        <div class="panel-kicker">Loading</div>
        <h1>Building study page...</h1>
      </section>
    </main>
  </div>

  <script src="/library-data.js"></script>
  <script src="/library-detail.js"></script>
</body>
</html>
"@

    Set-Content -LiteralPath (Join-Path $targetDir "$($item.slug).html") -Value $content -Encoding utf8
}

Write-Host "Built $($items.Count) library pages in $targetDir"
