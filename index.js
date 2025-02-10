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

function displayBooks() {
  const libraryContainer = document.getElementById("library-container");
  libraryContainer.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const bookCard = createBookCard(book, index);
    libraryContainer.appendChild(bookCard);
  });
}

function createBookCard(book, index) {
  const bookCard = document.createElement("div");
  bookCard.setAttribute("id", "book-card");

  bookCard.innerHTML = `
  <h2> 📕 ${book.title}</h2>
  <p>- <strong>Author</strong>: ${book.author}</p>
  <p>- <strong>Pages</strong>: ${book.pages}</p>
  <p>- <strong>Status</strong>: ${book.read ? "Read" : "Not Read"}</p>
  `;

  const buttonContainer = createButtonContainer(index);
  bookCard.appendChild(buttonContainer);

  return bookCard;
}

function createButtonContainer(index) {
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  const toggleButton = createButton(index, "toggle");
  const removeButton = createButton(index, "remove");

  buttonContainer.appendChild(toggleButton);
  buttonContainer.appendChild(removeButton);

  return buttonContainer;
}

function createButton(index, type) {
  const button = document.createElement("div");
  button.setAttribute("data-index", index);

  if (type === "toggle") {
    button.textContent = "Toggle Read Status";
    button.classList.add("toggle-read-status");
    button.onclick = () => {
      myLibrary[index].toggleReadStatus();
      displayBooks();
    };
  } else if (type === "remove") {
    button.textContent = "Remove";
    button.classList.add("remove-book");
    button.onclick = () => {
      myLibrary.splice(index, 1);
      displayBooks();
    };
  }
  return button;
}

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
