// Get order details element
const orderDetails = document.getElementById("orderDetails");

// Dummy order details (replace with actual data from order.html)
const orderItems = [
  { name: "Big Mac", quantity: 2, price: 5.99 },
  { name: "French Fries", quantity: 1, price: 2.49 },
  // Add more items as needed
];

// Function to generate order details HTML
function generateOrderDetails() {
  let html = "<h2>Order Details:</h2>";
  html += "<ul>";
  orderItems.forEach((item) => {
    html += `<li>${item.name} - Quantity: ${item.quantity} - Price: $${(item.quantity * item.price).toFixed(2)}</li>`;
  });
  html += "</ul>";
  orderDetails.innerHTML = html;
}

// Call the function to generate order details
generateOrderDetails();
