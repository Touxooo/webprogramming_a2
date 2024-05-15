// Return the HTML element of a product
const getProductHTML = (product) => {
  return `
  <li class="card p-2 g-col-6" style="width: 18rem">
    <a href="/product/?id=${product._id}" class="link-secondary link-offset-2 link-underline link-underline-opacity-0">
      <img
        src="${product._image}"
        class="card-img-top"
        alt="${product._name} image"
      />
      <div class="card-body">
        <h5 class="card-title">
          ${product._name}
        </h5>
        <p class="card-text">
          ${product._price}$
        </p>
      </div>
    </a>
  </li>
`;
};

// Convert the new products lists fetched from API to HTML elements
const insertNewProducts = (newProducts) => {
  const newProductsList = document.getElementById("new-products-list");

  newProducts.forEach((product) => {
    const item = getProductHTML(product);

    newProductsList.insertAdjacentHTML("beforeend", item);
  });
};

// Convert the all products lists fetched from API to HTML elements
const insertAllProducts = (products) => {
  const allProductsList = document.getElementById("all-products-list");

  products.forEach((product) => {
    const item = getProductHTML(product);

    allProductsList.insertAdjacentHTML("beforeend", item);
  });
};

// Set the website, header and footer title of the store's name
const setStoreTitle = (title) => {
  document.title += ` - ${title}'s store`;

  document.getElementById("header-title").innerHTML += " - " + title;
  document.getElementById("footer-store-title").innerHTML = title;
};

// Get the store id from the url (ex: https://example.com/store/?id=1)
const getStoreId = () => {
  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  const storeId = urlParams.get("id");

  return storeId;
};

// Get the data of the store from the API
const getStoreData = () => {
  const storeId = getStoreId();

  fetch(
    `https://cosc2430-web-programming-full-stack-web.onrender.com/store/${storeId}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      setStoreTitle(data.store._name);
      insertNewProducts(data.newProducts);
      insertAllProducts(data.products);
    })
    .catch((error) => console.log(error));
};

getStoreData();
