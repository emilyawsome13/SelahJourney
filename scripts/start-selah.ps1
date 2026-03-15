[CmdletBinding()]
param(
    [int]$Port = 4173
)

$ErrorActionPreference = "Stop"

$root = Split-Path $PSScriptRoot -Parent
$dataDir = Join-Path $root "data"
$urlPath = Join-Path $dataDir "lan-url.txt"

New-Item -ItemType Directory -Force -Path $dataDir | Out-Null

& (Join-Path $PSScriptRoot "stop-remote-access.ps1") -Port $Port | Out-Null
$serverResult = & (Join-Path $PSScriptRoot "start-hidden-server.ps1") -Port $Port -BindHost "0.0.0.0"

$lanIp = ipconfig | ForEach-Object {
    if ($_ -match "IPv4[^:]*:\s*(?<ip>(\d{1,3}\.){3}\d{1,3})") {
        $matches.ip
    }
} | Where-Object {
    $_ -and $_ -notlike "127.*" -and $_ -notlike "169.254.*"
} | Select-Object -First 1

$localUrl = "http://localhost:$Port"
if ($lanIp) {
    $lanUrl = "http://${lanIp}:$Port"
    Set-Content -Path $urlPath -Value $lanUrl -Encoding ascii
    Write-Output $serverResult
    Write-Output "LOCAL_URL:$localUrl"
    Write-Output "LAN_URL:$lanUrl"
} else {
    Remove-Item -LiteralPath $urlPath -Force -ErrorAction SilentlyContinue
    Write-Output $serverResult
    Write-Output "LOCAL_URL:$localUrl"
    Write-Output "LAN_URL_UNAVAILABLE"
}
