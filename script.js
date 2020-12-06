//let user choose between grid style and single line style in desktop mode
let filter = document.querySelectorAll(".filter");
let searchbar = document.querySelector("#searchbar");
let header = document.querySelector(".header");
let clear = document.querySelector("#clear");
let searchArea = document.querySelector("#searchArea");
let clonedFilter;
let deleteButton = document.querySelectorAll("button");
let index;
let job = document.querySelectorAll(".job");
let arrayOfJobs = [];

//ADDS FILTERS TO SEARCH BAR
filter.forEach((filter) => {
  filter.addEventListener("click", (applyFilter) => {
    searchbar.classList.add("searchbar");
    header.style.margin = "0";
    clear.classList.add("clear");
    clear.innerHTML = "Clear";
    index = searchArea.querySelectorAll("div").length;
    clonedFilter = filter.cloneNode(true);
    clonedFilter.innerHTML = `${filter.innerHTML}<button id=P${index} onclick="deleteSingleFilter()"> 
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"><path fill="#FFF" fill-rule="evenodd" d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z"/></svg>
                </button>`;
    searchArea.appendChild(clonedFilter);

    // refreshList();

    if (searchArea.hasChildNodes) {
      for (let i = 0; i < job.length; i++) {
        let singleJob = job[i].getElementsByClassName("filter");
        for (let j = 0; j < singleJob.length; j++) {
          let singleJobFilter = singleJob[j];
          if (clonedFilter.innerHTML.includes(singleJobFilter.innerHTML)) {
            arrayOfJobs.push(job[i]);
          }
        }
        if (!arrayOfJobs.includes(job[i])) {
          job[i].style.display = "none";
        } else if (arrayOfJobs.includes(job[i])) {
          job[i].style.display = "inline-flex";
        }
      }
    }
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

  for (i = 0; i < job.length; i++) {
    job[i].style.display = "inline-flex";
    arrayOfJobs.splice(0, job.length);
  }
});

//REMOVES SINGLE ITEM FROM FILTERED SEARCH BAR
let deleteSingleFilter = function () {
  // refreshList();
  let filteredNodes = searchArea.childNodes;

  filteredNodes.forEach((clonedFilter) => {
    const deleteItem = () => {
      let itemsIndex = clonedFilter.lastChild.id;
      let item = document.getElementById(itemsIndex);
      item.parentNode.remove();
      arrayOfJobs = [];

      for (k = 0; k < searchArea.childNodes.length; k++) {
        for (i = 0; i < job.length; i++) {
          let singleJob = job[i].getElementsByClassName("filter");

          for (j = 0; j < singleJob.length; j++) {
            let deletion = job[i].lastElementChild;
            let Del = deletion.children;
            let searchedFilter = filteredNodes[k].firstChild.nodeValue;

            if (Del[j].firstChild.nodeValue == searchedFilter) {
              arrayOfJobs.push(job[i]);
              console.log(arrayOfJobs);
            }
          }

          if (arrayOfJobs.includes(job[i])) {
            job[i].style.display = "inline-flex";
          } else {
            job[i].style.display = "none";
          }
        }
      }

      if (arrayOfJobs.length == 0) {
        for (i = 0; i < job.length; i++) {
          job[i].style.display = "inline-flex";
        }
      }
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

// const refreshList = () => {
//   const filters = document.querySelectorAll("#searchArea .filter");
//   for (const jobInstance of Array.from(job)) {
//     const jobInstanceFilters = jobInstance.querySelectorAll(".filter");
//     const jobInstanceFiltersStringValues = Array.from(jobInstanceFilters).map(
//       (filterElement) => {
//         return filterElement.innerText;
//       }
//     );
//     // jobInstanceFiltersStringValues = ['filter1', 'filter2']
//     for (const filter of filters) {
//       if (jobInstanceFiltersStringValues.includes(filter.innerText)) {
//         jobInstance.style.display = "block";
//       } else {
//         jobInstance.style.display = "none";
//       }
//     }
//   }
// };
