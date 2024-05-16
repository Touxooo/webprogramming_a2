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

getShoppingCartData();
