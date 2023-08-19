function randomInt(max: number): number { //0からmax-1までのrandomなintを返す
    return Math.floor(Math.random() * max);
  }
function chooseRandom(population: number[]): number{ // populationの中からrandomな値を返す
    if(population[0] === undefined){
        throw Error("Population Empty.")
    }
    return population[randomInt(population.length)]
}
function primeGen(primeMin: number, primeMax: number): number[]{ //primeMin<=x<=primeMaxな素数のlistを返す
    const primes: number[] = []
    for(let i: number =2;i<=primeMax; i++){ //エラトステネスの篩
        let isIPrime: boolean = true;
        for (let j: number = 0; j < primes.length; j++) {
            if(i % primes[j] == 0){
                isIPrime = false;
                break;
            }
        }
        if(isIPrime){
            primes.push(i)
        }
    }
    for (let i: number = primes.length-1; i >= 0; i--) { //primeMin未満の素数を削除
        if(primes[i] < primeMin){
            primes.splice(i)
        }    
    }
    return primes
}
function primeFactorize(input: number):number[] { //素因数分解をnumber[]で返す
    let primes: number[] = []
    for(let i=2; input != 1; i++){
        while(input%i==0){
            input = input/i
            primes.push(i)
        }
    }
    return primes
}
function relativePrime(x: number): number[]{ //xと互いに素な自然数iのlist(0<i<x)を返す
    const cachePFX = primeFactorize(x)
    const relPrimes = []
    for(let i:number =1;i<x;i = i+1){
        if(primeFactorize(i).some(elementI => cachePFX.some(elementX => elementX == elementI))){
        }else{
            relPrimes.push(i)
        }
    }
    return relPrimes;
}
function generateD(prime1: number, prime2: number, e:number): number{
    const listD = []
    for(let d = 1;d<prime1*prime2; d++){
        if(e*d % ((prime1-1)*(prime2-1)) == 1){
            listD.push(d)
        }
    }
    return chooseRandom(listD)
}


function RSAencrypt(raw_input:number, n: number, e: number): number{
    const encrypted: number = (raw_input**e) % n
    console.log("raw_input:",raw_input,"e:", e,"n:", n,"encrypted:", encrypted)
    return encrypted
}

function RSAgenerate(minPrime: number, maxPrime: number): number[]{
    const primes = primeGen(minPrime, maxPrime)
    const prime1 = primes[randomInt(primes.length)]
    const prime2 = primes[randomInt(primes.length)]
    const n = prime1 * prime2
    const raw_input = randomInt(n)
    const e: number = chooseRandom(relativePrime((prime1-1)*(prime2-1)));
    const d: number = generateD(prime1, prime2, e)
    const encrypted: number = RSAencrypt(raw_input, n, e)
    return [encrypted, n, e, raw_input, prime1, prime2, d]
}

function RSAdecrypt(encrypted: number, n:number, d: number): number{
    const decrypted: number = (encrypted ** d)% n
    return decrypted
}