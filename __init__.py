import os
from flask import Flask, render_template, url_for, jsonify

app = Flask(__name__)

game = {'x1y1':'','x1y2':'','x1y3':'','x2y1':'','x2y2':'','x2y3':'','x3y1':'', 'x3y2':'', 'x3y3':'', 'winner':''}

@app.route('/')
def home():
    print game
    return jsonify(game)

@app.route('/move.json')
def move():
    return some_move

if __name__ == '__main__':
    app.run(debug=True)