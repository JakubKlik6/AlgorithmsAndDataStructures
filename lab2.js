//sprawdzanie nawiasów jednego rodzaju z użyciem licznika
function sprawdźNawiasy(napis) {
    let licznik = 0
    for(let znak of napis)
        if(znak == "(")
            licznik++
        else if(znak == ")")
            if(licznik == 0)
                return false
            else
                licznik--
    if(licznik == 0)
        return true
    else
        return false
}

//sprawdzanie nawiasów dwóch rodzajów z użyciem stosu
function sprawdźNawiasy(napis) {
    let stos = []
    for(let znak of napis)
        if(znak == "(")
            stos.push("okrągły")
        else if(znak == "[")
            stos.push("kwadratowy")
        else if(znak == ")") {
            if(stos.pop() != "okrągły")
                return false
        }
        else if(znak == "]") {
            if(stos.pop() != "kwadratowy")
                return false
        }
    if(stos.length == 0)
        return true
    else
        return false
}
//klasa z parametryzacją rodzajów bloków
class Nawiasy {
    static otwarcia = {
        "(": "okrągły",
        "[": "kwadratowy",
        "<": "ostrokątny"
    }
    static zamknięcia = {
        ")": "okrągły",
        "]": "kwadratowy",
        ">": "ostrokątny"
    }
    static sprawdź(napis) {
        let stos = []
        for(let znak of napis)
            if(Nawiasy.otwarcia[znak] != undefined) // sprawdzam czy znak jest jakimś otwarciem
                stos.push(
                    Nawiasy.otwarcia[znak]
                )
            else if(Nawiasy.zamknięcia[znak] != undefined) { // sprawdzam czy znak jest jakimś zamknięciem
                if(stos.pop() != Nawiasy.zamknięcia[znak])
                    return false
            }
        if(stos.length == 0)
            return true
        else
            return false
    }
}
//klasa z parametryzacją rodzajów bloków, tworząca struktury pomocnicze na podstawie inputu konstruktora
class Nawiasy {
    constructor(rodzajeBloków = {
        "okrągły": ["(",")"],
        "kwadratowy": ["[","]"],
        "ostrokątny": ["<",">"]
    }) {
        for(let nazwaBloku in rodzajeBloków) {
            let
                otw = rodzajeBloków[nazwaBloku][0],
                zam = rodzajeBloków[nazwaBloku][1]
            this.#otwarcia[otw] = nazwaBloku
            this.#zamknięcia[zam] = nazwaBloku
        }
    }
    #otwarcia = {}
    #zamknięcia = {}
    sprawdź(napis) {
        let stos = []
        for(let znak of napis)
            if(this.#otwarcia[znak] != undefined) // sprawdzam czy znak jest jakimś otwarciem
                stos.push(
                    this.#otwarcia[znak]
                )
            else if(this.#zamknięcia[znak] != undefined) { // sprawdzam czy znak jest jakimś zamknięciem
                if(stos.pop() != this.#zamknięcia[znak])
                    return false
            }
        if(stos.length == 0)
            return true
        else
            return false
    }
}
//lista jednokierunkowa ograniczona do modyfikacji z jednej strony
class Lista {
    static Węzeł = class {
        constructor(dane, następnik = null) {
            this.dane = dane
            this.następnik = następnik
        }
    }
    #początek = null
    #długość = 0
    get początek() { return this.#początek }
    get długość() { return this.#długość }

    dodajPoczątek(dane) {
        this.#początek = new Lista.Węzeł(
            dane,
            this.#początek
        )
        return ++this.#długość
    }
    usuńPoczątek() {
        if(this.#początek == null)
            return undefined
        let stary = this.#początek
        this.#początek = stary.następnik
        this.#długość--
        return stary.dane
    }
}
//stos używający powyższej implementacji listy
class Stos {
    #lista = new Lista() //jednokierunkowa, wystarczą operacje na początku
    get wysokość() { return this.#lista.długość }
    get wierzch() { return this.#lista.początek.dane }
    połóż(dane) { return this.#lista.dodajPoczątek(dane) }
    zdejmij() { return this.#lista.usuńPoczątek() }
}
//klasa sprawdzająca nawiasy używająca powyższej implementacji stosu
class Nawiasy {
    constructor(rodzajeBloków = {
        "okrągły": ["(",")"],
        "kwadratowy": ["[","]"],
        "ostrokątny": ["<",">"]
    }) {
        for(let nazwaBloku in rodzajeBloków) {
            let
                otw = rodzajeBloków[nazwaBloku][0],
                zam = rodzajeBloków[nazwaBloku][1]
            this.#otwarcia[otw] = nazwaBloku
            this.#zamknięcia[zam] = nazwaBloku
        }
    }
    #otwarcia = {}
    #zamknięcia = {}
    sprawdź(napis) {
        let stos = new Stos()
        for(let znak of napis)
            if(this.#otwarcia[znak] != undefined) // sprawdzam czy znak jest jakimś otwarciem
                stos.połóż(
                    this.#otwarcia[znak]
                )
            else if(this.#zamknięcia[znak] != undefined) { // sprawdzam czy znak jest jakimś zamknięciem
                if(stos.zdejmij() != this.#zamknięcia[znak])
                    return false
            }
        if(stos.wysokość == 0)
            return true
        else
            return false
    }
}

//lista jednokierunkowa bez referencji na koniec
class Lista {
    static Węzeł = class {
        constructor(dane, następnik = null) {
            this.dane = dane
            this.następnik = następnik
        }
    }
    #początek = null
    #długość = 0
    get początek() { return this.#początek }
    get długość() { return this.#długość }

    dodajPoczątek(dane) {
        this.#początek = new Lista.Węzeł(
            dane,
            this.#początek
        )
        return ++this.#długość
    }
    usuńPoczątek() {
        if(this.#początek == null)
            return undefined
        let stary = this.#początek
        this.#początek = stary.następnik
        this.#długość--
        return stary.dane
    }
    get koniec() {
        if(this.#początek == null)
            return null
        let węzeł
        for(
            węzeł = this.#początek;
            węzeł.następnik != null;
            węzeł = węzeł.następnik
        ) ;
        return węzeł
    }
    get przedostatni() {
        if(this.#początek == null || this.#początek.następnik == null)
            return null
        let węzeł
        for(
            węzeł = this.#początek;
            węzeł.następnik.następnik != null;
            węzeł = węzeł.następnik
        ) ;
        return węzeł
    }
    dodajKoniec(dane) {
        if(this.#początek == null)
            return this.dodajPoczątek(dane)
        this.koniec.następnik = new Lista.Węzeł(dane)
        return ++this.#długość
    }
    usuńKoniec() {
        let przedostatni = this.przedostatni
        if(przedostatni == null)
            return this.usuńPoczątek()
        let ostatni = przedostatni.następnik
        przedostatni.następnik = null
        this.#długość--
        return ostatni.dane
    }
}

//lista jednokierunkowa z referencją na koniec
class Lista {
    static Węzeł = class {
        constructor(dane, następnik = null) {
            this.dane = dane
            this.następnik = następnik
        }
    }
    #początek = null
    #koniec = null //!
    #długość = 0
    get początek() { return this.#początek }
    get koniec() { return this.#koniec }
    get długość() { return this.#długość }

    dodajPoczątek(dane) {
        this.#początek = new Lista.Węzeł(
            dane,
            this.#początek
        )
        if(this.#koniec == null) //!
            this.#koniec = this.#początek //!
        return ++this.#długość
    }
    usuńPoczątek() {
        if(this.#początek == null)
            return undefined
        let stary = this.#początek
        this.#początek = stary.następnik
        this.#długość--
        if(this.#początek == null) //!
            this.#koniec = null //!
        return stary.dane
    }
    get przedostatni() {
        if(this.#początek == null || this.#początek.następnik == null)
            return null
        let węzeł
        for(
            węzeł = this.#początek;
            węzeł.następnik.następnik != null;
            węzeł = węzeł.następnik
        ) ;
        return węzeł
    }
    dodajKoniec(dane) {
        if(this.#początek == null)
            return this.dodajPoczątek(dane)
        let nowy = new Lista.Węzeł(dane) //!
        this.#koniec.następnik = nowy //!
        this.#koniec = nowy //!!
        return ++this.#długość
    }
    usuńKoniec() {
        let przedostatni = this.przedostatni
        if(przedostatni == null)
            return this.usuńPoczątek()
        let ostatni = przedostatni.następnik
        przedostatni.następnik = null
        this.#długość--
        this.#koniec = przedostatni //!
        return ostatni.dane
    }
}
//kolejka (FIFO) z użyciem powyższej implementacji listy
class Kolejka { //FIFO
    #lista = new Lista() //lista z ref na koniec
    get długość() { return this.#lista.długość }
    zakolejkuj(dane) { return this.#lista.dodajKoniec(dane) }
    odkolejkuj() { return this.#lista.usuńPoczątek() }
    podejrzyjPoczątek() { return this.#lista.początek.dane }
    podejrzyjKoniec() { return this.#lista.koniec.dane }
}

//lista dwukierunkowa do uzupełnienia
class Lista {
    static Węzeł = class {
        constructor(dane, poprzednik = null, następnik = null) {
            this.dane = dane
            this.poprzednik = poprzednik
            this.następnik = następnik
        }
    }
    #początek = null
    #koniec = null
    #długość = 0
    get początek() { return this.#początek }
    get koniec() { return this.#koniec }
    get długość() { return this.#długość }

    dodajPoczątek(dane) {
        let nowy = new Lista.Węzeł(
            dane,
            null,
            this.#początek
        )
        //...
    }
    usuńPoczątek() {
        //...
    }
    dodajKoniec(dane) {
        let nowy = new Lista.Węzeł(
            dane,
            this.#koniec
        )
        if(this.#początek == null)
            this.#początek = nowy
        else
            this.#koniec.następnik = nowy
        this.#koniec = nowy
        return ++this.#długość
    }
    usuńKoniec() {
        if(this.#koniec == null)
            return undefined
        let stary = this.#koniec
        this.#koniec = stary.poprzednik
        if(this.#koniec == null)
            this.#początek = null
        else
            this.#koniec.następnik = null
        this.#długość--
        return stary.dane
    }
}

//metoda odwracania listy jednokierunkowej z referencją na koniec
	odwróć() {
        if(this.#długość < 2)
            return;
        for(
            let
                P = null,
                B = this.#początek,
                N;
            B != null;
            P = B, B = N
        ) {
            N = B.następnik
            B.następnik = P
        }
        let temp = this.#koniec
        this.#koniec = this.#początek
        this.#początek = temp
    }
//sortowanie listy dwukierunkowej przez wstawienie
    sortowaniePrzezWstawienie() {
        if(this.#długość < 2)
            return;
        for(
            let
                S = this.#początek,
                N;
            S != null;
            S = N
        ) {
            N = S.następnik
            for(
                let W = this.#początek;
                W != S;
                W = W.następnik
            ) 
                if(W.dane > S.dane) {
                    //wycinamy S - przestawiamy referencje jego starego sąsiedztwa
                    if(N == null)
                        this.#koniec = S.poprzednik
                    else
                        N.poprzednik = S.poprzednik
                    S.poprzednik.następnik = N
                    //wstawiamy - przestawiamy referencje S na jego nowe sąsiedztwo
                    S.następnik = W
                    S.poprzednik = W.poprzednik
                    //... przestawiamy referencje nowego sąsiedztwa na S
                    if(W.poprzednik == null)
                        this.#początek = S
                    else
                        W.poprzednik.następnik = S
                    W.poprzednik = S
                    break
                }
        }
    }
