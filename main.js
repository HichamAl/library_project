const library = [];

function Book(uuid, title, author, numPages, hasRead) {
    if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
    }
    this.uuid = uuid;
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.hasRead = hasRead;
    this.info = function(){
        return `${title} by ${author}, ${numPages} pages, ${hasRead}`
    };
};

Book.prototype.changeStatus = function(bookIndex) {
    if (library[bookIndex].hasRead === 'Has read this book'){
        library[bookIndex].hasRead = 'has not yet read this book';
    } else {
        library[bookIndex].hasRead = 'Has read this book';
    }
};

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

    const removeBookButtons = document.querySelectorAll(".removebook");
    removeBookButtons.forEach((button) => {
    button.addEventListener("click", ()=>{
        let dataId = button.dataset.id;
        let bookIndexToRemove = library.findIndex(book => book.uuid === dataId);
        library.splice(bookIndexToRemove, 1)
        let div = button.parentNode;
        div.remove();
    });
});

// right now i think it only targets the first book 
const readStatusButtons = document.querySelectorAll(".readStatus");
readStatusButtons.forEach((button) => {
    button.addEventListener("click", ()=> {
        let dataId = button.dataset.id;
        let bookIndex = library.findIndex(book => book.uuid === dataId);
        library[bookIndex].changeStatus(bookIndex);

        //p element selecteren dat hoort bij het boekindex
        let bookText = document.querySelector(".card p");
        bookText.textContent = `${library[bookIndex].title}, by ${library[bookIndex].author}, Number of Pages: ${library[bookIndex].numPages}, User  ${library[bookIndex].hasRead}`;
    });
});
};





