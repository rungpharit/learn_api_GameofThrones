const express = require('express');
const app = express();
const books = require('./api/books')

app.use(express.json());

//Get all
app.get('/api/books', (req, res) => {
  res.json(books)
});

//Get one book by id
app.get('/api/books/:id' , (req,res) => {
  const { id } = req.params;
  const found = books.some(book => book.id === parseInt(id))

  if (found) {
    res.json(books.filter(book => book.id === parseInt(id)));
  } else {
    res.status(400).json({msg : `No book with the id of ${id}`});
  }
});

//Create new book
app.post('/api/books', (req,res) => {
  const {title , price } = req.body ;
  const newBook = {
    id: books.length + 1,
    title , 
    price  
  } ;

  if(!newBook.title || !newBook.price){
    return res.status(400).json({ msg : 'Please type title or price of book'});
  }
  books.push(newBook);
  res.json(books);
});

//Update book
app.put('/api/books/:id',(req ,res) => {
  const { id } = req.params;
  const found = books.some(book => book.id === parseInt(id)); 

  if (found) {
    const updBook = req.body;
    books.forEach(book => {
      if(book.id === parseInt(id)) {
        book.title = updBook.title ? updBook.title : book.title;
        book.price = updBook.price ? updBook.price : book.price;

        res.json({ msg : 'book updated', book});
      }
    });
  } else {
    res.status(400).json({msg : `No book with the id of ${id}`});
  }
});

//Delete book
app.delete('/api/books/:id',  (req,res) => {
  const {id} = req.params;
  const found = books.some(book => book.id === parseInt(id));
 

  if(found){
    res.json({msg : 'book deleted ', book : books.filter(book => book.id !== parseInt(id))});
  } else {
    res.status(400).json({msg : `No book with the id of ${id}`});
  }
});
const PORT = process.env.PORT || 5000;

app.listen(PORT,() => console.log(`Server started on port ${PORT}`));