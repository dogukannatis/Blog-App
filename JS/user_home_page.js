document.addEventListener('DOMContentLoaded', function() {
    const username = localStorage.getItem('username');
    if (!username) {
        window.location.href = './signin.html';
    } else {
        document.getElementById('username').textContent = username;
    }

    document.getElementById('logoutButton').addEventListener('click', function() {
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('username');
        window.location.href = './signin.html';
    });
});
