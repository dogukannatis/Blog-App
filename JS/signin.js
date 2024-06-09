document.getElementById('signinForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const hashedPassword = btoa(password);

    fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(users => {
            const user = users.find(user => user.email === email && user.password === hashedPassword);
            if (user) {
                localStorage.setItem('userId', user.id);
                localStorage.setItem('userEmail', user.email);
                localStorage.setItem('username', user.username);
                localStorage.setItem('isLoggedIn', "true");
                window.location.href = './index.html';
            } else {
                alert("Invalid email or password. Please try again.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
