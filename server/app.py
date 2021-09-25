from api import init_app
from flask import sock
from flask import socket

sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

app = init_app()

if __name__ == "__main__":
    app.run()