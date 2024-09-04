// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [query, setQuery] = useState('');
    const [answer, setAnswer] = useState('');
    const [userData, setUserData] = useState('');
    const [healthPlan, setHealthPlan] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [users, setUsers] = useState([]);

    const handleQuerySubmit = async () => {
        const response = await axios.post('/interpret_query', { query });
        setAnswer(response.data.answer);
    };

    const handlePlanSubmit = async () => {
        const response = await axios.post('/generate_health_plan', { user_data: userData });
        setHealthPlan(response.data.health_plan);
    };

    const handleAddUser = async () => {
        await axios.post('/add_user', { name, age, symptoms });
        fetchUsers();
    };

    const fetchUsers = async () => {
        const response = await axios.get('/get_users');
        setUsers(response.data.users);
    };

    return (
        <div className="App">
            <h1>Health Monitoring Application</h1>
            <div>
                <h2>Interpret Health Query</h2>
                <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
                <button onClick={handleQuerySubmit}>Submit</button>
                <p>Answer: {answer}</p>
            </div>
            <div>
                <h2>Generate Health Plan</h2>
                <input type="text" value={userData} onChange={(e) => setUserData(e.target.value)} />
                <button onClick={handlePlanSubmit}>Submit</button>
                <p>Health Plan: {healthPlan}</p>
            </div>
            <div>
                <h2>Add User</h2>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
                <input type="text" placeholder="Symptoms" value={symptoms} onChange={(e) => setSymptoms(e.target.value)} />
                <button onClick={handleAddUser}>Add User</button>
            </div>
            <div>
                <h2>Users</h2>
                <button onClick={fetchUsers}>Fetch Users</button>
                <ul>
                    {users.map(user => (
                        <li key={user.id}>{user.name} - {user.age} - {user.symptoms}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
