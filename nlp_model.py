# nlp_model.py
from transformers import pipeline

nlp = pipeline('question-answering', model='deepset/roberta-base-squad2')

def interpret_query(query):
    context = "Provide a detailed context about health-related issues here."
    result = nlp(question=query, context=context)
    return result['answer']
