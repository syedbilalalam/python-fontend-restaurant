const emptyCart = `<p>Cart is empty!</p>`,
    itemsHolder = document.getElementById('itemsHolder');
let currentTotal = 0.00;


// Setting up shipping fee
const shippingFee = { standard: 100, instant: 150 };
let deliveryFee = shippingFee['standard'];

function newItem({ imageURL, name, desc, price, qt, sign }) {
    return `
    <div class="itemsRow">
        <div class="product">
            <!-- For image of the item -->
            <div class="itemIMG">
                <img src="${imageURL}">
            </div>

            <!-- Item details -->
            <div class="itemDetails">
                <p>${name}</p>
                <p>${desc}</p>
            </div>
        </div>

        <!-- Item quantity -->
        <div class="itemQuantity">
            <p class="subtract">-</p>
            <p class="quantity" data-price="${price}">${qt}</p>
            <p class="add">+</p>
        </div>

        <!-- Item price -->
        <div class="itemPrice">
            <p>Rs ${price.toFixed(2)}</p>
        </div>

        <!-- Item remove -->
        <div class="itemRemove" data-target="${sign}">
            <span class="material-symbols-outlined">
                &#xe5cd;
            </span>
        </div>
    </div>
    <hr>
    
    `
}


// Reading the localStorage
let items = 0;
const localData = localStorage.getItem('cart');
if (localData) {
    try {
        const decodedLocalData = JSON.parse(localData);

        // Checking if there is any product available or not
        if (!decodedLocalData.length) {
            itemsHolder.innerHTML += emptyCart;
        }


        decodedLocalData.forEach(element => {
            itemsHolder.innerHTML += newItem(element);
            items++;

            // Adding element's price for the summary
            currentTotal += element.price * element.qt;
        });
        calculateSummary();
    } catch {
        localStorage.clear();
    }

} else {
    itemsHolder.innerHTML += emptyCart;
}

// Updating items
document.getElementById('nItems').innerText = items + ' item' + ((items == 1) ? '' : 's');





// Listening to the quatity change
const addButton = document.getElementsByClassName('add');
const quantityElem = document.getElementsByClassName('quantity');
const subtractButton = document.getElementsByClassName('subtract');
const deleteButton = document.getElementsByClassName('itemRemove');
for (let i = 0; i < addButton.length; i++) {
    addButton[i].onclick = () => {
        const currentQuantity = parseInt(quantityElem[i].innerText);
        if (currentQuantity < 10) {
            const newQuantity = currentQuantity + 1;

            // Updating the element
            quantityElem[i].innerText = newQuantity;

            // Updating the whole summary
            currentTotal += parseInt(quantityElem[i].dataset.price);
            calculateSummary();

            // Updating localStorage
            currentData = JSON.parse(localStorage.getItem('cart'));
            currentData.forEach(element => {
                if (element.sign == deleteButton[i].dataset.target)
                    element.qt = newQuantity;
            })
            localStorage.setItem('cart', JSON.stringify(currentData));

        }
    }
    subtractButton[i].onclick = () => {
        const currentQuantity = parseInt(quantityElem[i].innerText);
        if (currentQuantity > 1) {
            const newQuantity = currentQuantity - 1;

            // Updating the element
            quantityElem[i].innerText = newQuantity;
            // Updating the whole summary
            currentTotal -= parseInt(quantityElem[i].dataset.price);
            calculateSummary();

            // Updating localStorage
            currentData = JSON.parse(localStorage.getItem('cart'));
            currentData.forEach(element => {
                if (element.sign == deleteButton[i].dataset.target)
                    element.qt = newQuantity;
            })
            localStorage.setItem('cart', JSON.stringify(currentData));
        }
    }

    // Listening for delete requests
    deleteButton[i].onclick = () => {
        const target = deleteButton[i].dataset.target;

        // Fetching localStorage data
        let localData = JSON.parse(localStorage.getItem('cart'));
        let index = 0;
        localData.forEach(element => {
            if (element.sign == target) {
                // Starting the delete process
                localData.splice(index, 1);

                // Updating the localstorage
                localStorage.setItem('cart', JSON.stringify(localData));

                // Reloading the page
                window.location.reload();
            }
            index++;
        });
    }
}

// Listening to the method changes in delivery
document.getElementById('deliveryOption').oninput = (e) => {
    deliveryFee = shippingFee[e.target.value];
    // Re-calculating cart summary
    calculateSummary();
}

// Function that calculates summary
function calculateSummary() {
    // Calculating surray number of items
    document.getElementById('numberOfItemsAtSum').innerText = 'ITEM' + ((items == 1) ? ' ' : 'S ') + items;
    document.getElementById('totalAmount').innerText = currentTotal.toFixed(2);
    document.getElementById('netAmount').innerText = (currentTotal ? (currentTotal + deliveryFee) : 0).toFixed(2);
}
calculateSummary();


// Listening checkout button
document.getElementById('checkout').onclick = () => {
    if (!items)
        alert('Cart is empty!');
    else if (!username)
        alert('Login first to checkout your cart!');
    else {
        alert('Order successful! Tastly meal is on the way.');
        // Clearing the localStorage
        localStorage.clear();
        window.location.replace('/');
    }
}