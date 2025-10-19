const users = JSON.parse(localStorage.getItem('detoxUsers')) || {};

document.getElementById('registerForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        alert("Passwords don't match!");
        return;
    }
    
    if (users[username]) {
        alert("Username already exists!");
        return;
    }
    
    users[username] = {
        password: password,
        streak: 0,
        joined: new Date().toISOString(),
        lastVisit: null
    };
    
    localStorage.setItem('detoxUsers', JSON.stringify(users));
    localStorage.setItem('currentUser', username);
    
    alert("Account created! Redirecting...");
    window.location.href = "detox_mission.html";
});

document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (users[username] && users[username].password === password) {
        localStorage.setItem('currentUser', username);
        window.location.href = "detox_mission.html";
    } else {
        alert("Invalid username or password!");
    }
});

function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser && !window.location.pathname.includes('login.html') && !window.location.pathname.includes('register.html')) {
        window.location.href = "login.html";
    }
    return currentUser;
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = "login.html";
}
