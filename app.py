from flask import Flask,render_template
import vanna
from vanna.remote import VannaDefault

# Flask constructor takes the name of 
# current module (__name__) as argument.
app = Flask(__name__)

vn = VannaDefault(model='chinook', api_key='f64499ca365843fc8f709fddaf155985')
vn.connect_to_sqlite('D:\HackNuthon\Chinook.sqlite')
a=vn.ask("Give data of album where title is similiar to The Best of Billy ", print_results=False)
@app.route("/demo")
def out():
    return str(a)+'\n             --------->'+str(a[0])+'\n    <------------ '+str(a[1])
# The route() function of the Flask class is a decorator, 
# which tells the application which URL should call 
# the associated function.
@app.route('/')
# ‘/’ URL is bound with hello_world() function.
def hello_world():
    return render_template("./index.html")
 
# main driver function
if __name__ == '__main__':
 
    # run() method of Flask class runs the application 
    # on the local development server.
    app.run(debug=True)