const form = document.getElementById("loginForm");

const loginUser = async () => {
  const formData = new FormData(form);

  var object = {};
  formData.forEach(function (value, key) {
    object[key] = value;
  });
  const json = JSON.stringify(object);

  try {
    const res = await fetch(
      "https://cosc2430-web-programming-full-stack-web.onrender.com/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: json,
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert("Username or password is incorrect");
      console.log(data);
      return;
    }

    localStorage.setItem("access_token", data.access_token);
    location.replace("/home");
  } catch (e) {
    alert("An error occured");
    console.log(e);
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  loginUser();
});
