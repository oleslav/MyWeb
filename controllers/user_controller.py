from config import *
from flask import request, render_template, redirect
from werkzeug.security import generate_password_hash, check_password_hash
from db_functionality import *


@app.route('/', methods=['GET'])
def index():
    return render_template('vitality/creative.html')


@app.route('/blog', methods=['GET'])
def authorized_index():
    return render_template('blog/blog.html')


@app.route('/login', methods=['GET'])
def login():
    return render_template('login.html')


@app.route('/logout', methods=['GET'])
def logout():
    return render_template('login.html', error=False, message="You have been successfully logout")


@app.route('/signup', methods=['GET'])
def signup():
    return render_template('signup.html')


@app.route('/signup', methods=['POST'])
def signup_post():
    email = request.form.get('username')

    if not get_user_by_email(email) is None:
        return render_template('signup.html', error=True, message="Account with this email already exists")

    password = request.form.get('password')
    username = email
    role = RoleEnum.user

    if username and password and email and role != RoleEnum.unknown:
        new_user = User(user_name=username, email=email, password=generate_password_hash(password), role=role)
        db.session.add(new_user)
        db.session.commit()
        return redirect("/articles")  # get_all_articles()
    else:
        return render_template('signup.html', error=True, message="Oops, fields are incorrect")


@app.route('/login', methods=['POST'])
def login_post():
    email = request.form.get('username')
    user = get_user_by_email(email)

    if user is None:
        return render_template('login.html', error=True, message="Credential are wrong")

    password = request.form.get('password')

    if check_password_hash(user.password, password):
        return redirect("/articles")  # get_all_articles()
    else:
        return render_template('login.html', error=True, message="Credential are wrong")


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


@app.errorhandler(404)
def page_not_found(e):
    return render_template('error/error_page.html', number=404, message="Not found")

# ########### That functionality may be discarded ########### #
#
# @app.route('/uploads/<path:filename>')
# def download_file(filename):
#     return send_from_directory(app.config['UPLOAD_FOLDER'], filename, as_attachment=True)
#
# @app.route('/users', methods=['POST'])
# def create_user():
#     email = request.json.get('email')
#     password = request.form.get('password')
#
#     print(email)
#     print(password)
#
#     username = email
#     role = request.json.get('role', None)
#     if username and password and email and role and User.query.filter_by(email=email).first() is None:
#         if role != 'user' and role != 'moderator':
#             return jsonify(status='wrong role'), 404
#         new_user = User(userName=username, email=email, password=password, userStatus=23, role=role)
#         db.session.add(new_user)
#         db.session.commit()
#         return jsonify(status='created'), 200
#     if User.query.filter_by(email=email).first() is not None:
#         return jsonify(status='Email already used'), 400
#     else:
#         return jsonify(status='Bad data'), 204
#
#
# @app.route('/users', methods=['PUT', 'DELETE'])
# # @auth.login_required
# def modify_user():
#     user_email = auth.current_user()
#     user = User.query.filter_by(email=user_email).first()
#     if request.method == 'PUT':
#         username = request.json.get('username', None)
#         password = request.json.get('password', None)
#         email = request.json.get('email', None)
#         role = request.json.get('role', None)
#         if role != 'user' and role != 'moderator':
#             return jsonify(status='wrong role'), 404
#         user_with_same_email = User.query.filter_by(email=email).first()
#         if user_with_same_email is not None and user_with_same_email.id != user.id:
#             return jsonify(status='email already used'), 400
#         if username and password and email:
#             user.userName = username
#             user.email = email
#             user.password = generate_password_hash(password)
#             user.role = role
#             db.session.commit()
#             return jsonify(status='updated', name=user.userName, email=user.email, role=user.role), 202
#         else:
#             return jsonify(status='Bad data'), 204
#     else:
#         db.session.delete(user)
#         db.session.commit()
#         return jsonify(status='deleted', name=user.userName, email=user.email), 201
#
#
# @app.route('/users', methods=['GET'])
# @auth.login_required
# def get_user():
#     user_email = auth.current_user()
#     user = User.query.filter_by(email=user_email).first()
#     return jsonify(status='current User', name=user.userName, email=user.email, role=user.role), 200
# ############################################################# #
