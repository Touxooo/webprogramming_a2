const getProductHTML = (product) => {
  return `
  <div class="container">
  <div class="layout-image">
    <img
      src="${product._image}"
      class="product-image"
      alt="${product._name}"
    />
  </div>
  <div class="layout-description">
    <h1 class="store-name">Store 1</h1>
    <h2 class="product-name">${product._name}</h2>
    <h3 class="rating">4.9 &ast;</h3>
    <h4 class="price">${product._price}</h4>
    <span>$</span>
    <p class="description">Product description</p>
    <button id="addButton">Add to Cart</button>
    <button id="buynowButton" onclick="buyNow()">Buy Now</button>
    <!-- remove the loginButton above when the backend for the login is implemented. this button is for testing. -->
  </div>
</div>
`;
};

const addToCart = async () => {
  const accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    alert("You have to be logged to add this product to the cart");
  }

  try {
    const res = await fetch(
      "https://cosc2430-web-programming-full-stack-web.onrender.com/order/add/" +
        getProductId(),
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.log(data);
      return;
    }

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const assignAddToCartButton = () => {
  const addButton = document.getElementById("addButton");

  addButton.addEventListener("click", () => addToCart());
};

const insertProductData = (data) => {
  const htmlProduct = getProductHTML(data);

  const main = document.getElementById("main");

  main.insertAdjacentHTML("beforebegin", htmlProduct);

  assignAddToCartButton();
};

const getProductId = () => {
  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  const productId = urlParams.get("id");

  return productId;
};

const getProductData = () => {
  fetch(
    "https://cosc2430-web-programming-full-stack-web.onrender.com/product/" +
      getProductId()
  )
    .then((res) => res.json())
    .then((data) => insertProductData(data))
    .catch((error) => console.log(error));
};

getProductData();
