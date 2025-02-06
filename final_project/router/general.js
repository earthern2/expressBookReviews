const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  // Simulate fetching books from a database or external source
  const getBooks = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(books);
      }, 1000); // Adding delay to simulate fetching data
    });
  };

  // Fetch the books and send them as a JSON response
  getBooks()
    .then((books) => {
      res.json(books); // Automatically formats the JSON response with proper headers
    })
    .catch((err) => {
      console.error(err); // Log the error for debugging
      res.status(500).json({ error: "An error occurred while fetching the books." });
    });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  // Fetch the book based on ISBN from the database or book list
  const getByISBN = (isbn) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const book = books[isbn];  // Use the numeric ISBN key to find the book
        if (book) {
          resolve(book); // If book is found, resolve the promise
        } else {
          reject({ status: 404, message: "Book not found" }); // Reject with error if book not found
        }
      }, 1000); // Simulating database delay
    });
  };

  const isbn = req.params.isbn; // Retrieve the ISBN from the request parameters

  getByISBN(isbn)
    .then(result => res.json(result)) // Send book as a JSON response if found
    .catch(error => res.status(error.status || 500).json({ message: error.message || "Error occurred" })); // Return error if not found
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author; // Retrieve the author from the request parameters

  // Function to get books by author
  const getBooksByAuthor = (auth) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Filter books that match the provided author
        const filteredBooks = Object.values(books).filter((book) => book.author === auth);
        if (filteredBooks.length > 0) {
          resolve(filteredBooks); // If books are found, resolve with the filtered books
        } else {
          reject(new Error("No books found by this author")); // Reject if no books found
        }
      }, 1000); // Simulate delay
    });
  };

  // Get books based on author and handle the response
  getBooksByAuthor(author)
    .then((filteredBooks) => res.json(filteredBooks)) // Send the filtered books as a JSON response
    .catch((err) => res.status(400).json({ error: err.message })); // Return error if no books found
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
