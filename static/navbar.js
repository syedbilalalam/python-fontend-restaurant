// Memory data that can be used later
let username = false;

// Profile icons management
// Fetching user login details
// Parse cookies into key-value pairs
const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
    const [key, value] = cookie.split("=");
    acc[key] = value;
    return acc;
}, {});
if (cookies.username)
    username = cookies.username;
// Updating navbar if logged in
if (username !== false) {
    document.getElementById('userName').innerText = username;

    // Setting up the icon
    const profileIcon = document.getElementById('profileIcon');
    // Setting icon's text
    profileIcon.innerText = (username[0]).toUpperCase();
    // Turning on the icon
    profileIcon.style.display = 'block';

    // Setting it to logout next
    document.getElementById('loginButton').href = '/logout';
}