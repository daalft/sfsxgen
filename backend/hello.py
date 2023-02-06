from flask import Flask, request, jsonify
import json
import xgen

app = Flask(__name__)

def cors_response(msg):
    response = jsonify(msg)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route("/process")
def process():
    text = request.args.get("text", default="", type=str)
    return cors_response(xgen.process(text))

@app.route("/identify")
def identify():
    me = request.args.get("me")
    hashvalue = hash(me)
    if hashvalue == 4889620346995004926:
        return cors_response({"msg": 1, "statuscode": 200})
    return cors_response({"statuscode": 403})

@app.route("/process2")
def process2():
    json_string = request.args.get("json", default="", type=str)
    exclude_first = request.args.get("ex1", type=bool)
    exclude_last = request.args.get("ex2", type=bool)
    everyx = request.args.get("everyx", type=int)
    json_obj = json.loads(json_string)
    return cors_response(xgen.process2(json_obj, exclude_first, exclude_last, everyx))
