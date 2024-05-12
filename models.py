from flask_pymongo import PyMongo

mongo = PyMongo()

def init_app(app):
    app.config['MONGO_URI'] = 'mongodb+srv://vinitchokshi1809:cwAd7ngKl97CVD1C@aisqlquery.azplws7.mongodb.net/AI_SQL'
    mongo.init_app(app)

class User:
    def __init__(self, email, password):
        self.email = email
        self.password = password

    def save(self):
        mongo.db.users.insert_one({
            'email': self.email,
            'password': self.password
        })

    @staticmethod
    def find_by_email(email):
        return mongo.db.users.find_one({'email': email})
