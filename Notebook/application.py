from flask import Flask, jsonify
from sqlalchemy import create_engine
import json
application = Flask(__name__)
rds_connection_string = "postgresql://songlyrics:gatechfinalproject@lyrical-analysis.cxe3nmyieexj.us-east-1.rds.amazonaws.com:5432/musicalDbanalytics"
engine = create_engine(rds_connection_string)
# print a nice greeting.
@application.route("/")
def home():
    return (
        f"Available Routes:<br>"
        f"/api/v1.0/albumbestsellers<br>"
        f"/api/v1.0/masterlyrics<br>"
        f"<br")

@application.route("/api/v1.0/albumbestsellers")
def bestalbums():
    data = engine.execute("SELECT * FROM albumbestsellers")
    result = json.dumps([dict(r) for r in data])
    return result

@application.route("/api/v1.0/masterlyrics")
def masterlyrics():
    data = engine.execute("SELECT * FROM masterlyrics")
    result = json.dumps([dict(r) for r in data])
    return result
    # Create our session (link) from Python to the DB
# EB looks for an 'application' callable by default.
# run the app.
if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    application.debug = True
    application.run()


#http://127.0.0.1:5000/api/v1.0/masterlyrics
    