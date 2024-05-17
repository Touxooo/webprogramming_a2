const getProductHTML = (product) => {
  return `

  <li class="col-12 col-md-4 col-lg-3 mb-5" style="width: 18rem">
    <a href="/product/?id=${product._id}" class="link-secondary link-offset-2 link-underline link-underline-opacity-0">
      <img
        src="${product._image}"
        class="card-img-top product-image"
        alt="${product._name} image"
      />
      <div class="card-body">
        <h5 class="product-title mt-3" style="text-align: center">
          ${product._name}
          ${product._store}
        </h5>
        <p class="product-title mt-3" style="text-align: center">
          ${product._price}$
        </p>
      </div>
    </a>
  </li>
`;
};

const getStoreHTML = (store) => {
  return `
  <li class="col-12 col-md-4 col-lg-3 mb-5" style="width: 18rem">
    <a href="/store/?id=${store._id}" class="link-secondary link-offset-2 link-underline link-underline-opacity-0">
      <img
        src="${store._logo}"
        class="card-img-top product-image"
        alt="${store._name} image"
      />
      <div class="card-body">
        <h5 class="product-title mt-3" style="text-align: center">
          ${store._name}
        </h5>
      </div>
    </a>
  </li>
`;
};
const insertNewProducts = (newProducts) => {
  const newProductsList = document.getElementById("new-products");

  newProducts.forEach((product) => {
    const item = getProductHTML(product);

    newProductsList.insertAdjacentHTML("beforeend", item);
  });
};

const insertFeatureProducts = (featureProducts) => {
  const featureProductsList = document.getElementById("feature-products");

  featureProducts.forEach((product) => {
    const item = getProductHTML(product);

    featureProductsList.insertAdjacentHTML("beforeend", item);
  });
};

const insertNewStore = (newStore) => {
  const newStoreList = document.getElementById("new-stores");

  newStore.forEach((store) => {
    const item = getStoreHTML(store);

    newStoreList.insertAdjacentHTML("beforeend", item);
  });
};

const insertFeatureStore = (featureStore) => {
  const featureStoreList = document.getElementById("feature-stores");

  featureStore.forEach((store) => {
    const item = getStoreHTML(store);

    featureStoreList.insertAdjacentHTML("beforeend", item);
  });
};

const getHomePageData = () => {
  fetch(`https://cosc2430-web-programming-full-stack-web.onrender.com/home`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      insertNewStore(data.newStore);
      insertNewProducts(data.newProducts);
      insertFeatureStore(data.featuredStore);
      insertFeatureProducts(data.featuredProducts);
    })
    .catch((error) => console.log(error));
};

getHomePageData();
