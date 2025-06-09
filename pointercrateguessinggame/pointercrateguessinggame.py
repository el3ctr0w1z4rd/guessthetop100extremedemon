from flask import Flask, jsonify, render_template
import requests
import random

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('pointercrateguessinggame.html')

@app.route('/random-extreme-demon')
def random_demon():
    try:
        response = requests.get("https://pointercrate.com/api/v2/demons/listed?limit=100")
        data = response.json()
        # print(data) Prints way too much stuff
        demons = [d for d in data if 'video' in d and d['video']]
        demon = random.choice(demons)
        return jsonify({
            'name': demon['name'],
            'position': demon['position'],
            'video': demon['video']
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)