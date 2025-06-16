

// Basic Queries
// 1. Find all books in a specific genre
db.books.find({ genre: "Fantasy" })

// 2. Find books published after a certain year
db.books.find({ published_year: { $gt: 2010 } })

// 3. Find books by a specific author
db.books.find({ author: "George Orwell" })

// 4. Update the price of a specific book
db.books.updateOne(
  { title: "Dune" },
  { $set: { price: 17.99 } }
)

// 5. Delete a book by its title
db.books.deleteOne({ title: "1984" })

// Advanced Queries
// 6. Find books that are in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } })

// 7. Projection: only title, author, and price
db.books.find({}, { _id: 0, title: 1, author: 1, price: 1 })

// 8. Sort by price ascending
db.books.find().sort({ price: 1 })

// 9. Sort by price descending
db.books.find().sort({ price: -1 })

// 10. Pagination - First 5 books
db.books.find().limit(5)

// 11. Pagination - Next 5 books
db.books.find().skip(5).limit(5)

// Aggregation Pipeline
// 12. Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
])

// 13. Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
])

// 14. Group books by decade
db.books.aggregate([
  {
    $project: {
      decade: { $concat: [{ $substr: ["$published_year", 0, 3] }, "0s"] }
    }
  },
  {
    $group: {
      _id: "$decade",
      count: { $sum: 1 }
    }
  }
])

// Indexing
// 15. Create index on title
db.books.createIndex({ title: 1 })

// 16. Compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 })

// 17. Use explain() to check performance
db.books.find({ title: "The Hobbit" }).explain("executionStats")
