from flask import Flask
from db.databases import create_tables

app = Flask(__name__)

# create_tables()

if __name__ == "__main__":
    app.run(port=5000, debug=True)