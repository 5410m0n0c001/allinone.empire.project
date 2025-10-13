@echo off
echo 🚀 Iniciando servidor para Dashboard All In One Empire (Vanilla)
echo 📁 Archivos desde: %~dp0
echo 🌐 Servidor: http://localhost:8000
echo ⏹️  Presiona Ctrl+C para detener
echo.

REM Crear un servidor simple usando PowerShell
powershell -Command "& { 
    try {
        $Runspace = [runspacefactory]::CreateRunspace()
        $PowerShell = [powershell]::Create()
        $PowerShell.Runspace = $Runspace
        $Runspace.Open()

        $code = {
            Add-Type -AssemblyName System.Net
            $listener = New-Object System.Net.HttpListener
            $listener.Prefixes.Add('http://localhost:8000/')
            $listener.Start()
            Write-Host '✅ Servidor iniciado en http://localhost:8000'
            Write-Host '📁 Sirviendo archivos desde:' (Get-Location).Path
            Write-Host '⏹️  Presiona Ctrl+C para detener...'
            Write-Host ''

            while ($listener.IsListening) {
                try {
                    $context = $listener.GetContext()
                    $request = $context.Request
                    $response = $context.Response

                    $localPath = $request.Url.LocalPath
                    if ($localPath -eq '/' -or $localPath -eq '') {
                        $localPath = '/dashboard-vanilla.html'
                    }

                    $filePath = Join-Path (Get-Location) $localPath.TrimStart('/')
                    $filePath = $filePath.Replace('%20', ' ')

                    Write-Host ('📄 Solicitud: ' + $localPath) -ForegroundColor Gray

                    if (Test-Path $filePath -PathType Leaf) {
                        $content = Get-Content $filePath -Raw -Encoding UTF8
                        $contentType = switch ([IO.Path]::GetExtension($filePath)) {
                            '.html' { 'text/html; charset=utf-8' }
                            '.css' { 'text/css; charset=utf-8' }
                            '.js' { 'application/javascript; charset=utf-8' }
                            '.json' { 'application/json; charset=utf-8' }
                            default { 'application/octet-stream' }
                        }

                        $buffer = [System.Text.Encoding]::UTF8.GetBytes($content)
                        $response.ContentType = $contentType
                        $response.ContentLength64 = $buffer.Length
                        $response.OutputStream.Write($buffer, 0, $buffer.Length)
                        Write-Host ('✅ ' + $contentType + ' - ' + $buffer.Length + ' bytes') -ForegroundColor Green
                    } else {
                        $response.StatusCode = 404
                        $notFound = '<!DOCTYPE html><html><head><title>404 - No encontrado</title><style>body{font-family:Arial,sans-serif;text-align:center;padding:50px;color:#666;}</style></head><body><h1>404 - Archivo no encontrado</h1><p>No se pudo encontrar el archivo solicitado: ' + $localPath + '</p><p><a href="/dashboard-vanilla.html">← Volver al Dashboard</a></p></body></html>'
                        $buffer = [System.Text.Encoding]::UTF8.GetBytes($notFound)
                        $response.OutputStream.Write($buffer, 0, $buffer.Length)
                        Write-Host ('❌ 404 - Archivo no encontrado: ' + $localPath) -ForegroundColor Red
                    }

                    $response.OutputStream.Close()
                }
                catch {
                    Write-Host ('❌ Error procesando solicitud: ' + $_.Exception.Message) -ForegroundColor Red
                }
            }

            $listener.Stop()
        }

        $PowerShell.AddScript($code)
        $PowerShell.BeginInvoke()
    }
    catch {
        Write-Host '❌ Error iniciando servidor PowerShell:' $_.Exception.Message -ForegroundColor Red
        Write-Host ''
        Write-Host '💡 Soluciones alternativas:' -ForegroundColor Yellow
        Write-Host '   1. Abre dashboard-vanilla.html directamente en tu navegador' -ForegroundColor Gray
        Write-Host '   2. Usa la extensión Live Server de VS Code' -ForegroundColor Gray
        Write-Host '   3. Usa un servidor local como XAMPP o similar' -ForegroundColor Gray
        Write-Host ''
        Write-Host '🌐 Archivo principal: dashboard-vanilla.html' -ForegroundColor Cyan
    }
}"

echo.
echo 💡 Si el servidor no inicia, abre dashboard-vanilla.html directamente en tu navegador
echo 🌐 O usa la extensión Live Server de VS Code
pause