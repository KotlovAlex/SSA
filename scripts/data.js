// Variables
let data
let temp
let indexs = []
let dates = []
let opens = []
let comps = []
let compnames = []


// Help Variables
let end = (new Date()).toISOString().slice(0,10)
let start = end.split('')
start[3] = +start[3]-1
start = start.join('')
let comp = 'SBER'

// Remove Preloader
function rPreloader (){
    $preloader = $('.loaderArea'),
    $loader = $preloader.find('.loader');
    $loader.fadeOut();
    $preloader.delay(350).fadeOut('slow');
}

// Open Preloader
function cPreloader (){
    $preloader = $('.loaderArea'),
    $loader = $preloader.find('.loader');
    $loader.fadeIn();
    $preloader.fadeIn('fast');
}

// Data request
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