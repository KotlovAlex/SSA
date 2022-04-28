// Основные переменные
let data
let temp
let indexs = []
let dates = []
let opens = []
let comps = []
let compnames = []


// Вспомогательные переменные
let end = (new Date()).toISOString().slice(0,10)
let start = end.split('')
start[3] = +start[3]-1
start = start.join('')

let comp = 'SBER'

function rPreloader (){
    $preloader = $('.loaderArea'),
    $loader = $preloader.find('.loader');
    $loader.fadeOut();
    $preloader.delay(350).fadeOut('slow');
}

function cPreloader (){
    $preloader = $('.loaderArea'),
    $loader = $preloader.find('.loader');
    $loader.fadeIn();
    $preloader.fadeIn('fast');
}



async function fetchRes() {
    cPreloader()
    indexs = []
    dates = []
    opens = []
    let response = await fetch(`http://iss.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities/${comp}/candles.json?from=${start}&till=${end}&interval=24&start=0`)
    data = await response.json()
    dataset = data.candles.data
    for (let el in dataset){
        indexs.push(+el + 1)
        dates.push(dataset[el][7].split('').splice(0,10).join(''))
        opens.push(dataset[el][0])
    }
    renderchart()
    rPreloader()
}

fetchRes()

// let myFetch = fetch('http://iss.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities/SBER/candles.csv?from=2021-04-08&till=2022-04-08&interval=24&start=0');

// myFetch.then(function(response) {
//     response.text().then(function(text) {
//     data = text;
//     console.log(data);
//     data = data.split('\n')
//     data.shift()
//     data.shift()
//     data.shift()
//     data.pop()
//     data.pop()
//     data.pop()
//     for (let el in data){
//         indexs.push(+el + 1)
//         data[el] = data[el].split(';');
//         dates.push(data[el][7].split('').splice(0,10).join(''))
//         opens.push(data[el][0])
//     }
//     });
// })