// import { easyPagination } from './easyPagination.js';


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

        easyPagination ({
            items: products,
            rows: 5,
            buttonsWrapper: "#pagination",
            handlePaginatedItems: (products) => {
            //   const list = document.getElementById("list");
            //   list.innerHTML = "";
                products.forEach ((product, i) => {
            
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
        }).paginate();
        
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
    }

    //* 5. add Event Listeners

    //Dropdown eventListener
    const setEventListeners = (products) => {
        //Category dropdown eventListener
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

        // Sort eventListeners
        //select button
        const sortButton = document.getElementById("sort-button");
        //create a NodeList of the sort options 
        const sortOptions = document.querySelectorAll(".sort-item");
        console.log("sortOptions: ", sortOptions);

        // when "clicking" an option change the button's name as the selected option and trigger combinedFilters().
        sortOptions.forEach((option) => {
            option.addEventListener("click", (e) => {
                // change button's name to the selected option's name
                sortButton.innerText = e.target.innerText;
                const sortButtonText =  sortButton.innerText;
                // console.log("sortButtonText: ", sortButtonText);
                const selectedOption = e.target.dataset.sort;
                console.log("selectedOption: ", selectedOption);
                combinedFilters(products);

            })
            console.log("sortButton: ", sortButton.innerText);
        })
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

        //get sort value
        const sortButton = document.getElementById("sort-button");
        const sortButtonText = sortButton.innerText;
        console.log("sortButtonText: ", sortButtonText);

 
        //return a filtered array based on the conditions established in the block
        const filteredProducts = products.filter((product) => {
            return  (selectedCategory === product.category || selectedCategory === "all") && (pattern.test(product.title))
            && (checkboxesValues.some(([low, high]) => product.price >= low && product.price <= high) || checkboxes.length < 1);
            
        })

        // displayProducts(sortProducts(filteredProducts, sortButtonText));

        const newItems = sortProducts(filteredProducts, sortButtonText);
        const pagination = easyPagination ({
            items: newItems,
            rows: 5,
            buttonsWrapper: "#pagination",
            handlePaginatedItems: (items) => {
            //   const list = document.getElementById("list");
            //   list.innerHTML = "";
            displayProducts(items)
            }
        });
        pagination.changeItems(newItems);

    };

};
        
getData();

//* Helper Functions

// Sort Products function
function sortProducts (filteredProducts, sortButtonText) {
    if (sortButtonText === "Sort products") {
        return filteredProducts; 
    } else {
        return filteredProducts.sort((a, b) => {
            if (sortButtonText === "Price Ascending") {
                return a.price - b.price;
            } else if (sortButtonText === "Price Descending") {
                return b.price - a.price;
            } else if (sortButtonText === "Rating") {
                return b.rating.rate - a.rating.rate;
            }
        });
    }
}


// Count stars function
function countStars (product) {
    let intRate = parseInt(product.rating.rate);
    let fullStar = "★";
    let emptyStar = "☆";
    return fullStar.repeat(intRate) + emptyStar.repeat(5 - intRate);
}

// Pagination Function
const easyPagination = ({
    items,
    rows = 5,
    handlePaginatedItems,
    buttonsWrapper,
    buttonsContainerClass = "pagination",
    buttonClass = "page-link",
    nextClass = "page-link",
    prevClass = "page-link",
    nextText = "next >",
    prevText = "< prev",
    activeClass = "active",
  }) => {
    if (!items) {
      console.error("items not defined. Send {items: ...} as a parameter.");
      return false;
    }
  
    const generateUID = () => {
      var firstPart = (Math.random() * 46656) | 0;
      var secondPart = (Math.random() * 46656) | 0;
      firstPart = ("000" + firstPart.toString(36)).slice(-3);
      secondPart = ("000" + secondPart.toString(36)).slice(-3);
      return firstPart + secondPart;
    };
  
    const createPaginationButtons = ({ wrapper }) => {
      let paginationButtons = document.createElement("div");
  
      paginationButtons.classList.add(
        "pagination-" + uuid,
        buttonsContainerClass
      );
  
      let paginationButton = (page) => {
        let button = document.createElement("button");
        button.setAttribute("type", "button");
        button.classList.add(buttonClass);
  
        if (currentPage == page) button.classList.add(activeClass);
  
        button.innerHTML = page;
  
        button.addEventListener("click", function () {
          currentPage = page;
  
          self.paginate(currentPage, false);
  
          let current_btn = getActiveBtn();
          current_btn.classList.remove("active");
  
          button.classList.add("active");
        });
  
        return button;
      };
  
      let prevNextBtns = () => {
        let prevBtn = document.createElement("button");
        prevBtn.setAttribute("type", "button");
        prevBtn.classList.add(prevClass);
        prevBtn.innerHTML = prevText;
  
        let nextBtn = document.createElement("button");
        nextBtn.setAttribute("type", "button");
        nextBtn.classList.add(nextClass);
        nextBtn.innerHTML = nextText;
  
        prevBtn.addEventListener("click", () => {
          self.prev();
        });
  
        nextBtn.addEventListener("click", () => {
          self.next();
        });
  
        return { prevBtn, nextBtn };
      };
  
      const { prevBtn, nextBtn } = prevNextBtns();
  
      paginationButtons.appendChild(prevBtn);
  
      for (let i = 1; i < pageCount + 1; i++) {
        let btn = paginationButton(i);
        paginationButtons.appendChild(btn);
      }
  
      paginationButtons.appendChild(nextBtn);
  
      wrapper.appendChild(paginationButtons);
    };
  
    const getAllBtns = () => {
      return document.querySelectorAll(`.${"pagination-" + uuid} button`);
    };
  
    const getActiveBtn = () => {
      return document.querySelector(`.${"pagination-" + uuid} button.active`);
    };
  
    const uuid = generateUID();
    rows = parseInt(rows);
    let currentPage = 1;
    let pageCount = Math.ceil(items.length / rows);
    const hasButtons = typeof buttonsWrapper != "undefined";
  
    const self = {
      paginate: (page = 1, loadButtons = true) => {
        page--;
  
        let start = rows * page;
        let end = start + rows;
        let paginatedItems = items.slice(start, end);
  
        if (loadButtons && buttonsWrapper)
          createPaginationButtons({
            wrapper: document.querySelector(buttonsWrapper),
          });
  
        if (handlePaginatedItems) {
          handlePaginatedItems(paginatedItems);
        } else return paginatedItems;
      },
      next: () => {
        if (currentPage >= pageCount) return;
        currentPage++;
        let page = currentPage - 1;
        let start = rows * page;
        let end = start + rows;
        let paginatedItems = items.slice(start, end);
  
        if (hasButtons) {
          let current_btn = getActiveBtn();
          current_btn.classList.remove("active");
          current_btn.nextElementSibling.classList.add("active");
        }
  
        if (handlePaginatedItems) {
          handlePaginatedItems(paginatedItems);
        } else return paginatedItems;
      },
      prev: () => {
        if (currentPage === 1) return;
        currentPage--;
  
        let page = currentPage - 1;
        let start = rows * page;
        let end = start + rows;
        let paginatedItems = items.slice(start, end);
  
        if (hasButtons) {
          let currentButton = getActiveBtn();
          currentButton.classList.remove("active");
          currentButton.previousElementSibling.classList.add("active");
        }
  
        if (handlePaginatedItems) {
          handlePaginatedItems(paginatedItems);
        } else return paginatedItems;
      },
      changeRows: (newRows = 10) => {
        rows = parseInt(newRows);
        document.querySelector(".pagination-" + uuid).remove();
        self.paginate(currentPage);
      },
      changeItems: (newItems) => {
        if (!newItems) return false;
  
        document.querySelector(".pagination-" + uuid)?.remove();
  
        items = newItems;
        pageCount = Math.ceil(items.length / rows);
        currentPage = 1;
  
        self.paginate(1);
      },
    };
  
    return self;
  };

  
  
  