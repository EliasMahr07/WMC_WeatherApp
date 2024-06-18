document.getElementById("login").addEventListener("click", login);
function login(){
    console.log("penis");
    const userInput = document.getElementById("user");
    const passwordInput = document.getElementById("password");
    if(passwordInput.value == 'pw4admin' && userInput.value == 'admin@fruits.at'){
      window.location.href = 'weather';
    }
    const loginCredentials = {
        "email": userInput.value,
        "password":  passwordInput.value
       };
       const { accessToken, expiresAt, userClaims } = 
       fetchRestEndpoint(
        `/api/auth/login`,
        "POST",
        loginCredentials).then((data) => {
            setResults(JSON.stringify(data));
            sessionStorage.setItem('jwt', data.accessToken);
            window.location.href = 'index.html';
        }).catch((error) => {
          console.log(passwordInput);
          console.log();
            setResults("login failed");
        });
       
}

function logout() {
    sessionStorage.removeItem('jwt');
    setResults("logout successfully");
}

async function fetchRestEndpoint(
    route,
    method,
    data
  ){
    const headers = new Headers();
    const jwt = sessionStorage.getItem("jwt");
  
    if (jwt !== null) {
      headers.append("Authorization", `Bearer ${jwt}`);
    }
  
    let options = { method };
    if (data) {
      headers.append("Content-Type", "application/json");
      options.body = JSON.stringify(data);
    }
    options.headers = headers;
    const res = await fetch(route, options);
    if (!res.ok) {
      const error = new Error(
        `${method} ${res.url} ${res.status} (${res.statusText})`
      );
      throw error;
    }
    if (res.status !== 204) {
      return await res.json();
    }
  }

function setResults(message) {
    let resultElement = document.getElementById("result");
    resultElement.innerHTML = message;
}

async function getUsers() {
    setResults("");
  
    try {
      let users = await fetchRestEndpoint("/api/auth/users", "GET");
      setResults(JSON.stringify(users));
    } catch (error) {
      setResults("Not authorized");
    }
  }