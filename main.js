const library = [
    {
    uuid: "29b21834-c5c3-466d-9516-32d0d792eb07",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    pages: 310,
    hasRead: "Has read this book"
  },
  {
    uuid: "29b21834-c4d3-466d-9516-32d0d792eb07",
    title: "1984",
    author: "George Orwell",
    pages: 328,
    hasRead: "has not yet read this book"
  },
  {
    uuid: "41b21834-c5c3-466d-9516-32d0d792eb07",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    pages: 277,
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

const book1 = addBookToLibrary('My first book', 'Hicham Almakroudi', 89, true);

let text = "<ul>";
library.forEach(getBooks);
text += "</ul>";

document.getElementById("books").innerHTML = text;

function getBooks(book) {
    text += "<li>" + book + "</li>";
}
