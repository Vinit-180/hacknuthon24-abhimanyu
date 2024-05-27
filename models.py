from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt

mongo = PyMongo()
bcrypt=""

def init_app(app):
    global bcrypt
    app.config['MONGO_URI'] = 'mongodb+srv://vinitchokshi1809:cwAd7ngKl97CVD1C@aisqlquery.azplws7.mongodb.net/AI_SQL'
    mongo.init_app(app)
    bcrypt = Bcrypt(app)

class User:
    def __init__(self, email, password):
        self.email = email
        self.password = password

    def save(self):
        mongo.db.users.insert_one({
            'email': self.email,
            'password': bcrypt.generate_password_hash(self.password,10)
        })
    

    @staticmethod
    def find_by_email(email,password):
        userFound=mongo.db.users.find_one({'email':email})
        if(userFound['email']==email and bcrypt.check_password_hash(userFound['password'], password)):
            return True
        else:
            return False
    @staticmethod
    def find_by_email_for_Signup(email):
        userFound=mongo.db.users.find_one({'email':email})
        return userFound
