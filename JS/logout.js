document.getElementById('logoutButton').addEventListener('click', function() {
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('username');
    localStorage.setItem('isLoggedIn', "false");
    window.location.href = './index.html';
});
