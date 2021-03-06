from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_httpauth import HTTPBasicAuth

app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "http://localhost:3000"}})
auth = HTTPBasicAuth()
app.debug = True
app.config['SECRET_KEY'] = 'secret key'
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://{user}:{password}@{server}/{database}'.format(
    user='root', password='root', server='localhost', database='Swaggerdb')

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
engine = db.engine
