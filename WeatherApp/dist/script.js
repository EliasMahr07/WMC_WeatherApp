"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const saltRounds = 8;
function login() {
    const userInput = document.getElementById("user");
    const passwordInput = document.getElementById("password");
    const loginCredentials = {
        "email": userInput.value,
        "password": passwordInput.value
    };
    fetchRestEndpoint(`/api/auth/login`, "POST", loginCredentials).then((data) => {
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
function fetchRestEndpoint(route, method, data) {
    return __awaiter(this, void 0, void 0, function* () {
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
        const res = yield fetch(route, options);
        if (!res.ok) {
            const error = new Error(`${method} ${res.url} ${res.status} (${res.statusText})`);
            throw error;
        }
        if (res.status !== 204) {
            return yield res.json();
        }
    });
}
function setResults(message) {
    let resultElement = document.getElementById("result");
    resultElement.innerHTML = message;
}
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        setResults("");
        try {
            let users = yield fetchRestEndpoint("/api/auth/users", "GET");
            setResults(JSON.stringify(users));
        }
        catch (error) {
            setResults("Not authorized");
        }
    });
}
