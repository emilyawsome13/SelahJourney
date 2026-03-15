[CmdletBinding()]
param(
    [int]$Port = 4173,
    [string]$BindHost = "127.0.0.1"
)

$ErrorActionPreference = "Stop"

$root = Split-Path $PSScriptRoot -Parent
$dataDir = Join-Path $root "data"
$serverPath = Join-Path $root "server.js"
$logPath = Join-Path $dataDir "server.log"
$errorPath = Join-Path $dataDir "server-error.log"
$pidPath = Join-Path $dataDir "server.pid"

New-Item -ItemType Directory -Force -Path $dataDir | Out-Null

if (Test-Path -LiteralPath $pidPath) {
    $trackedPid = 0
    $trackedPidValue = Get-Content -Path $pidPath -Raw
    if ([int]::TryParse($trackedPidValue.Trim(), [ref]$trackedPid)) {
        $trackedProcess = Get-Process -Id $trackedPid -ErrorAction SilentlyContinue
        if (-not $trackedProcess) {
            Remove-Item -LiteralPath $pidPath -Force -ErrorAction SilentlyContinue
        }
    } else {
        Remove-Item -LiteralPath $pidPath -Force -ErrorAction SilentlyContinue
    }
}

$existingListener = Get-NetTCPConnection -State Listen -LocalPort $Port -ErrorAction SilentlyContinue | Select-Object -First 1
if ($existingListener) {
    $trackedPid = 0
    $trackedMatchesListener = $false
    if (Test-Path -LiteralPath $pidPath) {
        $trackedPidValue = Get-Content -Path $pidPath -Raw
        if ([int]::TryParse($trackedPidValue.Trim(), [ref]$trackedPid)) {
            $trackedMatchesListener = ($existingListener.OwningProcess -eq $trackedPid)
        }
    }

    if ($trackedMatchesListener) {
        Write-Output "SERVER_ALREADY_RUNNING:$trackedPid"
        exit 0
    }

    throw "Port $Port is already in use by PID $($existingListener.OwningProcess). Stop that process before starting Selah Journey."
}

$node = Get-Command node -ErrorAction Stop
if (-not (Test-Path -LiteralPath $serverPath)) {
    throw "Missing server.js at $serverPath"
}

Remove-Item -LiteralPath $logPath -Force -ErrorAction SilentlyContinue
Remove-Item -LiteralPath $errorPath -Force -ErrorAction SilentlyContinue

$process = Start-Process -FilePath $node.Source `
    -ArgumentList @("`"$serverPath`"", "$Port", "$BindHost") `
    -WorkingDirectory $root `
    -WindowStyle Hidden `
    -RedirectStandardOutput $logPath `
    -RedirectStandardError $errorPath `
    -PassThru

Set-Content -Path $pidPath -Value $process.Id -Encoding ascii
Start-Sleep -Seconds 2

if ($process.HasExited) {
    $serverError = if (Test-Path $errorPath) { (Get-Content $errorPath -Raw) } else { "" }
    throw "Server exited early. $serverError"
}

Write-Output "SERVER_STARTED:$($process.Id)"
