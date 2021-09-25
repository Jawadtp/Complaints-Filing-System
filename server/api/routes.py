from flask import request, make_response, jsonify
from flask import current_app as app
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import json
from . import db


@app.route('/complaints/', methods=['GET', 'POST'])
def home():
    if request.method == 'GET':
        return db.get_tiles()
    else:
        db.new_complaint(json.loads(request.data))
        return make_response(jsonify({'message': 'Complaint added'}), 201)

@app.route('/complaints/<tag>/')
def get_tiles_by_tag(tag):
    return db.get_tiles_by_tag(tag)

@app.route("/complaints/<int:cid>/")
def get_complaint(cid):
    return db.get_complaint_details(cid)

@app.route("/complaints/<int:cid>/upvote/", methods=['POST'])
def upvote(cid):
    db.vote(cid)
    return make_response(jsonify({'message': 'success'}), 201)

@app.route("/complaints/<int:cid>/comment/", methods=['POST'])
def comment(cid):
    data = json.loads(request.data)
    db.add_comment(cid, data['comment'], data['rollno'])
    return make_response(jsonify({'message': 'Comment added'}), 201)

@app.route("/admin/", methods=['POST'])
def login():
    data = json.loads(request.data)
    user = db.auth(data['username'], data['password'])
    if user:
        access_token = create_access_token(identity=user.username)
        return {'access_token': access_token}
    else:
        return make_response(jsonify(message='Invalid credentials'), 401)

@app.route("/complaints/<int:cid>/edit/", methods=['POST'])
@jwt_required
def edit(cid):
    db.edit_complaint(cid, json.loads(request.data))
    return make_response(jsonify({'message': 'Complaint edited'}), 201)

@app.route("/admins/")
@jwt_required
def get_admins():
    return db.get_admins()


@app.errorhandler(404)
def error1(a):
    return make_response("404 Not Found", 404)


@app.errorhandler(400)
def error2(a):
    return make_response("400 Invalid Request", 400)


@app.errorhandler(500)
def error3(a):
    return make_response("500 Internal Server Error", 500)
