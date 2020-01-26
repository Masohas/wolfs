const inputAdd = document.querySelector('input.add'); //Pole input do dodawania slow do listy
const addBtn = document.querySelector('button.addBtn'); //Przycik do dodawania slow do listy
const inputSearch = document.querySelector('input.search'); //Pole input do szukania slów
const searchBtn = document.querySelector('button.searchBtn'); //Przycik do szukania slow
const numberWorks = document.querySelector('h1 span'); //Liczba zadań
const ul = document.querySelector('ul'); //Tu wpisujemy li
const lists = document.getElementsByClassName('tog'); //Pobranie kazdego li z klasa "tog"
const pSearch = document.querySelector('.pSearch'); //Pobranie "p"
const pAdd = document.querySelector('.pAdd'); //Pobranie "p"
const liColor = document.getElementsByClassName('delete'); //Pobranie kazdego buttona z klasa "delete"
let listsCopy;
let grow; //flaga
let textSearch = "";

const addWork = (e) => {
    e.preventDefault(); //Zatrzymanie odwiezania strony po nacisnieciu przysika
    if (textSearch === "") {
        changeInputAdd();
        numberWorks.textContent = lists.length; //Bierzaca zmiana listy zadań
        grow = true; // Przypisanie do flagi true
    } else {
        pAdd.style.display = "block";
        addBtn.classList.add('redAdd');
        inputAdd.style.border = "2px solid #e00d0d";
        inputAdd.classList.add("redFocus");
    }
}

const changeInputAdd = () => {
    const textLi = inputAdd.value; //Pobranie zawartosci inputa
    if (textLi === "") return; //Jeżeli input bedzie pusty zakoncz fukcje
    const oneLi = document.createElement('li'); //Stworz i przypisz "li" do zmiennej
    oneLi.classList.add('tog'); //dodanie do stworzonego "li" klasy "tog"
    oneLi.innerHTML = `${textLi}<button class="delete">USUŃ</button>`; //Stworzenie przycislu w stworzonym "li"
    ul.appendChild(oneLi); //Dodanie "li" do "ul"
    inputAdd.value = ""; //Wykasowanie zawartosci z inputa
    listsCopy = [...lists]; //Przypisanie kopii listy
    listsCopy.forEach((li) => { //Na kazdym elemencie kopii listy ma sie wykonac znalezienie przyciska i nasluchiwanie na ten przycisk
        const delBtn = li.querySelector('button.delete');
        delBtn.addEventListener('click', deleteLi);
    });
    changeColor();
}

const deleteLi = (e) => {
    e.target.parentNode.remove(); //Po nacisnieciu "USUN", wykasowanie rodzica danego przyciku
    numberWorks.textContent = lists.length; //Bierzaca zmiana listy zadań
    if (grow) {
        listsCopy = [...lists]; //Jezeli grow bedzie true zrob kopie listy
    } else if (!grow) {
        //Jezeli bedzie false
        const text = e.target.parentNode; //sprawdz jaki to byl "li"
        const number = listsCopy.indexOf(text); //znajdz tego "li" w kopii listy
        listsCopy.splice(number, 1); //Wykasuj go z tej kopii
    }
}

const searchWords = (e) => {
    e.preventDefault(); //Zatrzymanie odwiezania strony po nacisnieciu przysik
    textSearch = inputSearch.value.toLowerCase(); //Pobranie zawartosci inputa i zmiana liter na male
    if (textSearch === "") {
        pSearch.style.display = "none"; //Znikanie "p" jezli input jest pusty
        pAdd.style.display = "none";
        addBtn.classList.remove('redAdd');
        inputAdd.style.border = "2px solid  green";
        inputAdd.classList.remove("redFocus");
    } else pSearch.style.display = "block"; //Pojawienie sie "p" jezeli w inpucie jest tekst
    let listsCopySearch = [...listsCopy]; //kopia kopii listy
    const filterList = listsCopySearch.filter((li) => li.textContent.toLowerCase().includes(textSearch)); //Sprawdzenie czy w kopii kopi listy na kazdym elemencie czy znajduje sie w nim dane slowo i zamiana go na male jezeli tak przypisanie do nowej listy
    numberWorks.textContent = filterList.length; //Bierzaca zmiana listy zadań
    ul.textContent = ""; //Zerowanie "ul"
    filterList.forEach(li => ul.appendChild(li)); //Dodanie do "ul" wyrazen ktore sie zgadzaja z flitrem
    grow = false; //przypisanie false
}

const changeColor = () => {
    liColorCopy = [...liColor]; //kopia listy
    liColorCopy.forEach((li) => { //Wykonie nasluchiwania na kazdym elemencie
        li.addEventListener('mouseenter', () => {
            li.parentNode.style.color = "grey"; //Jezeli myszka bedzie na przycisku to kolor "li" ma sie zmienic na szary
        });
        li.addEventListener('mouseleave', () => {
            li.parentNode.style.color = "black"; //Jezeli myszka opusci przycik to kolor "li" ma sie zmienic na czarny
        });
    });
}

addBtn.addEventListener('click', addWork); //Nasluchiwanie na przycik ktory dodaje tekst z inputa do listy
searchBtn.addEventListener('click', searchWords); //Nasluchiwanie na przycik ktory szuka danego slowa w liście