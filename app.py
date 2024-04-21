from flask import Flask,render_template,request
import vanna
from vanna.remote import VannaDefault
from flask_cors import CORS,cross_origin
import json
import numpy as np
import pandas as pd
# Flask constructor takes the name of 
# current module (__name__) as argument.
app = Flask(__name__)
app.debug = False
CORS(app)

vn = VannaDefault(model='chinook', api_key='20a69a26cb754b368b29767ec6dafb08')
vn.connect_to_sqlite('D:\HackNuthon\Chinook.sqlite')
a=vn.ask("Give data of album where title is similiar to The Best of Billy ", print_results=False)

class NumpyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return json.JSONEncoder.default(self, obj)
    
@app.route("/model",methods=['POST'])
def output():
    # a2=vn.ask()
    print("d")
    if request.method=="POST":
        ddl=request.json['ddl']
        query=request.json['query']
        print("---------->",query)
        a2=vn.ask(query,print_results=False)
        print(a2)
        print(a2[1])
        df = pd.DataFrame(a2[1])
        json_string = df.to_json(orient='records') 
        return json.dumps({"data":{"query":str(a2[0]),"result":json_string}}),200,{"Access-Control-Allow-Origin": "*",
                       "Access-Control-Allow-Methods": "POST",
                       "Access-Control-Allow-Headers": "Content-Type",}
        # return str(a)+'\n             --------->'+str(a[0])+'\n    <------------ '+str(a[1])
    return str(a)+'\n             --------->'+str(a[0])+'\n    <------------ '+str(a[1])


@app.route('/')
# ‘/’ URL is bound with hello_world() function.
def hello_world():
    return render_template("./index.html")
 
# main driver function
if __name__ == '__main__':
 
    # run() method of Flask class runs the application 
    # on the local development server.
    app.run()