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
document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector(".form-box.login form");

    loginForm.addEventListener("submit", function(e) {
        e.preventDefault(); // ngăn reload

        // Lấy username và password từ input
        const username = loginForm.querySelector('input[type="text"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        // Gửi lên server NodeJS
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Login successful!");
                // M có thể redirect window.location = "home.html" ở đây
            } else {
                alert("Login failed: " + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Error connecting to server");
        });
    });
});
