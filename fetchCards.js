function getData() {
    fetch("https://fakestoreapi.com/products").then((response) => 
    {
        console.log("response: ", response);
        // const resolvedResponse = response.json();
        // console.log("resolvedResponse: ", resolvedResponse);
        return response.json();
    }).then((result) => {
        console.log("result: ", result);
        const products = result;
        // buildCards(result);
        displayProducts(products);
    }).catch((error) => {
        console.log("error: ", error);
    })

    //* Create Cards

    const displayProducts = (productsArray) => {
        const cardsContainer = document.querySelector(".row");

        for (let i = 0; i < productsArray.length; i++) {
            const cardContainer = document.createElement("div");
            cardContainer.setAttribute("class", "col-sm-6 col-md-4 col-lg-2");
            cardContainer.classList.add("card");
            // cardContainer.setAttribute("style", "min-width: 18rem;");

            const cardImage = document.createElement("img");
            cardImage.setAttribute("src", productsArray[i].image);
            cardImage.setAttribute("alt", "picture of the product");

            const cardBody = document.createElement("div");
            cardBody.setAttribute("class", "card-body");

            const cardTitle = document.createElement("h5");
            cardTitle.setAttribute("class", "card-title");
            cardTitle.innerText = productsArray[i].title;

            const cardDescription = document.createElement("p");
            cardDescription.setAttribute("class", "card-text");
            cardDescription.innerText = productsArray[i].description;

            const cardPrice = document.createElement("p");
            cardPrice.setAttribute("class", "card-price");
            cardPrice.innerText = productsArray[i].price + " €";
            
            cardContainer.appendChild(cardImage); //Attention append the image to the cardContainer and not cardsContainer
            cardContainer.appendChild(cardBody);
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardDescription);
            cardBody.appendChild(cardPrice);
            cardsContainer.appendChild(cardContainer);
            
            
        }
    }
        
}


getData();