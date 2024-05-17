(function () {
  'use strict';

  const tinyslider = function () {
    const el = document.querySelectorAll('.testimonial-slider');

    if (el.length > 0) {
      const slider = tns({
        container: '.testimonial-slider',
        items: 1,
        axis: "horizontal",
        controlsContainer: "#testimonial-nav",
        swipeAngle: false,
        speed: 700,
        nav: true,
        controls: true,
        autoplay: true,
        autoplayHoverPause: true,
        autoplayTimeout: 3500,
        autoplayButtonOutput: false
      });
    }
  };
  tinyslider();

  const sitePlusMinus = function () {

    let value,
        quantity = document.getElementsByClassName('quantity-container');

    function createBindings(quantityContainer) {
      const quantityAmount = quantityContainer.getElementsByClassName('quantity-amount')[0];
      const increase = quantityContainer.getElementsByClassName('increase')[0];
      const decrease = quantityContainer.getElementsByClassName('decrease')[0];
      increase.addEventListener('click', function (e) {
        increaseValue(e, quantityAmount);
      });
      decrease.addEventListener('click', function (e) {
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
      updateCart('add', quantityAmount.closest('tr').dataset.productId);
    }

    function decreaseValue(event, quantityAmount) {
      value = parseInt(quantityAmount.value, 10);
      value = isNaN(value) ? 0 : value;
      if (value > 0) {
        value--;
        quantityAmount.value = value;
        updateCart('rmv', quantityAmount.closest('tr').dataset.productId);
      }
    }

    init();

  };
  sitePlusMinus();

  const getShoppingCartData = () => {

    const accessToken = localStorage.getItem("access_token");

    fetch("https://cosc2430-web-programming-full-stack-web.onrender.com/order", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
  };

  const updateCart = (action, productId) => {
    const accessToken = localStorage.getItem("access_token");
    const url = `https://cosc2430-web-programming-full-stack-web.onrender.com/order/${action}/${productId}`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      }
    })
        .then(response => response.json())
        .then(data => {
          if (data.newQuantity !== undefined) {
            console.log(`Product ${productId} ${action}ed. New quantity: ${data.newQuantity}`);
          } else {
            console.error(`Failed to ${action} product ${productId}.`, data);
          }
        })
        .catch(error => console.error(`Error: ${error}`));
  };

  const removeProduct = (event) => {
    event.preventDefault();
    const productId = event.target.closest('tr').dataset.productId;
    updateCart('rmv', productId);
  };

  document.querySelectorAll('.product-remove a').forEach(button => {
    button.addEventListener('click', removeProduct);
  });

  getShoppingCartData();
})();
