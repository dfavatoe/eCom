console.log(products);

//* Create Cards

const displayProducts = (productsArray) => {
    const cardsContainer = document.querySelector(".row");

    for (let i = 0; i < productsArray.length; i++) {
        const cardContainer = document.createElement("div");
        cardContainer.setAttribute("class", "col-sm-6 col-md-4 col-lg-2"); 
        cardContainer.classList.add("card"); // or ..classList.add("card")
        // cardContainer.setAttribute("style", "width: 18rem;");

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

function addButtonEvent () {
    //1. Locate the html element
    const myButton = document.querySelector(".btn");

    //2. add the eventListener
    myButton.addEventListener("click", function () {
        alert("you clicked me");
    })
}

function changeButtonBackground () {
    const myButton = document.querySelector(".btn");
    myButton.setAttribute("style", "color: red");

//     const bgColor = myButton.getAttribute("style");
//     if (bgColor === "background-color: red") {
//         console.log("bgColor: ", bgColor);
//         console.log("true");
//         myButton.setAttribute("style", "background-color: blue");  
//     }
    
}

function changeButtonBackground2 () {
    const myButton = document.querySelector(".btn");

    const bgColor = myButton.getAttribute("style");
    if (bgColor === "background-color: red") {
        console.log("bgColor: ", bgColor);
        console.log("true");
        myButton.setAttribute("style", "background-color: blue");  
    }
    
}

function changeColorEvent () {
    const myButton = doc.querySelector("btn");
    myButton.addEventListener("mouseenter", changeButtonBackground);
    myButton.addEventListener("mouseleave", changeButtonBackground2);

}

displayProducts(products);
addButtonEvent();
changeColorEvent();

