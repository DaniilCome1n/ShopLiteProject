'use strict';

var startProducts = document.querySelectorAll('.products'); //Запоминание начальных позиций элемнтов в DOM


var buttonToLess = document.getElementById('ascendingSort'); //Кнопка сортировки от большего к меньшему (ascendingSort)
buttonToLess.addEventListener('click', ascendingSort); //Вешаем обработчик на кнопку 

var buttonToMore = document.getElementById('descendingSort'); //Кнопка сортировки от меньшего к большему (descendingSort)
buttonToMore.addEventListener('click', descendingSort); //Вешаем обработчик на кнопку

var buttonToStart = document.getElementById('sortToStart'); //Кнопка сортировки к первоначальному положению элементов
buttonToStart.addEventListener('click', sortToStart); //Вешаем обработчик на кнопку


function pushProductPrice() {
    //Вставляем data атрибуты в тело элемента
    var products = document.querySelectorAll('.products');
    var prices = document.querySelectorAll('.prices');
    for (var i = 0; i < products.length; i++) {
        prices[i].textContent = '' + products[i].dataset.price + '\u0440';
    }
}

function makeArrayOfPrices(arrayOfProducts) {
    //Создаём массив значений data атрибутов
    var arrayOfPrices = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = arrayOfProducts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var p = _step.value;

            arrayOfPrices.push(+p.dataset.price);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return arrayOfPrices;
}

function compareNumeric(a, b) {
    //Определяем функцию по которой будет проводиться сортировка
    if (a > b) return 1;
    if (a == b) return 0;
    if (a < b) return -1;
}

function makeSortArray(arr) {
    //Сортировка массива чисел 
    var newArr = arr.sort(compareNumeric);
    return newArr;
}

function moveProductsToLess(sortArray, arrayOfProducts) {
    //function(массив-канон,массив который нужно отсортировать){сортировка от большего к меньшему}
    var sortLen = sortArray.length;
    var parent = document.getElementById('content');
    for (var j = 1; j <= sortLen; j++) {
        for (var i = 0; i < arrayOfProducts.length; i++) {
            if (arrayOfProducts[i].dataset.price == sortArray[sortLen - j]) {
                //Если цена первого элемента массива элементов равна
                parent.prepend(arrayOfProducts[i]); //последнему элементу массива-канона,
            } //то двигаем элемент в конец контэйнера
        }
    }
}

function moveProductsToMore(sortArray, arrayOfProducts) {
    //function(массив-канон,массив который нужно отсортировать){сортировка от меньшего к большему}
    var sortLen = sortArray.length;
    var parent = document.getElementById('content');
    for (var j = 0; j <= sortLen; j++) {
        for (var i = 0; i < arrayOfProducts.length; i++) {
            //Если цена первого элемента массива элементов равна
            if (arrayOfProducts[i].dataset.price == sortArray[j]) {
                //первому элементу массива-канона,
                parent.prepend(arrayOfProducts[i]); //то двигаем элемент в конец контэйнера
            }
        }
    }
}

function sortToLess() {
    //Ascending sort
    var startProducts = document.querySelectorAll('.products');
    var arrayOfProducts = document.querySelectorAll('.products');
    var arrayOfPrices = makeArrayOfPrices(arrayOfProducts);
    var sortArray = makeSortArray(arrayOfPrices);
    moveProductsToLess(sortArray, arrayOfProducts);
    return startProducts;
}

function sortToMore() {
    //Descending Sort
    var startProducts = document.querySelectorAll('.products');
    var arrayOfProducts = document.querySelectorAll('.products');
    var arrayOfPrices = makeArrayOfPrices(arrayOfProducts);
    var sortArray = makeSortArray(arrayOfPrices);
    moveProductsToMore(sortArray, arrayOfProducts);
}

function sortToStart() {
    //Возвращаем элементы на начальные позиции
    var arrayOfProducts = document.querySelectorAll('.products');
    var arrayOfPrices = makeArrayOfPrices(arrayOfProducts);
    var arrayOfStartPrices = makeArrayOfPrices(startProducts);
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