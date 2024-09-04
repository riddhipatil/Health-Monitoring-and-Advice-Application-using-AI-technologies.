# database.py
import sqlite3

conn = sqlite3.connect('health_monitoring.db')
cursor = conn.cursor()
cursor.execute('''CREATE TABLE IF NOT EXISTS user_profiles
                    (id INTEGER PRIMARY KEY, name TEXT, age INTEGER, symptoms TEXT)''')
conn.commit()

def insert_user_profile(name, age, symptoms):
    cursor.execute("INSERT INTO user_profiles (name, age, symptoms) VALUES (?, ?, ?)", (name, age, symptoms))
    conn.commit()

def get_user_profiles():
    cursor.execute("SELECT * FROM user_profiles")
    return cursor.fetchall()
