import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

app = Flask(__name__)
CORS(app)

# Load the text generation model
generator = pipeline('text-generation', model='distilgpt2')

# Placeholder for a simple in-memory "database"
users = []

@app.route('/interpret_query', methods=['POST'])
def interpret_query():
    data = request.get_json()
    query = data.get('query')
    if not query:
        return jsonify({'error': 'No query provided'}), 400
    response = generator(query, max_length=100, num_return_sequences=1)
    return jsonify({'answer': response[0]['generated_text']})

@app.route('/generate_health_plan', methods=['POST'])
def generate_health_plan():
    data = request.get_json()
    user_data = data.get('user_data')
    if not user_data:
        return jsonify({'error': 'No user data provided'}), 400
    prompt = f"Create a health plan for: {user_data}"
    response = generator(prompt, max_length=150, num_return_sequences=1)
    return jsonify({'health_plan': response[0]['generated_text']})

@app.route('/add_user', methods=['POST'])
def add_user():
    data = request.get_json()
    name = data.get('name')
    age = data.get('age')
    symptoms = data.get('symptoms')
    if not all([name, age, symptoms]):
        return jsonify({'error': 'Missing user information'}), 400
    user = {'name': name, 'age': age, 'symptoms': symptoms}
    users.append(user)
    return jsonify({'message': 'User added successfully'})

@app.route('/get_users', methods=['GET'])
def get_users():
    return jsonify({'users': users})

@app.route('/generate_diet_plan', methods=['POST'])
def generate_diet_plan():
    data = request.get_json()
    user_data = data.get('user_data')
    if not user_data:
        return jsonify({'error': 'No user data provided'}), 400
    prompt = f"Create a diet plan for: {user_data}"
    response = generator(prompt, max_length=150, num_return_sequences=1)
    return jsonify({'diet_plan': response[0]['generated_text']})

@app.route('/suggest_cure', methods=['POST'])
def suggest_cure():
    data = request.get_json()
    symptoms = data.get('symptoms')
    if not symptoms:
        return jsonify({'error': 'No symptoms provided'}), 400
    prompt = f"Suggest a cure for: {symptoms}"
    response = generator(prompt, max_length=150, num_return_sequences=1)
    return jsonify({'cure': response[0]['generated_text']})

if __name__ == '__main__':
    app.run(debug=True)
