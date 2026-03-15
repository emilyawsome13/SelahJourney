[CmdletBinding()]
param(
    [int]$Port = 4173,
    [string]$PublicHost = ""
)

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "stop-remote-access.ps1") -Port $Port | Out-Null

try {
    $serverResult = & (Join-Path $PSScriptRoot "start-hidden-server.ps1") -Port $Port
    $publicUrl = & (Join-Path $PSScriptRoot "start-public-tunnel.ps1") -Port $Port -PublicHost $PublicHost
} catch {
    & (Join-Path $PSScriptRoot "stop-remote-access.ps1") -Port $Port | Out-Null
    throw
}

Write-Output $serverResult
Write-Output "PUBLIC_URL:$publicUrl"
