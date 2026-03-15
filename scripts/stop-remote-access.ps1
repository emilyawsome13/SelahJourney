[CmdletBinding()]
param(
    [int]$Port = 4173
)

$ErrorActionPreference = "Stop"

$root = Split-Path $PSScriptRoot -Parent
$dataDir = Join-Path $root "data"
$pidFiles = @(
    (Join-Path $dataDir "public-tunnel.pid"),
    (Join-Path $dataDir "server.pid")
)

foreach ($pidFile in $pidFiles) {
    if (-not (Test-Path -LiteralPath $pidFile)) {
        continue
    }

    $pidValue = Get-Content -Path $pidFile -Raw
    $parsedPid = 0
    if ([int]::TryParse($pidValue.Trim(), [ref]$parsedPid)) {
        try {
            Stop-Process -Id $parsedPid -Force -ErrorAction Stop
        } catch {
        }
    }

    Remove-Item -LiteralPath $pidFile -Force -ErrorAction SilentlyContinue
}

$tunnelProcesses = Get-CimInstance Win32_Process -Filter "name = 'ssh.exe'" -ErrorAction SilentlyContinue | Where-Object {
    $_.CommandLine -and $_.CommandLine.Contains("localhost.run") -and $_.CommandLine.Contains("localhost:$Port")
}
foreach ($tunnelProcess in $tunnelProcesses) {
    try {
        Stop-Process -Id $tunnelProcess.ProcessId -Force -ErrorAction Stop
    } catch {
    }
}

$portListener = Get-NetTCPConnection -State Listen -LocalPort $Port -ErrorAction SilentlyContinue | Select-Object -First 1
if ($portListener) {
    try {
        $listeningProcess = Get-Process -Id $portListener.OwningProcess -ErrorAction Stop
        if ($listeningProcess.ProcessName -eq "node") {
            Stop-Process -Id $portListener.OwningProcess -Force -ErrorAction Stop
        }
    } catch {
    }
}

Remove-Item -LiteralPath (Join-Path $dataDir "public-url.txt") -Force -ErrorAction SilentlyContinue
Write-Output "REMOTE_ACCESS_STOPPED"
