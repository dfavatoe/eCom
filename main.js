//* 1. Fetch Data

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
        controller(products);
    }).catch((error) => {
        console.log("error: ", error);
    })

    //* 2. Create Cards

    const displayProducts = (products) => {
        const cardsContainer = document.querySelector(".row");
        cardsContainer.innerHTML="";
        for (let i = 0; i < products.length; i++) {
            const cardContainer = document.createElement("div");
            cardContainer.setAttribute("class", "col-sm-6 col-md-4 col-lg-2");
            cardContainer.classList.add("card");
            // cardContainer.setAttribute("style", "min-width: 18rem;");

            const cardImage = document.createElement("img");
            cardImage.setAttribute("src", products[i].image);
            cardImage.setAttribute("alt", "picture of the product");

            const cardBody = document.createElement("div");
            cardBody.setAttribute("class", "card-body");

            const cardTitle = document.createElement("h5");
            cardTitle.setAttribute("class", "card-title");
            cardTitle.innerText = products[i].title;

            const cardDescription = document.createElement("p");
            cardDescription.setAttribute("class", "card-text");
            cardDescription.innerText = products[i].description;

            const cardPrice = document.createElement("p");
            cardPrice.setAttribute("class", "card-price");
            cardPrice.innerText = products[i].price + " €";
            
            cardContainer.appendChild(cardImage); //Attention append the image to the cardContainer and not cardsContainer
            cardContainer.appendChild(cardBody);
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardDescription);
            cardBody.appendChild(cardPrice);
            cardsContainer.appendChild(cardContainer); 
        }
    }

    //* 3. Generate Dropdown Filter options
        const createDropdown = (products) => {
            const dropdown = document.getElementById("categoryDropdown");
            const categories = products.map((product) => {
                return product.category;
            });
            // console.log("categories: ", categories);
            
            const uniqueCategories = [...new Set(categories)].sort();
            // console.log("uniqueCategories: ", uniqueCategories);

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
        //Search Event Listener
        addEventListener(products);

    }

    //* 5. add Event Listeners
    //On Option change, filter data
    const setEventListeners = (products) => {
        const categoryDropdown = document.querySelector("#categoryDropdown");
        categoryDropdown.addEventListener("change", (event) => {
            // console.log("option selected", event.target.value);
            filterByDropDown(products);
        }); //! change event didn't work with Bootstrap's button configuration (<ul> instead of <select>)
        
    }

    //Search eventListener
    const addEventListener = (products) => {
        const input = document.querySelector(".form-control");
        input.addEventListener("input", (event) => {
            // console.log("i am typing");
            // console.log("event input: ", event.target.value);
        });

        input.addEventListener("keydown", (event) => {  
            console.log("event keydown: ", event.key);
            if(event.key === "Enter") {
                filterBySearch(products);
            }
        })


    }

    //* 6. Filter by Search
        //get search/input value
        const filterBySearch = (products) => {
            const searchedTitle = document.querySelector(".form-control").value;
            // console.log("searched product: ", searchedTitle);
            const regex = new RegExp(searchedTitle, "i");
            const filteredProductTitles =  products.filter((product) => {

                if (regex.test(product.title)) {
                    return product.title;
                }
            })

            displayProducts(filteredProductTitles);
        }




    //* 7. Filter by Dropdown
        //get dropdown value
        const filterByDropDown = (products) => {
            const selectedCategory = document.querySelector("#categoryDropdown").value;
            // console.log("option selected", selectedCategory);

            const filteredProducts = products.filter((product) => {
                return (selectedCategory === product.category || selectedCategory === "all");
            })

            displayProducts(filteredProducts);
        }
}


getData();