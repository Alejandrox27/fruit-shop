function loaded() {
    const buttons = Object.values(document.getElementsByClassName("button"));
    const remove_buttons = Object.values(document.getElementsByClassName("button-delete"));
    const litemplate = document.getElementById("liTemplate");
    const fragment = document.createDocumentFragment();
    const fruit_messages = document.getElementsByClassName("fruit-messages")[0];

    const buy_products = document.getElementsByClassName("buy-products")[0];

    const shopping_cart = {};

    const show_cart = () => {
        fruit_messages.textContent = "";

        Object.values(shopping_cart).forEach((product) => {
            const clone = litemplate.content.firstElementChild.cloneNode(true);

            clone.classList.add(`${product.title}`);

            clone.getElementsByClassName("title")[0].textContent = product.title;
            clone.getElementsByClassName("stock")[0].textContent = product.stock;

            fragment.appendChild(clone);
        });

        fruit_messages.appendChild(fragment);
    };
    
    const addProduct = (e) => {
        fruit = e.target.dataset.fruit;
        price = e.target.dataset.price;

        const product = {
            "id": fruit,
            "title": fruit,
            "price": parseInt(price),
            "stock": 1
        };

        if (shopping_cart.hasOwnProperty(product.id)){
            stock = shopping_cart[product.id].stock;
            product["stock"] = stock + 1;
        }

        shopping_cart[product.id] = product;

        show_cart();

    };

    const removeProduct = (e) => {
        fruit = e.target.dataset.fruit;

        if (shopping_cart.hasOwnProperty(fruit)){
            if (shopping_cart[fruit].stock == 1) {
                delete shopping_cart[fruit];

                show_cart();
                return;
            }
            shopping_cart[fruit].stock = shopping_cart[fruit].stock - 1;

            show_cart();
            
        }

    };

    const buy_all = (e) => {
        let price = 0;
        let products = ""
        Object.values(shopping_cart).forEach((product) => {
            price = price + (product.price * product.stock)
            products += product.title + ` ${product.stock}: ` + `$${product.price}\n`
        })

        if (price == 0) {
            alert("you don't have any products :(")
            return;
        };

        option = confirm(`you're going to buy these products:
${products}
Total: $${price}
        `);

        if (option) {
            alert(`Thanks for your purchase!
Total: $${price}`)
        }
    };

    buttons.forEach((button) => {
        button.addEventListener("click", addProduct, false);
    });

    remove_buttons.forEach((button) => {
        button.addEventListener("click", removeProduct, false);
    });

    buy_products.addEventListener("click", buy_all, false);
}

window.addEventListener("load", loaded, false);