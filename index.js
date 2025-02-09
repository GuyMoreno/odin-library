// Constructor function to create a Book object
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

Book.prototype.toggleReadStatus = function () {
  this.read = !this.read;
};

const myLibrary = []; // Array to hold all the books in the library

// Function to add a new book to the library
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read); // Create a new book object
  myLibrary.push(newBook); // Add the new book to the library array
}

// Function to display all books in the library on the webpage
function displayBooks() {
  const libraryContainer = document.getElementById("library-container"); //Get the container element
  libraryContainer.innerHTML = ""; // Clear any existing books from the display
  myLibrary.forEach((book, index) => {
    // Iterate through each book in the library and display its details
    // Create a Card for each book
    const bookCard = document.createElement("div"); // Create a div for each book
    bookCard.setAttribute("id", "book-card");
    // Insete book content to the card
    bookCard.innerHTML = `
    <h2> 📕 ${book.title}</h2>
    <p>- <strong>Author</strong>: ${book.author}</p>
    <p>- <strong>Pages</strong>: ${book.pages}</p>
    <p>- <strong>Status</strong>: ${book.read ? "Read" : "Not Read"}</p>
    `;

    const buttonContainer = document.createElement("div"); // Container for buttons
    buttonContainer.classList.add("button-container");

    const toggleButton = document.createElement("button");
    toggleButton.textContent = "Toggle Read Status";
    toggleButton.classList.add("toggle-read-status");
    toggleButton.setAttribute("data-index", index);

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-book");
    removeButton.setAttribute("data-index", index);

    buttonContainer.appendChild(toggleButton);
    buttonContainer.appendChild(removeButton);
    bookCard.appendChild(buttonContainer);

    toggleButton.addEventListener("click", () => {
      myLibrary[index].toggleReadStatus();
      displayBooks();
    });

    removeButton.addEventListener("click", () => {
      myLibrary.splice(index, 1);
      displayBooks();
    });

    libraryContainer.appendChild(bookCard);
  });
}

// displayBooks();

const newBookButton = document.getElementById("new-book-button");
const bookDialog = document.getElementById("book-dialog");
const closeBookDialog = document.getElementById("closeDialog");

newBookButton.addEventListener("click", () => {
  bookDialog.showModal();
});

closeBookDialog.addEventListener("click", () => {
  bookDialog.close();
});

const bookForm = document.getElementById("book-form");
bookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked ? "yes" : "no";

  addBookToLibrary(title, author, pages, read);
  displayBooks();
  bookDialog.close();
  bookForm.reset();
});

// Close the dialog and reset the form
displayBooks();
