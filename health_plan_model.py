# health_plan_model.py
from transformers import pipeline

plan_generator = pipeline('text-generation', model='gpt2')

def generate_health_plan(user_data):
   prompt = f"Generate a personalized health plan for a user with the following data: {user_data}"
   plans = plan_generator(prompt, max_length=100)
   return plans[0]['generated_text']
