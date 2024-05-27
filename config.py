from flask_pymongo import PyMongo
from flask import Flask
from flask_bcrypt import Bcrypt

app = Flask(__name__)

app.debug = True
app.config['SECRET_KEY'] = 'SQL-AI'
app.config['MONGO_URI'] = 'mongodb+srv://vinitchokshi1809:cwAd7ngKl97CVD1C@aisqlquery.azplws7.mongodb.net/AI_SQL'

db = PyMongo(app).db
bcrypt = Bcrypt(app)