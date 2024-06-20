import { getUsers } from '../dist/userservice';

async function loadUsers() {
    const userList = document.getElementById('userList');
    if (!userList) {
        console.error('userList Element nicht gefunden');
        return;
    }

    try {
        const users = await getUsers();

        users.forEach(user => {
            const listItem = document.createElement('li');
            listItem.textContent = `${user.id}: ${user.name}`;
            userList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Fehler beim Laden der Benutzer:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadUsers);
