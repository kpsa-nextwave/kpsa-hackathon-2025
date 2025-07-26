from flask import Flask

app = Flask(__name__)

def hello():
    print("Hello World")

if __name__ == "__main__":
    hello()
    app.run(port=5000, debug=True)
