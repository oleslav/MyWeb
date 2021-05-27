from models import *


def check_moderator(user_email):
    user = User.query.filter_by(email=user_email).first()
    return not (user.role != 'moderator' or user is None)


def get_user_by_email(email):
    return User.query.filter_by(email=email).first()


def create_objects():
    db.create_all()
    user1 = User(user_name="testname", password="123", email="test@gmail.com", role="user")
    article1 = Article(name="Some Article 1", text="Some Text")
    particale1 = PArticle(name="partical1", status="pending", text='some text', article=article1)
    user2 = User(user_name="testname2", password="2", email="2", role="admin")
    particale2 = PArticle(name="partical2", status="pending", text="url2", article=article1)
    db.session.add(user1)
    db.session.add(article1)
    db.session.add(particale1)
    db.session.add(user2)
    db.session.add(particale2)
    db.session.commit()
    db.drop_all()
    return True
