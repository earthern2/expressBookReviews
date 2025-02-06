const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  // Retrieve username and password from the request body
  const { username, password } = req.body;

  // Check if both username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  // Check if the username already exists
  if (users.find((user) => user.username === username)) {
    return res.status(409).json({ message: "Username already exists" });
  }

  // Register the new user
  users.push({ username, password });

  // Send success response
  return res.status(201).json({ message: "User registered successfully" });
});

// Task 1 - Get the book list available in the shop
// public_users.get('/',function (req, res) {
//   // Simulate fetching books from a database or external source
//   const getBooks = () => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve(books);
//       }, 1000); // Adding delay to simulate fetching data
//     });
//   };

//   // Fetch the books and send them as a JSON response
//   getBooks()
//     .then((books) => {
//       res.json(books); // Automatically formats the JSON response with proper headers
//     })
//     .catch((err) => {
//       console.error(err); // Log the error for debugging
//       res.status(500).json({ error: "An error occurred while fetching the books." });
//     });
// });

// Task - 10 Get the book list available in the shop
public_users.get('/', async (req, res) => {
  // Simulate fetching books from a database or external source
  const getBooks = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(books); // Resolve the books after a delay
      }, 1000); // Adding delay to simulate fetching data
    });
  };

  try {
    // Use await to get books
    const fetchedBooks = await getBooks();
    
    // Send the fetched books as a JSON response
    res.json(fetchedBooks); // Automatically formats the JSON response with proper headers
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: "An error occurred while fetching the books." });
  }
});

// Task 2 - Get book details based on ISBN
// public_users.get('/isbn/:isbn',function (req, res) {
//   // Fetch the book based on ISBN from the database or book list
//   const getByISBN = (isbn) => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         const book = books[isbn];  // Use the numeric ISBN key to find the book
//         if (book) {
//           resolve(book); // If book is found, resolve the promise
//         } else {
//           reject({ status: 404, message: "Book not found" }); // Reject with error if book not found
//         }
//       }, 1000); // Simulating database delay
//     });
//   };

//   const isbn = req.params.isbn; // Retrieve the ISBN from the request parameters

//   getByISBN(isbn)
//     .then(result => res.json(result)) // Send book as a JSON response if found
//     .catch(error => res.status(error.status || 500).json({ message: error.message || "Error occurred" })); // Return error if not found
// });

// Task 11 - Get book details based on ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
    // Simulate fetching book by ISBN from a database or book list
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
  
    try {
      // Await the result of getByISBN
      const result = await getByISBN(isbn);
      
      // Send the book details as a JSON response if found
      res.json(result);
    } catch (error) {
      // Return error if not found or any other error occurs
      res.status(error.status || 500).json({ message: error.message || "Error occurred" });
    }
  });
  
// Task 3 - Get book details based on author
// public_users.get('/author/:author',function (req, res) {
//   const author = req.params.author; // Retrieve the author from the request parameters

//   // Function to get books by author
//   const getBooksByAuthor = (auth) => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         // Filter books that match the provided author
//         const filteredBooks = Object.values(books).filter((book) => book.author === auth);
//         if (filteredBooks.length > 0) {
//           resolve(filteredBooks); // If books are found, resolve with the filtered books
//         } else {
//           reject(new Error("No books found by this author")); // Reject if no books found
//         }
//       }, 1000); // Simulate delay
//     });
//   };

//   // Get books based on author and handle the response
//   getBooksByAuthor(author)
//     .then((filteredBooks) => res.json(filteredBooks)) // Send the filtered books as a JSON response
//     .catch((err) => res.status(400).json({ error: err.message })); // Return error if no books found
// });

// Task 12 - Get book details based on author
public_users.get('/author/:author', async (req, res) => {
    const author = req.params.author; // Retrieve the author from the request parameters
  
    // Function to get books by author using async/await
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
  
    try {
      // Await the result of getBooksByAuthor
      const filteredBooks = await getBooksByAuthor(author);
  
      // Send the filtered books as a JSON response
      res.json(filteredBooks);
    } catch (err) {
      // Return error if no books found or any other error occurs
      res.status(400).json({ error: err.message });
    }
  });

// Task 4 - Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title; // Retrieve the title from the request parameters

  // Function to get books by title
  const getBooksByTitle = (booktitle) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Filter books that match the provided title
        const filteredBooks = Object.values(books).filter((book) => book.title === booktitle);
        if (filteredBooks.length > 0) {
          resolve(filteredBooks); // If books are found, resolve with the filtered books
        } else {
          reject(new Error("No books found with this title")); // Reject if no books found
        }
      }, 1000); // Simulate delay
    });
  };

  // Get books based on title and handle the response
  getBooksByTitle(title)
    .then((filteredBooks) => res.json(filteredBooks)) // Send the filtered books as a JSON response
    .catch((err) => res.status(400).json({ error: err.message })); // Return error if no books found
});

// Task 13 - Get all books based on title
public_users.get('/title/:title', async (req, res) => {
    const title = req.params.title; // Retrieve the title from the request parameters
  
    // Function to get books by title using async/await
    const getBooksByTitle = (booktitle) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Filter books that match the provided title
          const filteredBooks = Object.values(books).filter((book) => book.title === booktitle);
          if (filteredBooks.length > 0) {
            resolve(filteredBooks); // If books are found, resolve with the filtered books
          } else {
            reject(new Error("No books found with this title")); // Reject if no books found
          }
        }, 1000); // Simulate delay
      });
    };
  
    try {
      // Await the result of getBooksByTitle
      const filteredBooks = await getBooksByTitle(title);
  
      // Send the filtered books as a JSON response
      res.json(filteredBooks);
    } catch (err) {
      // Return error if no books found or any other error occurs
      res.status(400).json({ error: err.message });
    }
  });

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn; // Retrieve the ISBN from the request parameters

  // Function to get the book based on ISBN
  const getByISBN = (isbn) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const book = books[isbn]; // Find the book with the matching ISBN
        if (book) {
          resolve(book); // If book is found, resolve with the book
        } else {
          reject({ status: 404, message: "Book not found" }); // Reject with error if book not found
        }
      }, 1000); // Simulating database delay
    });
  };

  // Get book reviews based on ISBN
  getByISBN(isbn)
    .then(result => res.json(result.reviews)) // Send the reviews as a JSON response
    .catch(error => res.status(error.status || 500).json({ message: error.message || "Error occurred" })); // Return error if book not found
});

module.exports.general = public_users;
