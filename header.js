const setAuthButtonState = () => {
  const loginButton = document.getElementById("authButton");

  const access_token = localStorage.getItem("access_token");

  if (access_token) {
    loginButton.className = "btn btn-danger";
    loginButton.innerHTML = "Logout";
    loginButton.addEventListener("click", () => {
      localStorage.removeItem("access_token");
      alert("Successfuly logout");
      setAuthButtonState();
      loginButton.removeEventListener();
    });
  } else {
    loginButton.className = "btn btn-outline-success";
    loginButton.innerHTML = "Login";
    loginButton.addEventListener("click", () => {
      location.replace("/authentication/login.html");
      loginButton.removeEventListener();
    });
  }
};

setAuthButtonState();
