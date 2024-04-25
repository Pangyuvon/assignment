let orderCount = 0;
let botCount = 0;
let pendingOrders = [];
let completeOrders = [];
let activeBots = [];

function Order(orderType) {
  this.orderNumber = ++orderCount;
  this.orderType = orderType;
  this.status = "PENDING";
}

function Bot() {
  this.botNumber = ++botCount;
  this.isBusy = false;
}

function createOrder(orderType) {
  const order = new Order(orderType);
  if (orderType === "VIP") {
    pendingOrders.unshift(order);
  } else {
    pendingOrders.push(order);
  }
  displayOrders();
}

function addBot() {
  const bot = new Bot();
  activeBots.push(bot);
  processOrders();
}

function removeBot() {
  if (activeBots.length > 0) {
    activeBots.pop();
    processOrders();
  }
}

function processOrders() {
  activeBots.forEach(bot => {
    if (!bot.isBusy && pendingOrders.length > 0) {
      const order = pendingOrders.shift();
      bot.isBusy = true;
      order.status = "PROCESSING";
      setTimeout(() => {
        order.status = "COMPLETE";
        completeOrders.push(order);
        bot.isBusy = false;
        displayOrders();
        processOrders();
      }, 10000);
    }
  });
}

function displayOrders() {
  const pendingOrdersList = document.getElementById("pendingOrders");
  const completeOrdersList = document.getElementById("completeOrders");
  pendingOrdersList.innerHTML = "";
  completeOrdersList.innerHTML = "";

  pendingOrders.forEach(order => {
    const listItem = document.createElement("li");
    listItem.textContent = `Order ${order.orderNumber} (${order.orderType}) - ${order.status}`;
    pendingOrdersList.appendChild(listItem);
  });

  completeOrders.forEach(order => {
    const listItem = document.createElement("li");
    listItem.textContent = `Order ${order.orderNumber} (${order.orderType}) - ${order.status}`;
    completeOrdersList.appendChild(listItem);
  });
}

function submitOrder(orderType) {
  const order = new Order(orderType);
  if (orderType === "VIP") {
    pendingOrders.unshift(order);
  } else {
    pendingOrders.push(order);
  }
  localStorage.setItem("trackingNumber", order.orderNumber);
  localStorage.setItem("customersInQueue", pendingOrders.length - 1);
  window.location.href = "orderTracking.html";
}

window.onload = () => {
  displayOrders();
  processOrders();
};
