[CmdletBinding()]
param(
    [int]$Port = 4173,
    [string]$PublicHost = ""
)

$ErrorActionPreference = "Stop"

$root = Split-Path $PSScriptRoot -Parent
$dataDir = Join-Path $root "data"
$sshLog = Join-Path $dataDir "public-tunnel.log"
$sshError = Join-Path $dataDir "public-tunnel-error.log"
$pidPath = Join-Path $dataDir "public-tunnel.pid"
$urlPath = Join-Path $dataDir "public-url.txt"

New-Item -ItemType Directory -Force -Path $dataDir | Out-Null

if (Test-Path -LiteralPath $pidPath) {
    $trackedPid = 0
    $trackedPidValue = Get-Content -Path $pidPath -Raw
    if ([int]::TryParse($trackedPidValue.Trim(), [ref]$trackedPid)) {
        try {
            Stop-Process -Id $trackedPid -Force -ErrorAction Stop
            Start-Sleep -Seconds 1
        } catch {
        }
    }

    Remove-Item -LiteralPath $pidPath -Force -ErrorAction SilentlyContinue
}

$existingTunnelProcesses = Get-CimInstance Win32_Process -Filter "name = 'ssh.exe'" -ErrorAction SilentlyContinue | Where-Object {
    $_.CommandLine -and $_.CommandLine.Contains("localhost.run") -and $_.CommandLine.Contains("localhost:$Port")
}
foreach ($existingTunnelProcess in $existingTunnelProcesses) {
    try {
        Stop-Process -Id $existingTunnelProcess.ProcessId -Force -ErrorAction Stop
    } catch {
    }
}

Remove-Item -LiteralPath $urlPath -Force -ErrorAction SilentlyContinue
Remove-Item -LiteralPath $sshLog -Force -ErrorAction SilentlyContinue
Remove-Item -LiteralPath $sshError -Force -ErrorAction SilentlyContinue

$ssh = Get-Command ssh -ErrorAction Stop
$remoteTarget = "nokey@localhost.run"
$remoteBind = "80:localhost:$Port"
if ($PublicHost) {
    $remoteTarget = "plan@localhost.run"
    $remoteBind = "${PublicHost}:80:localhost:$Port"
}

$arguments = @(
    "-o", "ExitOnForwardFailure=yes",
    "-o", "ServerAliveInterval=30",
    "-o", "StrictHostKeyChecking=no",
    "-R", $remoteBind,
    $remoteTarget
)

$process = Start-Process -FilePath $ssh.Source `
    -ArgumentList $arguments `
    -WorkingDirectory $root `
    -WindowStyle Hidden `
    -RedirectStandardOutput $sshLog `
    -RedirectStandardError $sshError `
    -PassThru

Set-Content -Path $pidPath -Value $process.Id -Encoding ascii

$publicUrl = ""
for ($i = 0; $i -lt 20; $i++) {
    Start-Sleep -Seconds 1

    $combined = ""
    if (Test-Path $sshLog) {
        $combined += [Environment]::NewLine + (Get-Content $sshLog -Raw)
    }
    if (Test-Path $sshError) {
        $combined += [Environment]::NewLine + (Get-Content $sshError -Raw)
    }

    $match = [regex]::Match($combined, "https://[^\s]+")
    if ($match.Success) {
        $publicUrl = $match.Value.Trim()
        break
    }

    if ($process.HasExited) {
        break
    }
}

if (-not $publicUrl) {
    $combined = ""
    if (Test-Path $sshLog) {
        $combined += [Environment]::NewLine + (Get-Content $sshLog -Raw)
    }
    if (Test-Path $sshError) {
        $combined += [Environment]::NewLine + (Get-Content $sshError -Raw)
    }
    try {
        if (-not $process.HasExited) {
            Stop-Process -Id $process.Id -Force -ErrorAction Stop
        }
    } catch {
    }
    Remove-Item -LiteralPath $pidPath -Force -ErrorAction SilentlyContinue
    Remove-Item -LiteralPath $urlPath -Force -ErrorAction SilentlyContinue
    throw "Tunnel did not produce a public URL. $combined"
}

Set-Content -Path $urlPath -Value $publicUrl -Encoding ascii
Write-Output $publicUrl
