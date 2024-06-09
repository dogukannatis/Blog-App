document.addEventListener("DOMContentLoaded", function() {
    isLoggedIn = checkLoginStatus();
    const header = document.querySelector('header');

    if (isLoggedIn === "true") {
        header.innerHTML = `
            <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                <svg class="bi me-2" width="40" height="32"><use xlink:href="#"/></svg>
                <span class="fs-4">Blog App</span>
            </a>
            <ul class="nav nav-pills">
                <li class="nav-item m-2"><a href="./index.html" class="nav-link link-secondary" aria-current="page">Home</a></li>
                <li class="nav-item m-2"><a href="./about.html" class="nav-link">About</a></li>
                <li class="nav-item m-2"><a href="./create-blog-page.html" class="custom-button">Create Blog</a></li>
                <li class="nav-item m-2"><button id="logoutButton" class="custom-button">Logout</button></li>
            </ul>
        `;
    } else {
        header.innerHTML = `
            <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                <svg class="bi me-2" width="40" height="32"><use xlink:href="#"/></svg>
                <span class="fs-4">Blog App</span>
            </a>
            <ul class="nav nav-pills">
                <li class="nav-item m-2"><a href="./index.html" class="nav-link link-secondary" aria-current="page">Home</a></li>
                <li class="nav-item m-2"><a href="./about.html" class="nav-link">About</a></li>
                <li class="nav-item m-2"><a href="./signing.html" class="custom-button">Sign in or Sign up</a></li>
            </ul>
        `;
    }

    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            import('./logout.js').then(module => module.default());
        });
    }
});

function checkLoginStatus() {
    loggedIn = localStorage.getItem('isLoggedIn');
    return loggedIn;
}
