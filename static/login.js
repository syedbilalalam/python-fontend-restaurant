// Checking for server responses
const serverResp = new URLSearchParams(window.location.search).get('resp')

if (serverResp) {
    alert('Invalid login credentials');
    window.location.replace('/login-page');
}


