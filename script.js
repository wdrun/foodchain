// Prices for each item
const prices = { 1: 5.0, 2: 8.0, 3: 2.0, 4: 3.0 };

// Track selected items and total cost
let selectedItems = [];
let totalCost = 0.0;

// Add item to the order
function addItem() {
    const itemInput = document.getElementById("item-select");
    const itemNumber = parseInt(itemInput.value);

    if (itemNumber >= 1 && itemNumber <= 4) {
        selectedItems.push(itemNumber);
        totalCost += prices[itemNumber];
        updateOrderList();
        updateTotalCost();
        itemInput.value = ""; // Clear input
    } else {
        alert("Invalid choice. Please select a valid item (1-4).");
    }
}

// Update the displayed order list
function updateOrderList() {
    const orderList = document.getElementById("order-list");
    orderList.innerHTML = "Items selected: " + selectedItems.join(", ");
}

// Update the displayed total cost
function updateTotalCost() {
    const totalCostElement = document.getElementById("total-cost");
    totalCostElement.textContent = totalCost.toFixed(2);
}

// Process payment
function processPayment() {
    const paymentInput = document.getElementById("payment-amount");
    const payment = parseFloat(paymentInput.value);
    const resultElement = document.getElementById("result");

    if (isNaN(payment) || payment < totalCost) {
        const deficit = (totalCost - payment).toFixed(2);
        resultElement.innerHTML = `Insufficient payment. You need $${deficit} more.`;
        resultElement.style.color = "red";
    } else {
        const change = (payment - totalCost).toFixed(2);
        resultElement.innerHTML = `Payment accepted. Your change is: $${change}`;
        resultElement.style.color = "green";
    }

    paymentInput.value = ""; // Clear input
}
