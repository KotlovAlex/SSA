let chartbtn = document.getElementById('chartbtn')
let preloader = document.querySelector('.loaderArea')
let loader = document.querySelector('.loader')
let inmax = document.querySelector('.max')
let inmin = document.querySelector('.min')  
let inavg = document.querySelector('.avg')
let compsel = document.getElementById('compsel')

let dataset = {}
let config = {}
let myChart = new Chart(
    document.getElementById('myChart'),
    config
);

function renderchart(){
    myChart.destroy()
    trends = trend(opens);
    emas = ema(opens);
    smas = sma(opens);
    wmas = wma(opens);
    inmin.textContent = smma(opens)[2].toFixed(2)
    inavg.textContent = smma(opens)[3].toFixed(2)
    inmax.textContent = smma(opens)[1].toFixed(2)
    
    // console.log([+opens[0],+opens[opens.length-1]]);
    // console.log([sksred.length,opens.length]);
    dataset = {
        labels: dates,
        datasets: [{
            label: `Цена открытия ${comp} (rub)`,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: opens,      
        }, {
            label: 'EMA',
            backgroundColor: 'rgb(99, 133, 167)',
            borderColor: 'rgb(99, 133, 167)',
            data: emas,       
        }, {
            label: 'SMA',
            backgroundColor: 'rgb(34, 244, 234)',
            borderColor: 'rgb(34, 244, 234)',
            data: smas,       
        }, {
            label: 'WMA',
            backgroundColor: 'rgb(244, 234, 34)',
            borderColor: 'rgb(244, 234, 34)',
            data: wmas,       
        }, {
            label: 'Линяя тренда (линейная)',
            backgroundColor: 'rgb(255, 132, 99)',
            borderColor: 'rgb(255, 132, 99)',
            data: trends,
        }]
    };
    
    config = {
        type: 'line',
        data: dataset,
        options: {
            pointRadius: 1
        }
    };
    
    myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}