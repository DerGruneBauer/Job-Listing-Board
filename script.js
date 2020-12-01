//let user choose between grid style and single line style in desktop mode
//write conditional to say if there are no 'featured' or 'new' classes to change padding to match rest of listings
let filter = document.querySelectorAll(".filter");
let searchbar = document.querySelector("#searchbar");
let header = document.querySelector(".header");
let clear = document.querySelector("#clear");
let searchArea = document.querySelector("#searchArea");
let clonedFilter;
let deleteButton = document.querySelectorAll("button");
let index;

//ADDS FILTERS TO SEARCH BAR
filter.forEach((filter) => {
  filter.addEventListener("click", (applyFilter) => {
    searchbar.classList.add("searchbar");
    header.style.margin = "0";
    clear.classList.add("clear");
    clear.innerHTML = "Clear";
    index = searchArea.querySelectorAll("div").length;

    clonedFilter = filter.cloneNode(true); //clones the filter that is clicked
    clonedFilter.classList.add("searched"); //adds class of 'searched' unsure if i will need this. currently not doing anything
    clonedFilter.innerHTML = `${filter.innerHTML}<button id=P${index} onclick="deleteSingleFilter()"> 
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"><path fill="#FFF" fill-rule="evenodd" d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z"/></svg>
                </button>`; //adds the remove button to the end of the searched filter
    searchArea.appendChild(clonedFilter); //adds the searched filter to the search bar

    console.log(clonedFilter.childNodes);
  });
});

//REMOVES ALL FILTER ITEMS FROM SEARCH BAR
clear.addEventListener("click", (clearAllFilter) => {
  while (searchArea.hasChildNodes()) {
    searchArea.removeChild(searchArea.firstChild);
  }

  header.style.marginBottom = "30px";
  searchbar.classList.remove("searchbar");
  clear.classList.remove("clear");
  clear.innerHTML = "";
});

//REMOVES SINGLE ITEM FROM FILTERED SEARCH BAR
let deleteSingleFilter = function () {
  let filteredNodes = searchArea.childNodes;

  filteredNodes.forEach((clonedFilter) => {
    const deleteItem = () => {
      let itemsIndex = clonedFilter.lastChild.id;
      let item = document.getElementById(itemsIndex);
      item.parentNode.remove();
    };
    clonedFilter.addEventListener("click", deleteItem);

    if (filteredNodes.length === 1) {
      header.style.marginBottom = "30px";
      searchbar.classList.remove("searchbar");
      clear.classList.remove("clear");
      clear.innerHTML = "";
    }
  });

};
