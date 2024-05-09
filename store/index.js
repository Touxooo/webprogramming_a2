const getProductHTML = (product) => {
  return `
  <li class="card p-2 g-col-6" style="width: 18rem">
    <img
      src="https://m.media-amazon.com/images/I/81rsMys9S8L._AC_UL640_FMwebp_QL65_.jpg"
      class="card-img-top"
      alt="monitor image"
    />
    <div class="card-body">
      <h5 class="card-title">
        KYY Portable Monitor 15.6inch 1080P FHD USB-C
      </h5>
      <p class="card-text">
        HDMI Computer Display HDR IPS Gaming Monitor w/Premium Smart Cover
        & Screen Protector, Speakers, for Laptop PC MAC Phone PS4 Xbox
        Switch
      </p>
    </div>
  </li>
`;
};

const insertNewProducts = (newProducts) => {
  const newProductsList = document.getElementById("new-products-list");

  newProducts.forEach((product) => {
    const item = getProductHTML(product);

    newProductsList.insertAdjacentHTML("beforeend", item);
  });
};

const insertAllProducts = (products) => {
  const allProductsList = document.getElementById("all-products-list");

  products.forEach((product) => {
    const item = getProductHTML(product);

    allProductsList.insertAdjacentHTML("beforeend", item);
  });
};

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const storeId = urlParams.get("id");

fetch(
  `https://cosc2430-web-programming-full-stack-web.onrender.com/store/${storeId}`
)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    const title = data.store._name;
    document.title += ` - ${title}'s store`;

    document.getElementById("header-title").innerHTML += " - " + title;
    document.getElementById("footer-store-title").innerHTML = title;

    insertNewProducts(data.newProducts);
    insertAllProducts(data.products);
  })
  .catch((error) => console.log(error));
