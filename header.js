const setAuthButtonValues = () => {
  const access_token = localStorage.getItem("access_token");
  const navbarContent = document.getElementById("navbarSupportedContent");

  if (access_token) {
    navbarContent.insertAdjacentHTML(
      "beforeend",
      `
    <ul class="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5" id="logged-nav">
    <li>
      <a class="nav-link" href="/account">
        <img src="/src/user.svg" width="23" height="23" />
      </a>
    </li>
    <li>
      <a class="nav-link" href="/cart">
        <img src="/src/cart.svg" width="23" height="23" />
      </a>
    </li>
    <li>
      <a class="nav-link" id="logoutButton">
        <img src="/src/logout.svg" width="23" height="23" />
      </a>
    </li>
  </ul>
    `
    );

    const logoutButton = document.getElementById("logoutButton");

    logoutButton.addEventListener("click", (e) => {
      localStorage.removeItem("access_token");
      alert("Successfuly logout");
      // setAuthButtonValues();
      // document.getElementById("logged-nav").remove();
      window.location.reload();
    });
  } else {
    navbarContent.insertAdjacentHTML(
      "beforeend",
      `
      <button class="btn btn-outline-success" id="login">Login</button>
      <div id="loginModal" class="modal">
          <div class="modal-content">
              <span class="close">&times;</span>
              <div id="iframeContainer">
                  <div class="loginBox">
                      <h2 class="loginHeading">Login</h2>
                      <form method="post" id="loginForm">
                          <input type="text" name="username" placeholder="Username">
                          <input type="password" name="password" placeholder="Password">
                          <input type="submit" value="Login">
                      </form>
                      <a href="authentication/register.html" class="modalButtons">Register</a>
                      <text> / </text>
                      <a href="authentication/verification.html" class="modalButtons">Forgot password</a>
                  </div>
              </div>
          </div>
      </div>
      `
    );
  }
};

// const loginButton = document.getElementById("authButton");

// const access_token = localStorage.getItem("access_token");

// loginButton.addEventListener("click", () => {
//   const access_token = localStorage.getItem("access_token");

//   if (access_token) {
//     localStorage.removeItem("access_token");
//     alert("Successfuly logout");
//   } else {
//     location.replace("/authentication/login.html");
//   }
//   setAuthButtonValues();
// });

setAuthButtonValues();
