#!/usr/bin/env python3
"""
Servidor simple para el Dashboard All In One Empire
Ejecutar: python servidor.py
Luego abrir: http://localhost:8000
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def main():
    try:
        with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
            print("🚀 Servidor iniciado en http://localhost:{}".format(PORT))
            print("📁 Sirviendo archivos desde: {}".format(os.getcwd()))
            print("🔄 El servidor se recargará automáticamente al cambiar archivos")
            print("⏹️  Presiona Ctrl+C para detener el servidor")
            print("-" * 50)

            # Intentar abrir el navegador automáticamente
            try:
                webbrowser.open('http://localhost:{}'.format(PORT))
                print("🌐 Navegador abierto automáticamente")
            except:
                print("🌐 Abre manualmente: http://localhost:{}".format(PORT))

            print("-" * 50)
            httpd.serve_forever()

    except KeyboardInterrupt:
        print("\n⏹️  Servidor detenido por el usuario")
        sys.exit(0)
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Error: El puerto {PORT} ya está en uso")
            print("💡 Intenta detener otros servidores o usa otro puerto")
        else:
            print(f"❌ Error inesperado: {e}")
        sys.exit(1)

if __name__ == "__main__":
    # Verificar que los archivos necesarios existen
    required_files = ['index.html', 'dashboard-all-in-one-empire.jsx', 'styles.css']
    missing_files = [f for f in required_files if not os.path.exists(f)]

    if missing_files:
        print(f"❌ Error: Faltan archivos necesarios: {', '.join(missing_files)}")
        sys.exit(1)

    main()