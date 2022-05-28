from flask import Flask, jsonify
from sqlalchemy import create_engine
import json


application = Flask(__name__)

rds_connection_string = "postgresql://songlyrics:gatechfinalproject@lyrical-analysis.cxe3nmyieexj.us-east-1.rds.amazonaws.com:5432/musicalDbanalytics"
engine = create_engine(rds_connection_string)


# print a nice greeting.
@application.route("/")
def home():
    return (f"<h2>/api/v1.0/albumbestsellers</h2><br>"
            f"<h2>/api/v1.0/bestsellingalbumsbyartist</h2><br>"
            f"<h2>/api/v1.0/eminembestsellingalbums</h2><br>"
            f"<h2>/api/v1.0/mariahcareybestsellingalbums</h2><br>"
            f"<h2>/api/v1.0/themarshallmatherslp</h2><br>"
            f"<h2>/api/v1.0/theeminemshow</h2><br>"
            f"<h2>/api/v1.0/daydream</h2><br>"
            f"<h2>/api/v1.0/musicbox</h2><br>")




@application.route("/api/v1.0/albumbestsellers")
def bestalbums():
    data = engine.execute("SELECT * FROM albumbestsellers")
    result = json.dumps([dict(r) for r in data])
    return result



@application.route("/api/v1.0/bestsellingalbumsbyartist")
def bestartists():
    data = engine.execute("SELECT artist, SUM(claimed_sales_millions) FROM albumbestsellers GROUP BY artist")
    result = json.dumps([dict(r) for r in data])
    return result

@application.route("/api/v1.0/mariahcareybestsellingalbums")
def mariahcarey():
    data = engine.execute("""SELECT
	albumbestsellers.artist,
	albumbestsellers.album,
    albumbestsellers.claimed_sales_millions,
	masterlyrics.song,
	masterlyrics.lyrics	
FROM albumbestsellers
INNER JOIN albumjoiner 
    ON albumjoiner.album2 = albumbestsellers.album
INNER JOIN masterlyrics
	ON masterlyrics.song = albumjoiner.song
WHERE albumbestsellers.artist = 'Mariah Carey'""")
    result = json.dumps([dict(r) for r in data])
    return result


@application.route("/api/v1.0/eminembestsellingalbums")
def eminem():
    data = engine.execute("""SELECT
	albumbestsellers.artist,
	albumbestsellers.album,
    albumbestsellers.claimed_sales_millions,
	masterlyrics.song,
	masterlyrics.lyrics	
FROM albumbestsellers
INNER JOIN albumjoiner 
    ON albumjoiner.album2 = albumbestsellers.album
INNER JOIN masterlyrics
	ON masterlyrics.song = albumjoiner.song
WHERE albumbestsellers.artist = 'Eminem'""")
    result = json.dumps([dict(r) for r in data])
    return result

@application.route("/api/v1.0/themarshallmatherslp")
def themarshallmatherslp():
    data = engine.execute("""SELECT
	albumbestsellers.artist,
	albumbestsellers.album,
    albumbestsellers.claimed_sales_millions,
	masterlyrics.song,
	masterlyrics.lyrics	
FROM albumbestsellers
INNER JOIN albumjoiner 
    ON albumjoiner.album2 = albumbestsellers.album
INNER JOIN masterlyrics
	ON masterlyrics.song = albumjoiner.song
WHERE albumbestsellers.album = 'The Marshall Mathers LP'""")
    result = json.dumps([dict(r) for r in data])
    return result

@application.route("/api/v1.0/theeminemshow")
def theeminemshow():
    data = engine.execute("""SELECT
	albumbestsellers.artist,
	albumbestsellers.album,
    albumbestsellers.claimed_sales_millions,
	masterlyrics.song,
	masterlyrics.lyrics	
FROM albumbestsellers
INNER JOIN albumjoiner 
    ON albumjoiner.album2 = albumbestsellers.album
INNER JOIN masterlyrics
	ON masterlyrics.song = albumjoiner.song
WHERE albumbestsellers.album = 'The Eminem Show'""")
    result = json.dumps([dict(r) for r in data])
    return result

@application.route("/api/v1.0/daydream")
def daydream():
    data = engine.execute("""SELECT
	albumbestsellers.artist,
	albumbestsellers.album,
    albumbestsellers.claimed_sales_millions,
	masterlyrics.song,
	masterlyrics.lyrics	
FROM albumbestsellers
INNER JOIN albumjoiner 
    ON albumjoiner.album2 = albumbestsellers.album
INNER JOIN masterlyrics
	ON masterlyrics.song = albumjoiner.song
WHERE albumbestsellers.album = 'Daydream'""")
    result = json.dumps([dict(r) for r in data])
    return result


@application.route("/api/v1.0/musicbox")
def musicbox():
    data = engine.execute("""SELECT
	albumbestsellers.artist,
	albumbestsellers.album,
    albumbestsellers.claimed_sales_millions,
	masterlyrics.song,
	masterlyrics.lyrics	
FROM albumbestsellers
INNER JOIN albumjoiner 
    ON albumjoiner.album2 = albumbestsellers.album
INNER JOIN masterlyrics
	ON masterlyrics.song = albumjoiner.song
WHERE albumbestsellers.album = 'Music Box'""")
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
