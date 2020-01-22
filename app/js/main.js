const startProducts = document.querySelectorAll('.products');   //Запоминание начальных позиций элемнтов в DOM



const buttonToLess = document.getElementById('ascendingSort');  //Кнопка сортировки от большего к меньшему (ascendingSort)
buttonToLess.addEventListener('click', ascendingSort);          //Вешаем обработчик на кнопку 

const buttonToMore = document.getElementById('descendingSort'); //Кнопка сортировки от меньшего к большему (descendingSort)
buttonToMore.addEventListener('click', descendingSort);         //Вешаем обработчик на кнопку

const buttonToStart = document.getElementById('sortToStart');   //Кнопка сортировки к первоначальному положению элементов
buttonToStart.addEventListener('click', sortToStart);           //Вешаем обработчик на кнопку



function pushProductPrice() {                                   //Вставляем data атрибуты в тело элемента
        const products = document.querySelectorAll('.products');
        const prices = document.querySelectorAll('.prices');
        for (let i = 0; i < products.length; i++) {
            prices[i].textContent = `${products[i].dataset.price}` + `р`;
        }
    }


function makeArrayOfPrices(arrayOfProducts) {                   //Создаём массив значений data атрибутов
        const arrayOfPrices = [];
        for (let p of arrayOfProducts) {
            arrayOfPrices.push(+p.dataset.price);
        }
        return arrayOfPrices;
    }


function compareNumeric(a, b) {                                 //Определяем функцию по которой будет проводиться сортировка
        if (a > b) return 1;
        if (a == b) return 0;
        if (a < b) return -1;
    }


function makeSortArray(arr) {                                   //Сортировка массива чисел 
        const newArr = arr.sort(compareNumeric);
        return newArr;
    }


function moveProductsToLess(sortArray, arrayOfProducts) { //function(массив-канон,массив который нужно отсортировать){сортировка от большего к меньшему}
        const sortLen = sortArray.length;                       
        const parent = document.getElementById('content');
        for (let j = 1; j <= sortLen; j++) {
            for (let i = 0; i < arrayOfProducts.length; i++) {
                if (arrayOfProducts[i].dataset.price == sortArray[sortLen - j]) { //Если цена первого элемента массива элементов равна
                    parent.prepend(arrayOfProducts[i]);                           //последнему элементу массива-канона,
                }                                                                 //то двигаем элемент в конец контэйнера
            }
        }
    }


function moveProductsToMore(sortArray, arrayOfProducts) {  //function(массив-канон,массив который нужно отсортировать){сортировка от меньшего к большему}
        const sortLen = sortArray.length;
        const parent = document.getElementById('content');
        for (let j = 0; j <= sortLen; j++) {
            for (let i = 0; i < arrayOfProducts.length; i++) {          //Если цена первого элемента массива элементов равна
                if (arrayOfProducts[i].dataset.price == sortArray[j]) { //первому элементу массива-канона,
                    parent.prepend(arrayOfProducts[i]);                 //то двигаем элемент в конец контэйнера
                }
            }
        }
    }


function sortToLess() {                                             //Ascending sort
        const startProducts = document.querySelectorAll('.products');   
        const arrayOfProducts = document.querySelectorAll('.products');
        const arrayOfPrices = makeArrayOfPrices(arrayOfProducts);
        const sortArray = makeSortArray(arrayOfPrices);
        moveProductsToLess(sortArray, arrayOfProducts);
        return startProducts;
    }


function sortToMore() {                                             //Descending Sort
        const startProducts = document.querySelectorAll('.products');
        const arrayOfProducts = document.querySelectorAll('.products');
        const arrayOfPrices = makeArrayOfPrices(arrayOfProducts);
        const sortArray = makeSortArray(arrayOfPrices);
        moveProductsToMore(sortArray, arrayOfProducts);
    }


function sortToStart() {                                             //Возвращаем элементы на начальные позиции
        const arrayOfProducts = document.querySelectorAll('.products');
        const arrayOfPrices = makeArrayOfPrices(arrayOfProducts);
        const arrayOfStartPrices = makeArrayOfPrices(startProducts);
        moveProductsToLess(arrayOfStartPrices, arrayOfProducts);
    }

function ascendingSort() {
        sortToLess();
        buttonToLess.style.display = "none";
        buttonToMore.style.display = "";
    }


function descendingSort() {
        sortToMore();
        buttonToLess.style.display = "";
        buttonToMore.style.display = "none";
    }

pushProductPrice();