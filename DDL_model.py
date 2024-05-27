# from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from config import db,bcrypt
from cerberus import Validator
import json


class DDL:
    # 'regex': r'^\S+@\S+\.\S+$'
    ddl_schema = {
    'User': {'type': 'string', 'required': True}, 
    'DDL': {'type': 'string', 'required': True},
    'Words': {'type': 'list', 'schema': {'type': 'string'}, 'required': True},
    'Queries': {'type': 'list', 'schema': {'type': 'string'}, 'required': True},
    'Query words': {'type': 'list', 'schema': {'type': 'string'}, 'required': True},
    'Query result': {'type': 'list', 'schema': {'type': 'string'}, 'required': True},
    'Similiarity Score': {'type': 'float', 'required': True},
    'Chat': {'type': 'string', 'required': True} 
}
    
    

    # @staticmethod
    def save(self,data):
        v = Validator(self.ddl_schema)
        print(self.ddl_schema)
        filtered_data = {k: data[k] for k in self.ddl_schema if k in data}
        print(data)
        print("----------",v.validate(filtered_data))
        if v.validate(filtered_data):

            # db.users.insert_one({
            #     'email': data.get('email'),
            #     'password': bcrypt.generate_password_hash(data.get('password'),10)
            # })
            return True
        else:
            return False
            # return json.dumps({"error": str(v.errors)}), 400


    @staticmethod
    def find_by_query_id(id):
        ddlFound=db.DDL.find_one({'_id':id})
        print(ddlFound)
    # @staticmethod
    # def find_by_email(email,password):
    #     userFound=db.users.find_one({'email':email})
    #     if userFound and (userFound['email']==email and bcrypt.check_password_hash(userFound['password'], password)):
    #         return True
    #     else:
    #         return False
    # @staticmethod
    # def find_by_email_for_Signup(email):
    #     userFound=db.users.find_one({'email':email})
    #     return userFound
