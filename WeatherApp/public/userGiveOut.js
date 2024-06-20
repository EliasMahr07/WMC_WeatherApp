document.addEventListener('DOMContentLoaded', function() {
    geUs();
  });

  document.getElementById("userList");
  async function geUs() {
    try {
        const response = await fetch('/get-getUser');
        const users = await response.json();
 
        const outputElement = document.getElementById("userList");
        outputElement.innerHTML = ''; // Leeren des Inhalts, um sicherzustellen, dass es sauber startet
    
        users.forEach(user => {
          const tmp = `<tr> <td>${user.username}</td> <td>${user.email}</td> <td>${user.password}</td> <td>${user.role}</td> <td>${user.apikey}</td></tr>`;
          outputElement.innerHTML += tmp; // Fügt jeden Benutzer zum outputElement hinzu
        });
    
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
  }