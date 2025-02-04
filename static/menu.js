const menuButtons = document.getElementsByClassName('menuBtn'),
    productImage = document.getElementsByClassName('menuItemIMG'),
    productName = document.getElementsByClassName('menuItemName'),
    productDesc = document.getElementsByClassName('menuItemDesc'),
    productPrice = document.getElementsByClassName('menuItemPrice');
for (let i = 0; i < menuButtons.length; i++) {
    menuButtons[i].onclick = () => {
        let alreadyInTheCart = false;
        // Adding to the cart
        const productInformation = {
            imageURL: productImage[i].src,
            name: productName[i].innerText,
            desc: productDesc[i].innerText,
            price: parseInt(productPrice[i].innerText),
            qt: 1,
            sign: md5(productName[i].innerText + productDesc[i].innerText)
        }
        if (!localStorage.getItem('cart')) {
            localStorage.setItem('cart', '[]');
        }
        const decodedLocalData = JSON.parse(localStorage.getItem('cart'));
        // Checking if the product is already in the localStorage or not
        for (let j = 0; j < decodedLocalData.length; j++) {
            if (decodedLocalData[j].sign == productInformation.sign) {
                const userAgreed = confirm('Already in the cart! Do you want to view your cart ?');
                if (userAgreed) {
                    window.location.replace('/cart');
                }
                alreadyInTheCart = true;
                break;
            }
        }
        if (!alreadyInTheCart) {
            decodedLocalData.push(productInformation);
            localStorage.setItem('cart', JSON.stringify(decodedLocalData));
            const userAgreed = confirm('Added to the cart! Do you want to view your cart ?');
            if (userAgreed)
                window.location.replace('/cart');
        }
    }
}