[CmdletBinding()]
param(
    [int]$Port = 4173
)

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "stop-remote-access.ps1") -Port $Port
Remove-Item -LiteralPath (Join-Path (Split-Path $PSScriptRoot -Parent) "data\\lan-url.txt") -Force -ErrorAction SilentlyContinue
