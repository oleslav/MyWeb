from flask_cors import cross_origin

from config import *
from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from db_functionality import *


@app.route('/', methods=['GET'])
def index():
    return jsonify('index.html')


@app.route('/login', methods=['GET'])
def login():
    return jsonify('login.html')


@app.route('/logout', methods=['GET'])
def logout():
    return jsonify('login.html')


@app.route('/signup', methods=['GET'])
def signup():
    return jsonify('signup.html')


@app.route('/verify', methods=['GET'])
@auth.login_required
def verify():
    user_email = auth.current_user()
    user = get_user_by_email(user_email)
    return jsonify(id=user.id, name=user.userName, email=user.email), 200


@app.route('/signup', methods=['POST'])
@cross_origin(origin='localhost')
def signup_post():
    email = request.json.get('email', None)

    if not get_user_by_email(email) is None:
        return jsonify(status='Email already used'), 400

    password = request.json.get('password', None)
    username = email
    role = RoleEnum.user

    if username and password and email and role != RoleEnum.unknown:
        new_user = User(user_name=username, email=email, password=generate_password_hash(password), role=role)
        db.session.add(new_user)
        db.session.commit()
        return jsonify(status='User successfully created'), 201

    return jsonify(status='Oops, some fields are incorrect'), 400


@app.route('/login', methods=['POST'])
@cross_origin(origin='localhost', headers=['Content-Type', 'Authorization'])
def login_post():
    email = request.json.get('email', None)

    if email is None:
        return jsonify(status='No email'), 400

    password = request.json.get('password', None)

    if password is None:
        return jsonify(status='No password'), 400

    user = get_user_by_email(email)

    if user is None:
        return jsonify(status='Credential are wrong'), 400

    if check_password_hash(user.password, password):
        return jsonify(status='Successfully login'), 200
    else:
        return jsonify(status='Credential are wrong'), 400


@app.route('/users', methods=['GET'])
@cross_origin(origin='localhost', headers=['Content-Type', 'Authorization'])
@auth.login_required
def get_all_users():
    result = {}
    users = []
    for user in User.query.all():
        users.append({
            "id": user.id,
            "email": user.email,
            "name": user.userName
        })
    result["users"] = users
    return jsonify(result), 200


@app.route('/current_user', methods=['GET'])
@cross_origin(origin='localhost', headers=['Content-Type', 'Authorization'])
@auth.login_required
def get_current_user():
    user = get_user_by_email(auth.current_user())
    if user.role == RoleEnum.user:
        role = 'user'
    elif user.role == RoleEnum.moderator:
        role = 'moderator'
    else:
        role = 'unknown'
    return jsonify({"id": user.id, "name": user.userName, "email": user.userName, "role": role}), 200


@auth.verify_password
def verify_password(email, password):
    if not (email and password):
        return False
    user_test = get_user_by_email(email)
    if user_test is None:
        return False
    else:
        return check_password_hash(user_test.password, password)


@auth.error_handler
def unauthorized(e):
    return jsonify(message="Unauthorized access", error=e), 401
