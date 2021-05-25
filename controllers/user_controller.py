from config import *
from flask import request, render_template, redirect, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from db_functionality import *


@app.route('/', methods=['GET'])
def index():
    return render_template('vitality/index.html')


@app.route('/login', methods=['GET'])
def login():
    return render_template('vitality/authentification/login.html')


@app.route('/logout', methods=['GET'])
def logout():
    return render_template('vitality/authentification/login.html', error=False,
                           message="You have been successfully logout")


@app.route('/signup', methods=['GET'])
def signup():
    return render_template('vitality/authentification/signup.html')


@app.route('/signup', methods=['POST'])
def signup_post():
    email = request.form.get('username')

    if not get_user_by_email(email) is None:
        return render_template('vitality/authentification/signup.html', error=True,
                               message="Account with this email already exists")

    password = request.form.get('password')
    username = email
    role = RoleEnum.user

    if username and password and email and role != RoleEnum.unknown:
        new_user = User(user_name=username, email=email, password=generate_password_hash(password), role=role)
        db.session.add(new_user)
        db.session.commit()
        return redirect("/articles")
    else:
        return render_template('vitality/authentification/signup.html', error=True,
                               message="Oops, fields are incorrect")


@app.route('/login', methods=['POST'])
def login_post():
    email = request.form.get('username')
    user = get_user_by_email(email)

    if user is None:
        return render_template('vitality/authentification/login.html', error=True, message="Credential are wrong")

    password = request.form.get('password')

    if check_password_hash(user.password, password):
        return redirect("/articles")
    else:
        return render_template('vitality/authentification/login.html', error=True, message="Credential are wrong")


@app.route('/users', methods=['GET'])
# @auth.login_required
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


@auth.verify_password
def verify_password(email, password):
    if not (email and password):
        return False
    user_test = User.query.filter_by(email=email).first()
    if user_test is None:
        return False
    else:
        return check_password_hash(user_test.password, password)


@auth.error_handler
def unauthorized():
    return render_template('error/error_page.html', number=401, message="Unauthorized access")
