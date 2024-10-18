
const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, 'users.json');

document.getElementById('addUserBtn').addEventListener('click', () => {
    document.getElementById('form').style.display = 'block';
});

document.getElementById('submitBtn').addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;

    if (name && age) {
        addUser(name, age);
        document.getElementById('form').style.display = 'none';
        loadUsers();
    }
});

function loadUsers() {
    if (fs.existsSync(usersFilePath)) {
        const users = JSON.parse(fs.readFileSync(usersFilePath));
        const table = document.getElementById('usersTable');

        table.innerHTML = '<tr><th>Имя</th><th>Возраст</th></tr>';

        users.forEach(user => {
            const row = table.insertRow();
            row.insertCell(0).innerText = user.name;
            row.insertCell(1).innerText = user.age;
        });
    }
}

function addUser(name, age) {
    let users = fs.existsSync(usersFilePath) ? JSON.parse(fs.readFileSync(usersFilePath)) : [];
    users.push({ name, age });
    fs.writeFileSync(usersFilePath, JSON.stringify(users));
}

loadUsers();
