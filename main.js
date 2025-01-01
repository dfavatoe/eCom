//* 1. Fetch Data

function getData() {
    fetch("https://fakestoreapi.com/products").then((response) => 
    {
        console.log("response: ", response);
        return response.json();
    }).then((result) => {
        console.log("result: ", result);
        const products = result;
        controller(products);
    }).catch((error) => {
        console.log("error: ", error);
    })

    //* 2. Create Cards

    const displayProducts = (products) => {
        const cardsContainer = document.querySelector(".row");
        cardsContainer.innerHTML="";

        products.forEach((product, i) => {
            
                const cardContainer = document.createElement("div");
                cardContainer.setAttribute("class", "card");
                // cardContainer.classList.add("d-inline");

                const cardRow = document.createElement("div");
                cardRow.setAttribute("class", "row");
                cardRow.classList.add("g-0");

                const column1 = document.createElement("div");
                column1.setAttribute("class", "col-lg-4");


                const imageBG = document.createElement("div");
                imageBG.setAttribute("class", "img-bg");
                // imageBG.classList.add("d-inline");

                const cardImage = document.createElement("img");
                cardImage.setAttribute("src", product.image);
                cardImage.setAttribute("alt", "picture of the product");
                // cardImage.classList.add("d-inline");

                const column2 = document.createElement("div");
                column2.setAttribute("class", "col-lg-8");

                const cardBody = document.createElement("div");
                cardBody.setAttribute("class", "card-body");
                // cardBody.classList.add("d-inline");

                const cardTitle = document.createElement("h5");
                cardTitle.setAttribute("class", "card-title");
                // cardTitle.classList.add("d-inline");
                cardTitle.innerText = product.title;

                const cardPrice = document.createElement("p");
                cardPrice.setAttribute("class", "card-price");
                cardPrice.classList.add("lead");
                cardPrice.innerText = product.price.toFixed(2) + " €";

                const cardDescription = document.createElement("p");
                cardDescription.setAttribute("class", "card-text");
                // cardDescription.classList.add("d-inline");
                cardDescription.innerText = product.description;

                const cardStars = document.createElement("p");
                cardStars.setAttribute("class", "stars-rate");
                cardStars.innerText = countStars(product);

                const cardRate = document.createElement("p");
                cardRate.setAttribute("class", "text-body-secondary");
                // cardDescription.classList.add("d-inline");
                cardRate.innerText = "Rate: " + product.rating.rate + " | " + "Count: " +  product.rating.count;
                
                const cartButton = document.createElement("button");
                cartButton.setAttribute("type", "button");
                cartButton.setAttribute("class", "btn");
                cartButton.classList.add("btn-warning");
                cartButton.classList.add("cart-button");
                cartButton.innerText = "Add to cart";

                
                
                //append elements to correspondent containers
                cardContainer.appendChild(cardRow);
                cardRow.appendChild(column1);
                column1.appendChild(imageBG);
                imageBG.appendChild(cardImage);
                cardRow.appendChild(column2);
                column2.appendChild(cardBody); 
                cardBody.appendChild(cardTitle);
                cardBody.appendChild(cardPrice);
                cardBody.appendChild(cardDescription);
                cardBody.appendChild(cardStars);
                cardBody.appendChild(cardRate);
                cardBody.appendChild(cartButton);
                
                cardsContainer.appendChild(cardContainer); 
          
        });
    }
    

    //* 3. Generate Dropdown Filter options
        const createDropdown = (products) => {
            const dropdown = document.getElementById("categoryDropdown");
            const categories = products.map((product) => {
                return product.category;
            });
            
            const uniqueCategories = [...new Set(categories)].sort();

            uniqueCategories.forEach((categoryName) => {
                const option = document.createElement("option");
                option.setAttribute("class", "dropdown-item");
                option.value = categoryName;
                option.innerText = categoryName;

                dropdown.appendChild(option);
            })
        }


    //* 4. Controller Function

    function controller(products) {
        //build Cards with the data
        displayProducts(products);
        // Generate Dropdown Filter options
        createDropdown(products);
        // set event Listeners
        setEventListeners(products);
        // isInCheckboxRange(products);
    }

    //* 5. add Event Listeners

    //Dropdown eventListener
    const setEventListeners = (products) => {
        //Category dropdown eventLstener
        const categoryDropdown = document.querySelector("#categoryDropdown");
        categoryDropdown.addEventListener("change", (event) => {
            // console.log("option selected", event.target.value);
            combinedFilters(products);
        });

        //Search eventListener
        const input = document.querySelector(".form-control");

        input.addEventListener("keydown", (event) => {  
            // console.log("event keydown: ", event.key);
            if(event.key === "Enter") {
                combinedFilters(products);
            }
        });

        //Price Checkbox eventListener
        const checkboxes = document.querySelectorAll("input[type='checkbox']");
        // console.log("checkboxes: ", checkboxes);
        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener("change", () => {
                // console.log("checkbox selected");
                combinedFilters(products);
                
            });
        });
    }
    

    //* 6. Combined Filters
        
    const combinedFilters = (products) => {

        //get checkboxes values
        //create a NodeList of the selected checkboxes
        const checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
        console.log("checkboxes: ", checkboxes);
        //transform the NodeList into an Array of selected checkboxes
        const checkboxesArray = Array.from(checkboxes);
            console.log("checkboxesArray: ", checkboxesArray);
        //map the values of the Array into a new Array just with the selected checkboxes values in integers
        const checkboxesValues = checkboxesArray.map((checkbox) => {
            // split the string values using the comma as the splitter
            const stringArray = checkbox.value.split(",");
            //return a number array from the previous string's value
            return stringArray.map(Number);
            })
            console.log("checkboxesValues: ", checkboxesValues);    
        
        //get category's value
        const selectedCategory = document.querySelector("#categoryDropdown").value;

        //get search title's value
        const searchedTitle = document.querySelector(".form-control").value;
        // create a case-insensitive pattern/regular-expression of the searched title
        const pattern = new RegExp(searchedTitle, "i");
        // console.log("categoryDropdownValue, searchedTitleValue: ", selectedCategory, searchedTitle);

        //return a filtered array based on the conditions established in the block
        const filteredProducts = products.filter((product) => {
            return  (selectedCategory === product.category || selectedCategory === "all") && (pattern.test(product.title))
            && (checkboxesValues.some(([low, high]) => product.price >= low && product.price <= high) || checkboxes.length < 1);
            
        })

        displayProducts(filteredProducts);
    };
    
};
        
getData();

function countStars (product) {
    let intRate = parseInt(product.rating.rate);
    // let starCode = "⭐️";
    let fullStar = "★";
    let emptyStar = "☆";
    return fullStar.repeat(intRate) + emptyStar.repeat(5 - intRate);
}