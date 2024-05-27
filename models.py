# from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from config import db,bcrypt
from cerberus import Validator
import json
# mongo = PyMongo()
# bcrypt=""

def init_app(app):
    global bcrypt
    # app.config['MONGO_URI'] = 'mongodb+srv://vinitchokshi1809:cwAd7ngKl97CVD1C@aisqlquery.azplws7.mongodb.net/AI_SQL'
    # mongo.init_app(app)
    bcrypt = Bcrypt(app)

class User:
    # 'regex': r'^\S+@\S+\.\S+$'
    user_schema = {
    'email': {'type': 'string', 
              'minlength': 6, 
              'maxlength': 100, 
              'required': True},
    'password':{
        'type':'string',
        'required':True
        }
    }
    
    # def __init__(self, email, password):
    #     self.email = email
    #     self.password = password

    # @staticmethod
    def save(self,data):
        v = Validator(self.user_schema)
        print("rr")
        print(self.user_schema)
        filtered_data = {k: data[k] for k in self.user_schema if k in data}
        print(data)
        print("----------",v.validate(filtered_data))
        if v.validate(filtered_data):
            db.users.insert_one({
                'email': data.get('email'),
                'password': bcrypt.generate_password_hash(data.get('password'),10)
            })
            return True
        else:
            return False
            # return json.dumps({"error": str(v.errors)}), 400



    @staticmethod
    def find_by_email(email,password):
        userFound=db.users.find_one({'email':email})
        if userFound and (userFound['email']==email and bcrypt.check_password_hash(userFound['password'], password)):
            return True
        else:
            return False
    @staticmethod
    def find_by_email_for_Signup(email):
        userFound=db.users.find_one({'email':email})
        return userFound
