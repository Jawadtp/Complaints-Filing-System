from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from . import db
import os
import datetime

# cors = CORS()

def init_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', '12345678')
    app.config['DATABASE_URL'] = 'dbname=complaints'
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = datetime.timedelta(days=30)
    jwt = JWTManager(app)
    CORS(app)
    db.init_app(app)


    with app.app_context():

        from . import routes

        return app