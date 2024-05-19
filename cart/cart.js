(function () {
  "use strict";

  const sitePlusMinus = function () {
    let value,
      quantity = document.getElementsByClassName("quantity-container");

    function createBindings(quantityContainer) {
      const quantityAmount =
        quantityContainer.getElementsByClassName("quantity-amount")[0];
      const increase = quantityContainer.getElementsByClassName("increase")[0];
      const decrease = quantityContainer.getElementsByClassName("decrease")[0];
      increase.addEventListener("click", function (e) {
        increaseValue(e, quantityAmount);
      });
      decrease.addEventListener("click", function (e) {
        decreaseValue(e, quantityAmount);
      });
    }

    function init() {
      for (let i = 0; i < quantity.length; i++) {
        createBindings(quantity[i]);
      }
    }

    function increaseValue(event, quantityAmount) {
      value = parseInt(quantityAmount.value, 10);
      value = isNaN(value) ? 0 : value;
      value++;
      quantityAmount.value = value;
      updateCart("add", quantityAmount.closest("tr").dataset.productId);
    }

    function decreaseValue(event, quantityAmount) {
      value = parseInt(quantityAmount.value, 10);
      value = isNaN(value) ? 0 : value;
      if (value > 0) {
        value--;
        quantityAmount.value = value;
        updateCart("rmv", quantityAmount.closest("tr").dataset.productId);
      }
    }

    init();
  };
  sitePlusMinus();

  const updateCart = (action, productId) => {
    const accessToken = localStorage.getItem("access_token");
    const url = `https://cosc2430-web-programming-full-stack-web.onrender.com/order/${action}/${productId}`;

    fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.newQuantity !== undefined) {
          console.log(
            `Product ${productId} ${action}ed. New quantity: ${data.newQuantity}`
          );
        } else {
          console.error(`Failed to ${action} product ${productId}.`, data);
        }
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const removeProduct = (event) => {
    event.preventDefault();
    const productId = event.target.closest("tr").dataset.productId;
    console.log(productId);
    updateCart("rmv", productId);
  };

  document.querySelectorAll(".product-remove a").forEach((button) => {
    button.addEventListener("click", removeProduct);
  });
})();

const insertProductsHTML = (products) => {
  console.log(products);
  const list = document.getElementById("products-list-body");
  let total = 0;

  products.forEach(({ product, quantity }) => {
    total += product._price * quantity;
    list.insertAdjacentHTML(
      "beforeend",
      `
      <tr data-product-id="product">
        <td class="product-thumbnail">
          <img
            src="${product._image}"
            alt="${product._name}"
            class="img-fluid"
          />
        </td>
        <td class="product-name">
          <h2 class="h5">${product._name}</h2>
        </td>
        <td>${product._price}$</td>
        <td class="justify-content-center">
          <div
            class="input-group mb-3 d-flex align-items-center quantity-container"
            style="max-width: 120px"
          >
            <div class="input-group-prepend">
              <button
                class="btn btn-outline-black decrease"
                type="button"
              >
                &minus;
              </button>
            </div>
            <input
              type="text"
              class="form-control text-center quantity-amount"
              value="${quantity}"
              placeholder=""
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
            />
            <div class="input-group-append">
              <button
                class="btn btn-outline-black increase"
                type="button"
              >
                &plus;
              </button>
            </div>
          </div>
        </td>
        <td>${quantity * product._price}$</td>
        <td>
          <a
            id="rmv"
            href="#"
            class="btn btn-black btn-sm"
            >X</a
          >
        </td>
      </tr>
    `
    );
  });

  document.getElementById("subtotal").innerHTML = total + "$";
  document.getElementById("total").innerHTML = total + "$";
};

const getShoppingCartData = () => {
  const accessToken = localStorage.getItem("access_token");

  fetch("https://cosc2430-web-programming-full-stack-web.onrender.com/order", {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((res) => res.json())
    .then((data) => insertProductsHTML(data))
    .catch((error) => console.log(error));
};

getShoppingCartData();
