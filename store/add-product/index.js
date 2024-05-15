const form = document.getElementById("addAProductForm");

const addAProduct = async () => {
  const formData = new FormData(form);
  const accessToken = localStorage.getItem("access_token");
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const storeId = urlParams.get("storeId");

  if (!accessToken) {
    alert("You have to be registered to add a product");
    location.replace("/authentication/login");
    return;
  }

  try {
    const res = await fetch(
      "https://cosc2430-web-programming-full-stack-web.onrender.com/product",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.log(data);
      return;
    }

    alert("The product has been added!");
    location.replace("/store/?id=" + storeId);
  } catch (e) {
    alert("An error occured");
    console.log(e);
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addAProduct();
});
