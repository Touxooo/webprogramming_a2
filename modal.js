document.addEventListener('DOMContentLoaded', function() {
    var loginButton = document.getElementById('login');
    var loginModal = document.getElementById('loginModal');
    var closeButton = document.querySelector('.close');

    loginButton.addEventListener('click', function() {
        loginModal.style.display = 'block';
    });

    closeButton.addEventListener('click', function() {
        loginModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if(event.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });
});