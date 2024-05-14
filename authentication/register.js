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
    const requestData = {};
    formData.forEach((value, key) => {
      requestData[key] = value;
    });

    let endpoint = "";
    if (requestData.accountType === "storeOwner") {
      endpoint = "/user/owner";
    } else if (requestData.accountType === "shopper") {
      endpoint = "/user/shopper";
    }

    console.log(formData.get("email"));

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
        const accessToken = data.access_token;
        alert("Registration successful.");
        console.log(data);
      })
      .catch((error) => {
        alert(error.message);
        console.error("An error occured during fetch", error);
      });
  });
