from config import *
from db_functionality import check_moderator
from models import *
from flask import request, jsonify


@app.route('/articles', methods=['GET'])
@auth.login_required
def get_all_articles():
    response = {'status': True, 'articles': []}
    for article in Article.query.limit(15).all():
        response["articles"].append({
            "id": article.id,
            "name": article.name,
            "text": article.text
        })
    return jsonify(response), 200


@app.route('/articles/<article_id>', methods=['GET'])
@auth.login_required
def get_article_by_id(article_id):
    response = {'status': True, 'article': []}

    article = Article.query.filter_by(id=article_id).first()

    if article is None:
        return jsonify({'status': False, 'article': []}), 404

    response["article"].append({
        "id": article.id,
        "name": article.name,
        "text": article.text
    })

    return jsonify(response), 200


@app.route('/about', methods=['GET'])
@auth.login_required
def about():
    return jsonify('About.html')


@app.route('/contact', methods=['GET'])
@auth.login_required
def contact():
    return jsonify('Contact.html')


@app.route('/articles', methods=['POST'])
@auth.login_required
def add_article():
    name = request.json.get('name', None)
    text = request.json.get('text', None)

    if check_moderator(auth.current_user()):
        if name and text:
            db.session.add(Article(name=name, text=text))
            db.session.commit()
            return jsonify(status='Successfully added to public'), 201

    if name and text:
        particle = PArticle(name=name, text=text, status=StatusEnum.created)
        db.session.add(particle)
        db.session.commit()
        return jsonify(status='Successfully added to review'), 201

    return jsonify(status='Bad input data'), 400


@app.route('/articles/<article_id>', methods=['PUT'])
@auth.login_required
def update_article(article_id):
    article = Article.query.filter_by(id=article_id).first()

    if article is None:
        return jsonify(status='Article not found'), 404

    new_name = request.json.get('name', None)
    new_text = request.json.get('text', None)

    if check_moderator(auth.current_user()):
        if new_name and new_text:
            article.text = new_text
            article.name = new_name
            db.session.commit()
            return jsonify(status='Successfully updated to public'), 200

    if new_name and new_text:
        particle = PArticle(name=new_name, text=new_text, status=StatusEnum.pending, article=article)
        db.session.add(particle)
        db.session.commit()
        return jsonify(status='Successfully added to review'), 201

    return jsonify(status='Bad input data'), 204


@app.route('/articles/<article_id>', methods=['DELETE'])
@auth.login_required
def delete_article(article_id):
    article = Article.query.filter_by(id=article_id).first()

    if not check_moderator(auth.current_user()):
        return jsonify(status='You do not have permission'), 403

    if article is None:
        return jsonify(status='Article not found'), 404

    p_article_list = PArticle.query.filter_by(article_id=article.id)

    for var in p_article_list:
        db.session.delete(var)

    db.session.delete(article)
    db.session.commit()

    return jsonify(status='Successfully deleted'), 204