const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');
registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
});
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector(".form-box.login form");
    const registerForm = document.querySelector(".form-box.register form");

    // Login
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        console.log("Submitting login:", username, password);

        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ username, password })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert("Login successful!");
                window.location.href = "http://localhost:3000/download";
            } else {
                alert("Login failed: " + data.message);
            }
        })
        .catch(err => {
            console.error("Fetch error:", err);
            alert("Error connecting to server.");
        });
    });

    // Register
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = registerForm.querySelector('input[type="text"]').value;
        const password = registerForm.querySelector('input[type="password"]').value;

        console.log("Submitting register:", username, password);

        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ username, password })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert("Registration successful!");
                // Optionally, switch to login form automatically
                document.querySelector('.wrapper').classList.remove('active');
            } else {
                alert("Registration failed: " + data.message);
            }
        })
        .catch(err => {
            console.error("Fetch error:", err);
            alert("Error connecting to server.");
        });
    });
});
