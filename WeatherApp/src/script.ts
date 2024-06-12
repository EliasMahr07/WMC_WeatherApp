const saltRounds: number = 8;

function login(): void {
    const userInput: HTMLInputElement = document.getElementById("user") as HTMLInputElement;
    const passwordInput: HTMLInputElement = document.getElementById("password") as HTMLInputElement;
    if(passwordInput.value === '1234') {
        window.location.href = '../public/index.html';
    }
    const loginCredentials: { email: string; password: string } = {
        "email": userInput.value,
        "password": passwordInput.value
    };
    fetchRestEndpoint(
        `/api/auth/login`,
        "POST",
        loginCredentials
    ).then((data: { accessToken: string; expiresAt: string; userClaims: any }) => {
        setResults(JSON.stringify(data));
        sessionStorage.setItem('jwt', data.accessToken);
        window.location.href = '../public/index.html';
    }).catch((error: Error) => {
        console.log(passwordInput);
        console.log();
        setResults("login failed");
    });
}

function logout(): void {
    sessionStorage.removeItem('jwt');
    setResults("logout successfully");
}

async function fetchRestEndpoint(
    route: string,
    method: string,
    data?: any
): Promise<any> {
    const headers: Headers = new Headers();
    const jwt: string | null = sessionStorage.getItem("jwt");

    if (jwt !== null) {
        headers.append("Authorization", `Bearer ${jwt}`);
    }

    let options: RequestInit = { method };
    if (data) {
        headers.append("Content-Type", "application/json");
        options.body = JSON.stringify(data);
    }
    options.headers = headers;
    const res: Response = await fetch(route, options);
    if (!res.ok) {
        const error: Error = new Error(
            `${method} ${res.url} ${res.status} (${res.statusText})`
        );
        throw error;
    }
    if (res.status !== 204) {
        return await res.json();
    }
}

function setResults(message: string): void {
    let resultElement: HTMLElement = document.getElementById("result")!;
    resultElement.innerHTML = message;
}

async function getUsers(): Promise<void> {
    setResults("");

    try {
        let users: any = await fetchRestEndpoint("/api/auth/users", "GET");
        setResults(JSON.stringify(users));
    } catch (error: any) {
        setResults("Not authorized");
    }
}

