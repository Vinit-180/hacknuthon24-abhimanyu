from flask import Flask,render_template,request
import vanna
from vanna.remote import VannaDefault
from flask_cors import CORS,cross_origin
import json
import numpy as np
import pandas as pd
import tensorflow as tf
import ollama
import sqlite3
import random
import time
import re
from models import User,init_app
import jwt


# Flask constructor takes the name of 
# current module (__name__) as argument.

app = Flask(__name__)
init_app(app)
app.debug = True
app.config['SECRET_KEY'] = 'SQL-AI'
# client = MongoClient('mongodb+srv://vinitchokshi1809:cwAd7ngKl97CVD1C@aisqlquery.azplws7.mongodb.net/') 
# db=client['AI_SQL']
CORS(app)


# client = MongoClient('mongodb://localhost:27017/') 
# db = client['demo'] 
# collection = db['data'] 

# vn = VannaDefault(model='chinook', api_key='20a69a26cb754b368b29767ec6dafb08')
# vn.connect_to_sqlite('D:\HackNuthon\Chinook.sqlite')
# vn.connect_to_sqlite('D:\HackNuthon\Chinook.sqlite')
# a=vn.ask("Give data of album where title is similiar to The Best of Billy ", print_results=False)
ddlData=[]
database_name=""
tableData={}
class NumpyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return json.JSONEncoder.default(self, obj)

def create_sqlite_file(tables_and_columns):
    # Create SQLite connection and cursor
    global database_name,tableData
    try:
        temp = str(time.time()).split(".")[0]
        database_name=f'db_{temp}.sqlite'
        conn = sqlite3.connect(f'db_{temp}.sqlite')
        cursor = conn.cursor()

        # Iterate over each table and its columns
        for table_name, columns in tables_and_columns.items():
            # Create table
            create_table_sql = f"CREATE TABLE {table_name} ({', '.join(columns)})"
            cursor.execute(create_table_sql)

            # Insert sample data into the table
            # sample_data = generate_sample_data(columns, 10)  # You need to define generate_sample_data function
            insert_sql = f"INSERT INTO {table_name} VALUES ({', '.join(['?' for _ in range(len(columns))])})"
            # print(sample_data)
            # ddlData.append(sample_data)
            print(table_name)
            # tableData[table_name]=sample_data
            # cursor.executemany(insert_sql, sample_data)
    except Exception as e:
        print(e)
        return json.dumps({"error":str(e)})
    # Commit changes and close connection
    conn.commit()
    conn.close()
    
def insert_data(cursor, table_name, columns, data):
    # Generate SQL query with placeholders for dynamic number of columns
    placeholders = ', '.join(['?' for _ in range(len(columns))])
    query = f"INSERT INTO {table_name} VALUES ({placeholders})"

    # Insert data row by row
    print(data)
    for row in data:
        print(row)
        if len(row) != len(columns):
            raise ValueError(f"Table {table_name} has {len(columns)} columns but {len(row)} values were supplied.")
        cursor.execute(query, row)



def generate_sample_data(columns, num_rows):
    # Sample data generation logic goes here
    sample_data = []
    used_int_values = set()  # Set to keep track of used integer values
    for _ in range(num_rows):
        row = []
        for column in columns:
            column_name, data_type = column.split()
            if 'INT' in data_type:
                value = random.randint(1, 1000)
                while value in used_int_values:  # Ensure uniqueness
                    value = random.randint(1, 1000)
                used_int_values.add(value)
            elif 'VARCHAR' in data_type:
                value = ''.join(random.choices('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', k=random.randint(1, 50)))  # Generating random string
            elif 'DECIMAL' in data_type:
                value = round(random.uniform(1000.00, 5000.00), 2)  # Generating random decimal value
            else:
                value = None
            row.append(value)
        sample_data.append(row)
    return sample_data



def get_table_details(ddl):
    try:
        # Define a dictionary to store table names and their column names with data types
        tables_and_columns = {}

        # Regular expression pattern to match table creation statements
        table_pattern = re.compile(r'CREATE TABLE (\w+)\s*\((.*?)\);', re.DOTALL)

        # Regular expression pattern to match column names and data types
        column_pattern = re.compile(r'(\w+)\s+(\w+)(?:\(\d+(?:,\d+)?\))?(?:\s+PRIMARY KEY)?', re.DOTALL)


        # Find all table creation statements
        table_matches = table_pattern.findall(ddl)

        # Iterate over table creation statements
        for table_match in table_matches:
            table_name = table_match[0]
            columns = table_match[1]
            
            # Find all column names and data types
            column_details = column_pattern.findall(columns)
            
            # Store table name and its column names with data types in the dictionary
            tables_and_columns[table_name] = [f"{column[0]} {column[1]}{'(' + ','.join(column[2:]) + ')' if column[2:] else ''}" for column in column_details]
            
            
        return tables_and_columns
    except Exception as e:
        return json.dumps({"error":str(e)})


def extract_table_info(ddl):
    table_info = {}
    statements = ddl.split(';')
    for statement in statements:
        statement = statement.strip()
        if statement.startswith("CREATE TABLE"):
            lines = statement.split('\n')
            table_name = lines[0].split(" ")[2].strip()
            columns = [line.split()[0] for line in lines[1:] if line.strip()]
            table_info[table_name] = columns
    print(table_info)
    return table_info



def execute_query(query,db_path):  
    # Connect to the database
    global ddlData
    conn = sqlite3.connect(db_path)

    # Create a cursor object to execute queries
    cursor = conn.cursor()

    # Execute a query
    cursor.execute(query)

    # Fetch the results if necessary
    results = cursor.fetchall()
    print(results)
    ddlData=results
    # Don't forget to close the connection
    conn.close()

# Example DDL
# ddl = """
# CREATE TABLE Employees (
# EmployeeID INT PRIMARY KEY,
# FirstName VARCHAR(50),
# LastName VARCHAR(50),
# DepartmentID INT,
# Salary DECIMAL(10,2)
# );
# CREATE TABLE Departments (
# DepartmentID INT PRIMARY KEY,
# DepartmentName VARCHAR(50)
# );
# """

    
# @app.route("/model",methods=['POST'])
# def output2():
#     # a2=vn.ask()
#     print("d")
#     if request.method=="POST":
#         ddl=request.json['ddl']
#         query=request.json['query']
#         print("---------->",query)
#         # a2=vn.ask(query,print_results=False)
#         print(a2)
#         print(a2[1])
#         df = pd.DataFrame(a2[1])
#         json_string = df.to_json(orient='records') 
#     #     return json.dumps({"data":{"query":str(a2[0]),"result":json_string}}),200,{"Access-Control-Allow-Origin": "*",
#     #                    "Access-Control-Allow-Methods": "POST",
#     #                    "Access-Control-Allow-Headers": "Content-Type",}
#     #     # return str(a)+'\n             --------->'+str(a[0])+'\n    <------------ '+str(a[1])
#     # return str(a)+'\n             --------->'+str(a[0])+'\n    <------------ '+str(a[1])

@app.route("/model2",methods=['POST'])
def output():
# Check if GPU is available
    global ddlData,tableData
    ddlData=[]
    tableData={}
    # ddlData=[]
    # physical_devices = tf.config.list_physical_devices("GPU")
    # tf.config.experimental.set_memory_growth(physical_devices[0], True)
    # gpus = tf.config.experimental.list_physical_devices('GPU')
    # for gpu in gpus:
    #     tf.config.experimental.set_memory_growth(gpu, True)
    try:
        print("1")
        r = ollama.generate(
        model='duckdb-nsql',
        system='''Here is the database schema that the SQL query will run on: {data}'''.format(data=request.json["ddl"]),
            # system='''Here is the database schema that the SQL query will run on:
        # CREATE TABLE Employees (
        # EmployeeID INT PRIMARY KEY,
        # FriendName VARCHAR(50),
        # LastName VARCHAR(50),
        # DepartmentID INT,
        # Salary DECIMAL(10,2)
        # );
        #     ''',
            prompt=request.json['query'],
            # prompt='get friendName and departmentName of all employee with  their highest salary',
        )
        ddl=request.json['ddl']
        tables_and_columns = get_table_details(ddl)
        create_sqlite_file(tables_and_columns)
        print(2)
        # execute_query(r['response'],database_name)
        print(r['response'])    
    
        return json.dumps({"data":{"query":r['response'],"result":ddlData,"tableAndColumns":tables_and_columns,"tableData":tableData}}),200,{"Access-Control-Allow-Origin": "*",
                       "Access-Control-Allow-Methods": "POST",
                       "Access-Control-Allow-Headers": "Content-Type",}
    except Exception as e:
        print(e)
        return json.dumps({"error":str(e)}),500

@app.route('/')
def hello_world():
    return render_template("./index.html")


@app.route('/login',methods=['POST'])
def login():
    try:
        data=request.get_json()
        email=data.get('email')
        password=data.get('password')

        if not email or not password:
            return json.dumps({'error': 'Missing required fields'}), 400
        elif(User.find_by_email(email,password)):
            token=jwt.encode(
                    {"user_id": email},
                    app.config["SECRET_KEY"],
                    algorithm="HS256"
                )
            # print(token)
            return json.dumps({'message':"User Successfully logged","user":token}),201
            
            # print(User.find_by_email(email,password))
    except Exception as e:
        return json.dumps({'error':e}),500
    
@app.route('/signup',methods=['POST'])
def signup():
    try:
        print("h")
        data=request.get_json()
        email=data.get('email')
        password=data.get('password')

        if User.find_by_email_for_Signup(email):
            return json.dumps({'error': 'Email already exists'}), 400
        new_user = User(email, password)
        new_user.save()
        token=jwt.encode(
                    {"user_id": email},
                    app.config["SECRET_KEY"],
                    algorithm="HS256"
                )
        return json.dumps({'message':"User Account Created Successfully","user":token}),201
    
    except Exception as e:
        return json.dumps({'error':str(e)}),500

# main driver function
if __name__ == '__main__':
 
    app.run()