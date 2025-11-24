const library = [];

class Book {
    constructor(uuid, title, author, numPages, hasRead) {
    this.uuid = uuid;
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.hasRead = hasRead;
};

    info(){
        return `${title} by ${author}, ${numPages} pages, ${hasRead}`;
    }

    changeStatus(bookIndex){
        if (library[bookIndex].hasRead === 'Has read this book'){
            library[bookIndex].hasRead = 'Has not yet read this book';
        } else {
        library[bookIndex].hasRead = 'Has read this book';
    }
    }
}

function addBookToLibrary(title, author, numPages, hasRead){
    const uuid = crypto.randomUUID();
    if (hasRead === true){
        hasRead = 'Has read this book';
    } else {
        hasRead = 'Has not yet read this book';
    }
    const newBook = new Book(uuid, title, author, numPages, hasRead);
    library.push(newBook);
};

const books = document.getElementById("books");
function getBooks(book) {
    const bookCard = document.createElement("div");
    const button = document.createElement("button");
    const statusButton = document.createElement("button");
    statusButton.textContent = 'Change read status';
    statusButton.classList.add("readStatus");
    statusButton.setAttribute("data-id", `${book.uuid}`);
    button.textContent = 'Remove book';
    button.classList.add("removebook");
    button.setAttribute("data-id", `${book.uuid}`);
    bookCard.classList.add("card");
    bookCard.innerHTML = `<p>${book.title}, by ${book.author}, Number of Pages: ${book.numPages}, User  ${book.hasRead}</p>`;
    books.appendChild(bookCard); 
    bookCard.appendChild(button);
    bookCard.appendChild(statusButton);
};

const addNewBookForm = document.getElementById("newbook");
addNewBookForm.addEventListener("click", addNewBook);
function addNewBook(event){
    event.preventDefault();
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let numPages = document.getElementById("numPages").value;
    let hasRead = document.querySelector('input[name="hasread"]:checked').value;
    if (hasRead === "true"){
        hasRead = true;
    } else {
        hasRead = false;
    }
    addBookToLibrary(title, author, numPages, hasRead);
    document.getElementById("addBookForm").reset();

    const found = library.findLast((element) => element);
    getBooks(found);

let bookLastChild = books.lastChild;
let CardFirstChild = bookLastChild.firstChild;
let removeBookButton = CardFirstChild.nextSibling;

removeBookButton.addEventListener("click", () => {
    let dataId = removeBookButton.dataset.id;
    let bookIndexToRemove = library.findIndex(book => book.uuid === dataId);
    library.splice(bookIndexToRemove, 1);
    let div = removeBookButton.parentNode;
    div.remove();
});

let lastAddedBookButton = bookLastChild.lastChild;
lastAddedBookButton.addEventListener("click", () => {
    let buttonId = lastAddedBookButton.dataset.id;
    let bookIndex = library.findIndex(book => book.uuid === buttonId);
    library[bookIndex].changeStatus(bookIndex);

    let buttonSibling = lastAddedBookButton.previousSibling;
    let buttonSiblingSibling = buttonSibling.previousSibling;
    console.log(buttonSiblingSibling);

    buttonSiblingSibling.textContent = `${library[bookIndex].title}, by ${library[bookIndex].author}, Number of Pages: ${library[bookIndex].numPages}, User  ${library[bookIndex].hasRead}`;
});
};






