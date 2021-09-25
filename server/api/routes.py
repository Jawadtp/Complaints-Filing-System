from flask import current_app as app
from flask import render_template, request, make_response
from flask.helpers import url_for
from psycopg2 import sql, connect
from flask_login import login_user, logout_user, current_user, login_required


@app.route('/', methods=['GET', 'POST'])
def main():
    if request.method == 'GET':
        return "Hello World"



@app.errorhandler(404)
def error1(a):
    return make_response("404 Not Found", 404)


@app.errorhandler(400)
def error2(a):
    return make_response("400 Invalid Request", 400)


@app.errorhandler(500)
def error3(a):
    return make_response("500 Internal Server Error", 500)
