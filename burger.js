
        // Function to decrease quantity and update price
        function decreaseQuantity() {
            const quantityElement = document.getElementById("quantity");
            let quantity = parseInt(quantityElement.textContent);
            if (quantity > 1) {
                quantity--;
                quantityElement.textContent = quantity;
                updatePrice(quantity);
            }
        }

        // Function to increase quantity and update price
        function increaseQuantity() {
            const quantityElement = document.getElementById("quantity");
            let quantity = parseInt(quantityElement.textContent);
            quantity++;
            quantityElement.textContent = quantity;
            updatePrice(quantity);
        }

        // Function to update price based on quantity
        function updatePrice(quantity) {
            const priceElement = document.getElementById("price");
            const pricePerItem = 5.00; // Price per item
            const totalPrice = pricePerItem * quantity;
            priceElement.textContent = "Total: RM" + totalPrice.toFixed(2);
        }

        // Function to generate a random tracking number
        function generateTrackingNumber() {
            return "TRK" + Math.floor(Math.random() * 1000000);
        }

        // Function to increase order count and customers in queue
        function increaseOrderCount() {
            // Get current order count from localStorage or default to 0
            let orderCount = localStorage.getItem("orderCount");
            orderCount = orderCount ? parseInt(orderCount) + 1 : 1;

            // Increase customers in queue by 1
            let customersInQueue = localStorage.getItem("customersInQueue");
            customersInQueue = customersInQueue ? parseInt(customersInQueue) + 1 : 1;

            // Update order count and customers in queue in localStorage
            localStorage.setItem("orderCount", orderCount);
            localStorage.setItem("customersInQueue", customersInQueue);
        }

        function submitOrder() {
            // Get food name
            const foodNameElement = document.querySelector(".food-info h2");
            const foodName = foodNameElement.textContent;

            // Get total price
            const priceElement = document.getElementById("price");
            const totalPriceText = priceElement.textContent;
            const totalPrice = parseFloat(totalPriceText.replace("Total: RM", ""));

            // Generate a random tracking number
            const trackingNumber = generateTrackingNumber();

            // Increase order count and customers in queue
            increaseOrderCount();

            // Store tracking number in localStorage
            localStorage.setItem("trackingNumber", trackingNumber);

            // Display confirmation message
            const confirmationMessage = `Your Order Tracking
            Your tracking number: ${trackingNumber}
            Customers waiting in queue: N/A`;
            if (confirm(confirmationMessage)) {
                alert("Order submitted!");
            }
        }