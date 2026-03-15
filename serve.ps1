[CmdletBinding()]
param(
    [int]$Port = 4173
)

$ErrorActionPreference = 'Stop'

$node = Get-Command node -ErrorAction Stop
$serverPath = Join-Path $PSScriptRoot 'server.js'

if (-not (Test-Path -LiteralPath $serverPath)) {
    throw "Missing server.js at $serverPath"
}

& $node.Source $serverPath $Port
