const apiUrl = 'http://localhost:5000'; // Flask backend URL

function interpretQuery() {
    const query = document.getElementById('queryInput').value;
    fetch(`${apiUrl}/interpret_query`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('interpretationResult').textContent = `Answer: ${data.answer}`;
    })
    .catch(error => console.error('Error:', error));
}

function generateHealthPlan() {
    const userData = document.getElementById('userDataInput').value;
    fetch(`${apiUrl}/generate_health_plan`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_data: userData })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('healthPlanResult').textContent = `Health Plan: ${data.health_plan}`;
    })
    .catch(error => console.error('Error:', error));
}

function addUser() {
    const name = document.getElementById('nameInput').value;
    const age = document.getElementById('ageInput').value;
    const symptoms = document.getElementById('symptomsInput').value;
    fetch(`${apiUrl}/add_user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, age, symptoms })
    })
    .then(response => response.json())
    .then(data => {
        alert('User added successfully!');
    })
    .catch(error => console.error('Error:', error));
}

function fetchUsers() {
    fetch(`${apiUrl}/get_users`)
    .then(response => response.json())
    .then(data => {
        const userList = document.getElementById('userList');
        userList.innerHTML = ''; // Clear previous list
        data.users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `${user.name} - ${user.age} - ${user.symptoms}`;
            userList.appendChild(li);
        });
    })
    .catch(error => console.error('Error:', error));
}

function generateDietPlan() {
    const userData = document.getElementById('dietPlanInput').value;
    fetch(`${apiUrl}/generate_diet_plan`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_data: userData })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('dietPlanResult').textContent = `Diet Plan: ${data.diet_plan}`;
    })
    .catch(error => console.error('Error:', error));
}

function suggestCure() {
    const symptoms = document.getElementById('cureInput').value;
    fetch(`${apiUrl}/suggest_cure`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ symptoms })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('cureResult').textContent = `Cure: ${data.cure}`;
    })
    .catch(error => console.error('Error:', error));
}
