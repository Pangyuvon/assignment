class Order {
    static orderCount = 0;
  
    constructor(orderType) {
      Order.orderCount++;
      this.orderNumber = Order.orderCount;
      this.orderType = orderType;
      this.status = "PENDING";
    }
  
    processOrder() {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.status = "COMPLETE";
          resolve();
        }, 10000); // Simulating order processing time (10 seconds)
      });
    }
  }
  
  class OrderController {
    constructor() {
      this.pendingOrders = [];
      this.vipOrders = [];
      this.bots = [];
    }
  
    newOrder(orderType) {
      const order = new Order(orderType);
      if (orderType === "VIP") {
        this.vipOrders.push(order);
      } else {
        this.pendingOrders.push(order);
      }
      this.processOrders();
    }
  
    processOrders() {
      this.bots.forEach((bot) => {
        if (this.pendingOrders.length > 0) {
          const order = this.pendingOrders.shift();
          bot.processOrder(order);
        } else if (this.vipOrders.length > 0) {
          const order = this.vipOrders.shift();
          bot.processOrder(order);
        }
      });
      this.updateStatus();
    }
  
    addBot() {
      const bot = new Bot(this);
      this.bots.push(bot);
      this.processOrders();
    }
  
    removeBot() {
      if (this.bots.length > 0) {
        const bot = this.bots.pop();
        bot.stopProcessing();
        this.updateStatus();
      }
    }
  
    updateStatus() {
      const statusText = document.getElementById("statusText");
      statusText.innerHTML = `
        Pending Orders:\n${this.pendingOrders.map(order => `Order ${order.orderNumber} - ${order.orderType} - ${order.status}`).join('\n')}
        \nVIP Orders:\n${this.vipOrders.map(order => `Order ${order.orderNumber} - ${order.orderType} - ${order.status}`).join('\n')}
        \nBots:\n${this.bots.map((bot, index) => `Bot ${index + 1}: ${bot.status}`).join('\n')}
      `;
    }
  }
  
  class Bot {
    constructor(orderController) {
      this.orderController = orderController;
      this.status = "IDLE";
    }
  
    async processOrder(order) {
      this.status = "Processing Order";
      await order.processOrder();
      this.status = "IDLE";
      this.orderController.processOrders();
    }
  
    stopProcessing() {
      this.status = "IDLE";
      this.orderController.processOrders();
    }
  }
  
  const controller = new OrderController();
  
  function newOrder(orderType) {
    controller.newOrder(orderType);
  }
  
  function addBot() {
    controller.addBot();
  }
  
  function removeBot() {
    controller.removeBot();
  }
  