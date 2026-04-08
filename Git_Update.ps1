Set-Location $PSScriptRoot
$Date = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
git pull origin main
git add .
git commit -m "$Date"
git push