const prices = { 1: 5.0, 2: 8.0, 3: 2.0, 4: 3.0 };
const itemNames = { 1: "Burger", 2: "Fries", 3: "Soda", 4: "Milk Tea" };

let order = {};
let totalCost = 0.0;
let orderHistory = [];

function addOrModifyItem() {
    const itemNumber = parseInt(document.getElementById("item-select").value);
    const quantity = parseInt(document.getElementById("quantity-input").value);

    if (itemNumber >= 1 && itemNumber <= 4 && quantity > 0) {
        order[itemNumber] = quantity;
        updateOrderSummary();
        updateTotalCost();
    } else {
        alert("Invalid input. Please select a valid item and quantity.");
    }
}

function updateOrderSummary() {
    const orderList = document.getElementById("order-list");
    orderList.innerHTML = "<strong>Order Summary:</strong>";

    for (const [itemNumber, quantity] of Object.entries(order)) {
        if (quantity > 0) {
            const itemName = itemNames[itemNumber];
            const itemTotal = (prices[itemNumber] * quantity).toFixed(2);
            const listItem = document.createElement("div");
            listItem.textContent = `${itemName} × ${quantity} = $${itemTotal}`;
            orderList.appendChild(listItem);
        }
    }
}

function updateTotalCost() {
    totalCost = Object.entries(order).reduce((sum, [itemNumber, quantity]) => {
        return sum + prices[itemNumber] * quantity;
    }, 0);
    document.getElementById("total-cost").textContent = totalCost.toFixed(2);
}

function processPayment() {
    const payment = parseFloat(document.getElementById("payment-amount").value);
    if (isNaN(payment) || payment < totalCost) {
        alert(`Insufficient payment. You need $${(totalCost - payment).toFixed(2)} more.`);
    } else {
        const change = (payment - totalCost).toFixed(2);
        const receiptNumber = generateReceiptNumber();
        generateReceipt(payment, change, receiptNumber);
        saveToHistory(payment, change, receiptNumber);
        resetOrder();
    }
}

function generateReceiptNumber() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from({ length: 9 }, () => chars[Math.floor(Math.random() * chars.length)])
        .join("")
        .match(/.{1,3}/g)
        .join("-");
}

function generateReceipt(payment, change, receiptNumber) {
    const receiptContent = document.getElementById("receipt-content");
    receiptContent.innerHTML = `<strong>Receipt #${receiptNumber}</strong>`;

    for (const [itemNumber, quantity] of Object.entries(order)) {
        if (quantity > 0) {
            const itemName = itemNames[itemNumber];
            const itemTotal = (prices[itemNumber] * quantity).toFixed(2);
            receiptContent.innerHTML += `<div>${itemName} × ${quantity} = $${itemTotal}</div>`;
        }
    }

    receiptContent.innerHTML += `
        <div><strong>Total: $${totalCost.toFixed(2)}</strong></div>
        <div><strong>Payment: $${payment.toFixed(2)}</strong></div>
        <div><strong>Change: $${change}</strong></div>
    `;
}

function saveToHistory(payment, change, receiptNumber) {
    const historyDiv = document.getElementById("history");
    const historyItem = document.createElement("div");
    historyItem.classList.add("history-item");

    let orderDetails = "";
    for (const [itemNumber, quantity] of Object.entries(order)) {
        if (quantity > 0) {
            orderDetails += `${itemNames[itemNumber]} × ${quantity}, `;
        }
    }

    historyItem.textContent = `Receipt #${receiptNumber} - Order: ${orderDetails} Total: $${totalCost.toFixed(2)}, Payment: $${payment.toFixed(2)}, Change: $${change}`;
    historyDiv.appendChild(historyItem);
}

function resetOrder() {
    order = {};
    totalCost = 0.0;
    updateOrderSummary();
    updateTotalCost();
}
