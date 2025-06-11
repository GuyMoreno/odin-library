// --- Book Class ---
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read; // Now expects a boolean directly
  }

  toggleReadStatus() {
    this.read = !this.read;
  }
}

// --- Library Data ---
const myLibrary = [];

// --- DOM Elements ---
const libraryContainer = document.getElementById("library-container");
const newBookButton = document.getElementById("new-book-button");
const bookDialog = document.getElementById("book-dialog");
const closeBookDialog = document.getElementById("closeDialog");
const bookForm = document.getElementById("book-form");

// Form input elements
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readCheckbox = document.getElementById("read");

// Error message elements
const titleError = document.getElementById("titleError");
const authorError = document.getElementById("authorError");
const pagesError = document.getElementById("pagesError");

// --- Functions to Manage Books ---
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks(); // Call displayBooks directly after adding
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

function toggleReadStatus(index) {
  myLibrary[index].toggleReadStatus();
  displayBooks();
}

// --- DOM Manipulation Functions ---
function displayBooks() {
  libraryContainer.innerHTML = ""; // Clear existing books
  myLibrary.forEach((book, index) => {
    const bookCard = createBookCard(book, index);
    libraryContainer.appendChild(bookCard);
  });
}

function createBookCard(book, index) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");
  bookCard.setAttribute("data-index", index); // Add data-index to the card

  const titleElement = document.createElement("h2");
  titleElement.textContent = `📕 ${book.title}`;
  bookCard.appendChild(titleElement);

  const authorElement = document.createElement("p");
  authorElement.textContent = `Author: ${book.author}`;
  bookCard.appendChild(authorElement);

  const pagesElement = document.createElement("p");
  pagesElement.textContent = `Pages: ${book.pages}`;
  bookCard.appendChild(pagesElement);

  const statusElement = document.createElement("p");
  statusElement.textContent = `Status: ${book.read ? "Read" : "Not Read"}`;
  bookCard.appendChild(statusElement);

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  const toggleButton = document.createElement("button");
  toggleButton.textContent = "Toggle Read Status";
  toggleButton.classList.add("toggle-read-status");
  // No longer attaching onclick directly here for event delegation
  toggleButton.setAttribute("data-action", "toggle");
  buttonContainer.appendChild(toggleButton);

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.classList.add("remove-book");
  // No longer attaching onclick directly here for event delegation
  removeButton.setAttribute("data-action", "remove");
  buttonContainer.appendChild(removeButton);

  bookCard.appendChild(buttonContainer);

  return bookCard;
}

// --- Form Validation and Submission ---

// Generic function to show validation errors
// This function receives an input element and its corresponding error element
function showValidationError(inputElement, errorElement) {
  if (inputElement.validity.valueMissing) {
    errorElement.textContent = `Please enter the ${inputElement.name}.`;
  } else if (inputElement.validity.tooShort) {
    errorElement.textContent = `${
      inputElement.name.charAt(0).toUpperCase() + inputElement.name.slice(1)
    } should be at least ${inputElement.minLength} characters; you entered ${
      inputElement.value.length
    }.`;
  } else if (inputElement.validity.rangeUnderflow) {
    errorElement.textContent = `${
      inputElement.name.charAt(0).toUpperCase() + inputElement.name.slice(1)
    } must be at least ${inputElement.min}.`;
  } else if (inputElement.validity.rangeOverflow) {
    errorElement.textContent = `${
      inputElement.name.charAt(0).toUpperCase() + inputElement.name.slice(1)
    } must be no more than ${inputElement.max}.`;
  }
  errorElement.classList.add("active");
}

function clearValidationError(errorElement) {
  errorElement.textContent = "";
  errorElement.classList.remove("active");
}

// Add event listeners for input validation
// constant checking for each input field
titleInput.addEventListener("input", () => {
  if (titleInput.validity.valid) {
    clearValidationError(titleError);
  } else {
    showValidationError(titleInput, titleError);
  }
});

authorInput.addEventListener("input", () => {
  if (authorInput.validity.valid) {
    clearValidationError(authorError);
  } else {
    showValidationError(authorInput, authorError);
  }
});

pagesInput.addEventListener("input", () => {
  if (pagesInput.validity.valid) {
    clearValidationError(pagesError);
  } else {
    showValidationError(pagesInput, pagesError);
  }
});

// Form submission handler
bookForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent default form submission

  let formIsValid = true;

  // Check validity for all inputs
  if (!titleInput.validity.valid) {
    showValidationError(titleInput, titleError);
    formIsValid = false;
  } else {
    clearValidationError(titleError);
  }

  if (!authorInput.validity.valid) {
    showValidationError(authorInput, authorError);
    formIsValid = false;
  } else {
    clearValidationError(authorError);
  }

  if (!pagesInput.validity.valid) {
    showValidationError(pagesInput, pagesError);
    formIsValid = false;
  } else {
    clearValidationError(pagesError);
  }

  if (formIsValid) {
    addBookToLibrary(
      titleInput.value,
      authorInput.value,
      pagesInput.value,
      readCheckbox.checked // Pass boolean directly
    );
    bookDialog.close();
    bookForm.reset(); // Reset form fields
    // Clear errors after successful submission and form reset
    clearValidationError(titleError);
    clearValidationError(authorError);
    clearValidationError(pagesError);
  }
});

// --- Event Listeners for Dialog and Buttons ---
newBookButton.addEventListener("click", () => {
  bookDialog.showModal();
});

closeBookDialog.addEventListener("click", () => {
  bookDialog.close();
  bookForm.reset(); // Also reset form when closing without submitting
  // Clear errors when dialog is closed
  clearValidationError(titleError);
  clearValidationError(authorError);
  clearValidationError(pagesError);
});

// Event Delegation for book card buttons
libraryContainer.addEventListener("click", (event) => {
  const target = event.target;
  const bookCard = target.closest(".book-card"); // Find the closest parent book-card
  if (!bookCard) return; // If no book-card found, do nothing

  const index = parseInt(bookCard.dataset.index); // Get the index from the book-card's data attribute

  if (target.classList.contains("toggle-read-status")) {
    toggleReadStatus(index);
  } else if (target.classList.contains("remove-book")) {
    removeBook(index);
  }
});

// --- Initial Display ---
displayBooks(); // Display any initial books (if any)
