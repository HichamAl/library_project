const library = [
    {
    uuid: "29b21834-c5c3-466d-9516-32d0d792eb07",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    numPages: 310,
    hasRead: "Has read this book"
  },
  {
    uuid: "29b21834-c4d3-466d-9516-32d0d792eb07",
    title: "1984",
    author: "George Orwell",
    numPages: 328,
    hasRead: "has not yet read this book"
  },
  {
    uuid: "41b21834-c5c3-466d-9516-32d0d792eb07",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    numPages: 277,
    hasRead: "Has read this book"
  }
];

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
}

function addBookToLibrary(title, author, numPages, hasRead){
    const uuid = crypto.randomUUID();
    if (hasRead === true){
        hasRead = 'Has read this book';
    } else {
        hasRead = 'has not yet read this book';
    }
    const newBook = new Book(uuid, title, author, numPages, hasRead);
    library.push(newBook);
}

const books = document.getElementById("books");
library.forEach(getBooks);
books.classList.add("container");
function getBooks(book) {
    const bookCard = document.createElement("div");
    const button = document.createElement("button");
    button.textContent = 'Remove book';
    button.classList.add("removebook");
    button.setAttribute("data-id", `${book.uuid}`);
    bookCard.classList.add("card");
    bookCard.textContent = `${book.title}, by ${book.author}, Number of Pages: ${book.numPages}, User  ${book.hasRead}`;
    books.appendChild(bookCard); 
    bookCard.appendChild(button);
}

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
    const newBook = document.createElement("div");
    newBook.classList.add("card");
    newBook.textContent = `${found.title}, by ${found.author}, Number of Pages: ${found.numPages}, User  ${found.hasRead}`;
    books.appendChild(newBook);
    const button = document.createElement("button");
    button.classList.add("removebook");
    button.setAttribute("data-id", `${found.uuid}`);
    button.textContent = 'Remove book';
    newBook.appendChild(button);

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

}

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



