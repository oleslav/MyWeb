from backend.config import *
from backend.db_functionality import check_moderator
from backend.models import *
from flask import request, jsonify


@app.route('/moderator/particles/<particle_id>', methods=['PUT', 'DELETE'])
@auth.login_required
def change_particle_by_id(particle_id):
    if not check_moderator(auth.current_user()):
        return jsonify(status='You have no permission to do this'), 404

    p_article = PArticle.query.filter_by(id=particle_id).first()

    if p_article is None:
        return jsonify(status='Article not found'), 404

    if p_article.status == StatusEnum.done:
        return jsonify(status='Already changed'), 208

    if request.method == "PUT":
        article = Article.query.filter_by(id=p_article.article_id).first()
        article.text = p_article.text
        article.name = p_article.name
        p_article.status = StatusEnum.done
        db.session.commit()
        return jsonify(status='Updated article'), 200
    else:
        db.session.delete(p_article)
        db.session.commit()
        return jsonify(status='Deleted article'), 201


@app.route('/moderator/particles', methods=['GET'])
@auth.login_required
def get_pending_articles():
    if not check_moderator(auth.current_user()):
        return jsonify(status='You have no permission to do this'), 404

    p_articles = PArticle.query.filter_by(status=StatusEnum.pending).limit(10).all()
    p_articles_list = {'particles': []}

    for p_article in p_articles:
        p_articles_list['particles'].append({'id': p_article.id, 'text': p_article.text, 'name': p_article.name})

    return jsonify(p_articles_list), 200


@app.route('/moderator/particles/<particle_id>', methods=['GET'])
@auth.login_required
def get_pending_article_by_id(particle_id):
    if not check_moderator(auth.current_user()):
        return jsonify(status='You have no permission to do this'), 404

    p_article = PArticle.query.filter_by(id=particle_id).first()
    if p_article is None:
        return jsonify(status='article not found'), 404

    return jsonify(
        {'id': p_article.id, 'text': p_article.text, 'article_id': p_article.article_id, 'name': p_article.name}), 200
