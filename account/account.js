$(document).ready(function () {
  $("#dob").datepicker({
    format: "yyyy-mm-dd",
    autoclose: true,
    endDate: "-0d",
    maxDate: new Date(),
  });
});

const insertUserData = (data) => {
  console.log(data);

  document.getElementById("firstname").innerHTML = data._firstname;
  document.getElementById("lastname").innerHTML = data._lastname;
  document.getElementById("email").innerHTML = data._email;
  document.getElementById("phone").innerHTML = data._phone;
  document.getElementById("address").innerHTML = data._address;
  document.getElementById("city").innerHTML = data._city;
  document.getElementById("zipcode").innerHTML = data._zipcode;
  document.getElementById("country").innerHTML = data._country;
  document.getElementById("role").innerHTML = data._role;
  document.getElementById("username").innerHTML = "@" + data._username;
  document.getElementById("profile_picture").src = data._profile_picture;
  document.getElementById("role").innerHTML = data._role;

  if (data._role === "STORE_OWNER") {
    document
      .getElementById("role")
      .insertAdjacentHTML(
        "beforeend",
        `<br/><a href="/store/?id=${data._store}">My store</a>`
      );
  }
};

const getUserInformation = () => {
  const accessToken = localStorage.getItem("access_token");

  fetch("https://cosc2430-web-programming-full-stack-web.onrender.com/user", {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((res) => res.json())
    .then((data) => insertUserData(data))
    .catch((error) => console.log(error));
};

getUserInformation();
