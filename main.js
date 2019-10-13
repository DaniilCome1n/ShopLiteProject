const startProducts = document.querySelectorAll('.products'); //Remember start position of dives



const buttonToLess = document.getElementById('ascendingSort');
buttonToLess.onclick = ascendingSort;
const buttonToMore = document.getElementById('descendingSort');
buttonToMore.onclick = descendingSort;
const buttonToStart = document.getElementById('sortToStart');
buttonToStart.onclick = sortToStart;


function pushProductPrice() { //Push data attributes to dives
    const products = document.querySelectorAll('.products');
    const prices = document.querySelectorAll('.prices');
    for (let i = 0; i < products.length; i++) {
        prices[i].textContent = `${products[i].dataset.price}` + `р`;
    }
}


function makeArrayOfPrices(arrayOfProducts) { // Make array of data attributes;
    const arrayOfPrices = [];
    for (p of arrayOfProducts) {
        arrayOfPrices.push(+p.dataset.price);
    }
    return arrayOfPrices;
}


function compareNumeric(a, b) {
    if (a > b) return 1;
    if (a == b) return 0;
    if (a < b) return -1;
}


function makeSortArray(arr) { // Sort numeric array
    const newArr = arr.sort(compareNumeric);
    return newArr;
}


function moveProductsToLess(sortArray, arrayOfProducts) { // function (canonical array,array to sort){sort by last elem}
    const sortLen = sortArray.length;
    const parent = document.getElementById('content');
    for (let j = 1; j <= sortLen; j++) {
        for (let i = 0; i < arrayOfProducts.length; i++) {
            if (arrayOfProducts[i].dataset.price == sortArray[sortLen - j]) {
                parent.prepend(arrayOfProducts[i]);
            }
        }
    }
}


function moveProductsToMore(sortArray, arrayOfProducts) { // function (canonical array,array to sort){sort by first elem}
    const sortLen = sortArray.length;
    const parent = document.getElementById('content');
    for (let j = 0; j <= sortLen; j++) {
        for (let i = 0; i < arrayOfProducts.length; i++) {
            if (arrayOfProducts[i].dataset.price == sortArray[j]) {
                parent.prepend(arrayOfProducts[i]);
            }
        }
    }
}


function sortToLess() { //Ascending sort
    const startProducts = document.querySelectorAll('.products');
    const arrayOfProducts = document.querySelectorAll('.products');
    const arrayOfPrices = makeArrayOfPrices(arrayOfProducts);
    const sortArray = makeSortArray(arrayOfPrices);
    moveProductsToLess(sortArray, arrayOfProducts);
    return startProducts;
}


function sortToMore() { //Descending Sort
    const startProducts = document.querySelectorAll('.products');
    const arrayOfProducts = document.querySelectorAll('.products');
    const arrayOfPrices = makeArrayOfPrices(arrayOfProducts);
    const sortArray = makeSortArray(arrayOfPrices);
    moveProductsToMore(sortArray, arrayOfProducts);
}


function sortToStart() { //Removes dives to start position
    const arrayOfProducts = document.querySelectorAll('.products');
    const arrayOfPrices = makeArrayOfPrices(arrayOfProducts);
    const arrayOfStartPrices = makeArrayOfPrices(startProducts);
    moveProductsToLess(arrayOfStartPrices, arrayOfProducts);
}

function ascendingSort() {
    sortToLess();
    const buttonToLess = document.getElementById("ascendingSort");
    console.log(buttonToLess);
    buttonToLess.style.display = "none";
    const buttonToMore = document.getElementById("descendingSort");
    buttonToMore.style.display = "";
}


function descendingSort() {
    sortToMore();
    const buttonToLess = document.getElementById("ascendingSort");
    console.log(buttonToLess);
    buttonToLess.style.display = "";
    const buttonToMore = document.getElementById("descendingSort");
    buttonToMore.style.display = "none";
}

pushProductPrice();