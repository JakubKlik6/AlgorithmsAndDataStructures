function fib_reku(n) {
    n = BigInt(n)
    if(n < 0n)
        throw "nie definiuje się dla wartości mniejszej od 0"

    if(n == 0n)
        return 0n
    else if(n == 1n)
        return 1n
    else
        return fib_reku(n - 1n) + fib_reku(n - 2n)
}

function fib_iter(n) {
    n = BigInt(n)
    if(n < 0n)
        throw "nie definiuje się dla wartości mniejszej od 0"

    if(n == 0n)
        return 0n
    else if(n == 1n)
        return 1n

    let
        lewy = 0n,
        prawy = 1n
    for(let i = 2; i <= n; i++) {
        let nowy = lewy + prawy
        lewy = prawy
        prawy = nowy
    }
    return prawy
}

function fib_iter_float(n) {
    n = Number(n)
    if(n < 0)
        throw "nie definiuje się dla wartości mniejszej od 0"
    else if(Number.isInteger(n) == false)
        throw "nie definiuje się dla wartości ułamkowej"

    if(n == 0)
        return 0
    else if(n == 1)
        return 1

    let
        lewy = 0,
        prawy = 1
    for(let i = 2; i <= n; i++) {
        let nowy = lewy + prawy
        lewy = prawy
        prawy = nowy
    }
    return prawy
}

function fib_binet(n) {
    n = Number(n)
    if(n < 0)
        throw "nie definiuje się dla wartości mniejszej od 0"
    else if(Number.isInteger(n) == false)
        throw "nie definiuje się dla wartości ułamkowej"

    let
        pierwZ5 = Math.sqrt(5),
        półPierwZ5 = pierwZ5 / 2,
        odwrPierwZ5 = pierwZ5 / 5
    return Math.round(
        odwrPierwZ5 * (
            (0.5 + półPierwZ5)**n
            -
            (0.5 - półPierwZ5)**n
            )
        )
}

//potęga z wykładnikiem naturalnym
function szybkiePotęgowanie(podstawa, wykładnik) {
    wykładnik = BigInt(wykładnik)
    if(wykładnik < 0)
        throw "trzeba zaimplementować osobno"

    let
        potęgaPomocnicza = podstawa,
        pozostałośćCyfrWykładnika = wykładnik,
        wynik = 1
    for(
        ;
        pozostałośćCyfrWykładnika > 0;
        pozostałośćCyfrWykładnika /= 2n
    ) {
        let bieżącaCyfra = pozostałośćCyfrWykładnika % 2n
        if(bieżącaCyfra == 1n)
            wynik *= potęgaPomocnicza
        potęgaPomocnicza *= potęgaPomocnicza
    }
    return wynik
}

//potęga dowolna, w tym np sqrt
function potęga(p,w) {
    return Math.exp(w*Math.log(p))
}
