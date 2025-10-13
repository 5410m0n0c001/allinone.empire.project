@echo off
echo 🚀 Iniciando servidor para All In One Empire Dashboard
echo 📁 Archivos desde: %~dp0
echo 🌐 Servidor: http://localhost:8000
echo ⏹️  Presiona Ctrl+C para detener
echo.

REM Verificar si Python está disponible
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Usando Python
    python servidor.py
) else (
    echo ⚠️  Python no encontrado, intentando alternativas...

    REM Intentar con PowerShell
    powershell -Command "& {try { $Runspace = [runspacefactory]::CreateRunspace(); $PowerShell = [powershell]::Create(); $PowerShell.Runspace = $Runspace; $Runspace.Open(); $code = { $httpd = New-Object System.Net.HttpListener; $httpd.Prefixes.Add('http://localhost:8000/'); $httpd.Start(); Write-Host 'Servidor iniciado en http://localhost:8000'; Write-Host 'Presiona Ctrl+C para detener...'; while ($httpd.IsListening) { $ctx = $httpd.GetContext(); $req = $ctx.Request; $resp = $ctx.Response; $localPath = $req.Url.LocalPath; if ($localPath -eq '/') { $localPath = '/index.html' }; $filePath = Join-Path (Get-Location) $localPath.TrimStart('/'); if (Test-Path $filePath -PathType Leaf) { $content = Get-Content $filePath -Raw -Encoding UTF8; $resp.ContentType = if ($filePath.EndsWith('.html')) { 'text/html; charset=utf-8' } elseif ($filePath.EndsWith('.css')) { 'text/css; charset=utf-8' } elseif ($filePath.EndsWith('.js')) { 'application/javascript; charset=utf-8' } else { 'application/octet-stream' }; $buffer = [System.Text.Encoding]::UTF8.GetBytes($content); $resp.ContentLength64 = $buffer.Length; $resp.OutputStream.Write($buffer, 0, $buffer.Length) } else { $resp.StatusCode = 404; $notFound = '<h1>404 - Archivo no encontrado</h1>'; $buffer = [System.Text.Encoding]::UTF8.GetBytes($notFound); $resp.OutputStream.Write($buffer, 0, $buffer.Length) }; $resp.OutputStream.Close() }; $httpd.Stop() }; $PowerShell.BeginInvoke() } catch { Write-Host 'Error con PowerShell, intentando método alternativo...' }}"
)

echo.
echo 💡 Si no funciona, abre index.html directamente en tu navegador
echo 🌐 O usa la extensión Live Server de VS Code
pause