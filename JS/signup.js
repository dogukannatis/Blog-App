document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    const name = document.getElementById('name').value;

    if (password !== passwordConfirm) {
        alert("Passwords do not match!");
        return;
    }

    const hashedPassword = btoa(password);

    fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(users => {
            const userExists = users.some(user => user.email === email || user.username === username);
            if (userExists) {
                alert("Email or username already in use!");
                return;
            }

            const user = {
                email: email,
                username: username,
                password: hashedPassword,
                name: name
            };

            fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            .then(response => response.json())
            .then(data => {
                if (data.id) {
                    localStorage.setItem('id', data.id);
                    localStorage.setItem('email', data.email);
                    localStorage.setItem('username', data.username);
                    window.location.href = './Pages/index.html';
                } else {
                    alert("Signup failed. Please try again.");
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
