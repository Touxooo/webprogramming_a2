const setAuthButtonValues = () => {
  const access_token = localStorage.getItem("access_token");

  if (access_token) {
    loginButton.className = "btn btn-danger";
    loginButton.innerHTML = "Logout";
  } else {
    loginButton.className = "btn btn-outline-success";
    loginButton.innerHTML = "Login";
  }
};

const loginButton = document.getElementById("authButton");

const access_token = localStorage.getItem("access_token");

loginButton.addEventListener("click", () => {
  const access_token = localStorage.getItem("access_token");

  if (access_token) {
    localStorage.removeItem("access_token");
    alert("Successfuly logout");
  } else {
    location.replace("/authentication/login.html");
  }
  setAuthButtonValues();
});

setAuthButtonValues();
