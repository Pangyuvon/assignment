class Item {
  constructor(name, image, price) {
    this.name = name;
    this.image = image;
    this.price = price;
    this.quantity = 0;
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }

  getTotalPrice() {
    return this.quantity * this.price;
  }
}

const burgerList = document.getElementById("burgerList");
const drinkList = document.getElementById("drinkList");

function createItem(item, list) {
  const itemContainer = document.createElement("div");
  itemContainer.classList.add("item");

  const itemName = document.createElement("h2");
  itemName.textContent = item.name;

  const itemImage = document.createElement("img");
  itemImage.src = item.image;
  itemImage.alt = item.name;

  const itemQuantity = document.createElement("p");
  itemQuantity.textContent = `Quantity: ${item.quantity}`;

  const itemPrice = document.createElement("p");
  itemPrice.textContent = `Price: RM${item.getTotalPrice().toFixed(2)}`;

  const increaseButton = document.createElement("button");
  increaseButton.textContent = "+";
  increaseButton.addEventListener("click", () => {
    item.increaseQuantity();
    updateOrder();
  });

  const decreaseButton = document.createElement("button");
  decreaseButton.textContent = "-";
  decreaseButton.addEventListener("click", () => {
    item.decreaseQuantity();
    updateOrder();
  });

  itemContainer.appendChild(itemName);
  itemContainer.appendChild(itemImage);
  itemContainer.appendChild(itemQuantity);
  itemContainer.appendChild(itemPrice);
  itemContainer.appendChild(increaseButton);
  itemContainer.appendChild(decreaseButton);

  list.appendChild(itemContainer);
}

const burgerItems = [
  new Item("Big Mac - RM5.99", "burger.png", 5.99),
  // Add more burger items as needed
];

const drinkItems = [
  new Item("Coca-Cola - RM2.00", "cola.png", 2.00),
  new Item("Sprite - RM2.00", "sprite.png", 2.00),
  // Add more drink items as needed
];

function updateOrder() {
  burgerList.innerHTML = "";
  drinkList.innerHTML = "";

  burgerItems.forEach((item) => createItem(item, burgerList));
  drinkItems.forEach((item) => createItem(item, drinkList));

  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit Order";
  submitButton.addEventListener("click", () => {
    window.location.href = "payment.html";
  });

  burgerList.appendChild(submitButton.cloneNode(true));
  drinkList.appendChild(submitButton.cloneNode(true)); // Clone submit button for drink list
}

updateOrder();
