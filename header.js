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
        <img src="/src/user.svg" width="25" height="25" />
      </a>
    </li>
    <li>
      <a class="nav-link" href="/cart">
        <img src="/src/cart.svg" width="25" height="25" />
      </a>
    </li>
    <li>
      <a class="nav-link" id="logoutButton">
        <img src="/src/logout.svg" width="25" height="25" />
      </a>
    </li>
  </ul>
    `
    );

    const logoutButton = document.getElementById("logoutButton");

    logoutButton.addEventListener("click", (e) => {
      localStorage.removeItem("access_token");
      alert("Successfully logout");
      setAuthButtonValues();
      document.getElementById("logged-nav").remove();
    });
  } else {
    navbarContent.insertAdjacentHTML(
      "beforeend",
      `<a href="register/login.html" class="btn btn-outline-success" id="loginButton">Login</a>`
    );
  }
};

// const loginButton = document.getElementById("authButton");

// const access_token = localStorage.getItem("access_token");

// loginButton.addEventListener("click", () => {
//   const access_token = localStorage.getItem("access_token");

//   if (access_token) {
//     localStorage.removeItem("access_token");
//     alert("Successfully logout");
//   } else {
//     location.replace("/authentication/login.html");
//   }
//   setAuthButtonValues();
// });

setAuthButtonValues();
