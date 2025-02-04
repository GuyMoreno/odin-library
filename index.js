// Start
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read.toLowerCase() === "yes";
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.read ? "Read" : "Not Read"
    }`;
  };
}

const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, "YES");

// console.log(book1.info()); // The Hobbit by J.R.R. Tolkien, 295 pages, read.

const myLibrary = []; // Create an array of books

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

// addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 200, "Yes");
addBookToLibrary("Moby Dick", "Herman Melville", 600, "yes");
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, "nope");

// console.log(myLibrary);

// Display:

function displayBooks() {
  // Elemnt that stores the data
  const libraryContainer = document.getElementById("library-container");
  // Clear old book data
  libraryContainer.innerHTML = "";
  // Iterate the library
  myLibrary.forEach((book) => {
    // Create a Card for each book
    const bookCard = document.createElement("div");
    bookCard.setAttribute("id", "book-card");
    // Insete book content to the card
    bookCard.innerHTML = `
    <h2> 📕 ${book.title}</h2>
    <p>- <strong>Author</strong>: ${book.author}</p>
    <p>- <strong>Pages</strong>: ${book.pages}</p>
    <p>- <strong>Status</strong>: ${book.read ? "Read" : "Not Read"}</p>
    `;
    libraryContainer.appendChild(bookCard);
  });
}

displayBooks();
