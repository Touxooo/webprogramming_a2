const storeOwnerRadio = document.querySelector('input[value="storeOwner"]');
const storeShopperRadio = document.querySelector('input[value="shopper"]');

storeOwnerRadio.addEventListener("change", function () {
  if (storeOwnerRadio.checked) {
    document.getElementById("storeOnwerInputs").style.display = "block";
  } else {
    document.getElementById("storeOnwerInputs").style.display = "none";
  }
});

storeShopperRadio.addEventListener("change", function () {
  if (storeShopperRadio.checked) {
    document.getElementById("storeOnwerInputs").style.display = "none";
  }
});

function displayFileName() {
  const fileInput = document.getElementById("fileUpload");
  const fileNameDisplay = document.getElementById("fileInputLabel");

  if (fileInput.files.length > 0) {
    fileNameDisplay.textContent = fileInput.files[0].name;
  } else {
    fileNameDisplay.textContent = "Click to upload profile picture";
  }
}

document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const passwordInput = document.querySelector('input[name="password"]');
    const confirmPasswordInput = document.getElementById("passwordValidation");

    if (passwordInput.value !== confirmPasswordInput.value) {
      alert("Password and Confirm Password must match.");
      return;
    }

    const formData = new FormData(this);
    const accountType = formData.get("accountType");

    let endpoint = "";

    if (accountType === "storeOwner") {
      endpoint = "/user/owner";
    } else if (accountType === "shopper") {
      endpoint = "/user/shopper";
    }

    console.log(formData.get("profile_picture"));
    console.log(endpoint);

    fetch(
      `https://cosc2430-web-programming-full-stack-web.onrender.com${endpoint}`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const accessToken = data.access_token;

        alert("Registration successful.");
        localStorage.setItem("access_token", accessToken);
        location.replace("/account");
      })
      .catch((error) => {
        alert(error.message);
        console.error("An error occured during fetch", error);
      });
  });
