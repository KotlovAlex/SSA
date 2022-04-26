//Create new array, convert all string elements input to number
function strToInt (arr) {
    res = []
    for (let el in arr) {
        res[el] = +arr[el]
    }
    return res
}

//Create index array (1,2,...,n)
function crIndex (arr) {
    let res = [];
    for (let i = 0; i<arr.length; i++){
        res.push(i+1)
    }
    return res
}

//Trend
function trend (arr) {
    let n = arr.length
    let x = crIndex(arr)
    let sx = x.reduce((el, acc)=>acc+(+el))
    let sy = 0
    let sx2 = 0
    let sy2 = 0
    let sxy = 0
    for (el in arr){
        sy += +arr[el]
        sx2 += x[el]**2
        sy2 += (+arr[el])**2
        sxy += arr[el] * x[el]
    }
    let b1 = ((sxy-((sy/n)*sx)))/((((-sx/n)*sx)+sx2))
    let b0 = (sy/n)+(-sx/n)*b1
    let res = []
    for (el in arr){
        res.push((+el)*b1+b0)
    }
    return res
}

//EMA
function ema (arr) {
    let temparr = strToInt(arr);
    let n = temparr.length;
    let w = 2 / (n + 1)
    let res = [temparr[0]];
    for (let i = 1; i<temparr.length; i++){
        res.push(temparr[i]*w+res[i-1]*(1-w))
    }
    return res
}

//SMA
function sma (arr) {
    let temparr = strToInt(arr);
    let lensma = 21;
    let res = []
    res.length = 21;
    for (let i = 0; i<temparr.length-lensma;i++){
        res.push(temparr.slice(i,i+lensma).reduce((el,acc)=>acc+el)/lensma)
    }
    return res
}

//WMA
function wma (arr) {
    let temparr = strToInt(arr);
    let lenwma = 12
    let ds = (temparr[lenwma] - temparr[0])/lenwma
    let res = []
    for (let i = lenwma/2; i < temparr.length-lenwma/2;i++) {
        res.push((1/143)*(-11*temparr[i-6]+9*temparr[i-4]+16*temparr[i-3]+21*temparr[i-2]+24*temparr[i-1]+25*temparr[i]+24*temparr[i+1]+21*temparr[i+2]+16*temparr[i+3]+9*temparr[i+4]-11*temparr[i-6]))
    }
    for (let i = 0; i<10; i++) {
        res.unshift(res[0]-ds)
    }
    for (let i = 0; i<10; i++) {
        res.push(res[res.length-1]-ds)
    }
    return res
}

//sum, max, min, avg : res[0,1,2,3]
function smma (arr) {
    let res = [0, +arr[0], +arr[0], 0];
    for (el in arr){
        res[0]+= +arr[el]
        if (res[1]<+arr[el]) res[1] = +arr[el]
        if (res[2]>+arr[el]) res[2] = +arr[el]
    }
    res[3] = res[0]/arr.length
    return res
}

//Create Matrix
function createNewMatrix(row, column) {
    return Array(row).fill().map(() => Array(column).fill(undefined));
}

//Vectors Multiply 
function multiVec(vec1,vec2){
    let len = vec1.length;
    let res = []
    for (let i = 0; i<len;i++){
        res[i]=[]
        for (let j = 0; j<len;j++){
            res[i][j] = vec1[i] * vec2[j]
        }
    }
    return res
}
    

//Trajectoriam matrixа
function trajMatr (arr,len) {
    let temparr = strToInt(arr);
    let L = len
    let res = new Array(L)
    for (let i = 0; i<L;i++){
        res[i] = (temparr.slice(i,i+temparr.length-L+1))
    }
    return res
}

//Transposed matrix
function transMatr (matr) {
    let res = createNewMatrix(matr[0].length,matr.length)
    for (let i = 0; i<res.length;i++){
        for (let j = 0; j<res[0].length;j++){
            res[i][j] = matr[j][i]
        }
    }
    return res
}

//Matrix multiplication
function multiMatr(matrA,matrB) {
    return math.multiply(matrA,matrB)
}

//Scalar multiplication (multiplication of a matrix by a number)
function scMulMatr (matr, number) {
    res = matr.slice()
    for (let i = 0; i<res[0].length;i++){
        for (let j = 0; j<res.length;j++){
            res[j][i]*=number
        }
    }
    return res
}

//Scalar division (division of a matrix by a number)
function scDivMatr (matr, number) {
    res = matr.slice()
    for (let i = 0; i<res[0].length;i++){
        for (let j = 0; j<res.length;j++){
            res[j][i]/=number
        }
    }
    return res
}

//Singular value decomposition (SVD)
function svd (arr, len) {
    let X = trajMatr(arr, len);
    let XT = transMatr(X);
    let temp = math.eigs(multiMatr(X,XT))
    let values = temp.values.reverse()
    let vectors =  temp.vectors.reverse()
    let V = new Array(50)
    let res = new Array(50)
    for (let i = 0; i<len;i++){
        V[i]=scDivMatr(multiMatr(XT,vectors[i]),math.sqrt(values[i]))
    }
    let VT = transMatr(V);
    for (let i = 0; i<len;i++){
        res[i] = multiVec((math.multiply(Math.sqrt(values[i]),vectors[i])),VT[i])
    }
    return res
}

compsel.onchange = () => {
    comp = compsel.value
    fetchRes()
}