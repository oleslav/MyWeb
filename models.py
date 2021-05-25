import sqlalchemy
from config import db
from werkzeug.security import generate_password_hash
import enum


class RoleEnum(enum.Enum):
    unknown = 'unknown'
    user = 'user'
    moderator = 'moderator'


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column('id', db.INTEGER, primary_key=True)
    userName = db.Column('username', db.VARCHAR(30), nullable=False)
    email = db.Column('email', db.VARCHAR(30), nullable=False)
    password = db.Column('password', db.VARCHAR(255), nullable=False)
    role = db.Column('role', db.Enum(RoleEnum), nullable=False)

    def __init__(self, user_name, email, password, role):
        self.userName = user_name
        self.email = email
        self.password = password
        self.role = role


class Article(db.Model):
    __tablename__ = 'article'

    id = db.Column('id', db.INTEGER, primary_key=True)
    name = db.Column('name', db.VARCHAR(100), nullable=False)
    text = db.Column('text', db.TEXT(2000), nullable=False)


class StatusEnum(enum.Enum):
    pending = 'pending'
    done = 'done'


class PArticle(db.Model):
    __tablename__ = 'particle'

    id = db.Column('id', db.INTEGER, primary_key=True)
    article_id = db.Column('article_id', db.ForeignKey(Article.id))
    article = db.relationship(Article)
    name = db.Column('name', db.VARCHAR(20), nullable=False)
    text = db.Column('text', db.TEXT(2000), nullable=False)
    status = db.Column('status', db.Enum(StatusEnum), nullable=False)
