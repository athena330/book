const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 8888;

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'html.html'));
});

let books = [
  {
    "title": "My Year of Rest and Relaxation",
    "author": "Ottessa Moshfegh",
    "image": "https://m.media-amazon.com/images/I/51GAFkml+FL._SY445_SX342_.jpg",
    "year": 2018,
    "description": "A novel about a young woman who decides to sleep for a year.",
    "price": "$12.99"
  },
  {
    "title": "The Secret History",
    "author": "Donna Tartt",
    "image": "https://m.media-amazon.com/images/I/416lUyEwujL._SY445_SX342_.jpg",
    "year": 1992,
    "description": "A dark academia mystery involving a group of elite classics students.",
    "price": "$14.50"
  },
  {
    "title": "Ninth House",
    "author": "Leigh Bardugo",
    "image": "https://m.media-amazon.com/images/I/81kZbjtwdeL._AC_UY327_FMwebp_QL65_.jpg",
    "year": 2019,
    "description": "A fantasy thriller set in the secret societies of Yale.",
    "price": "$11.75"
  },
  {
    "title": "The Final Empire",
    "author": "Brandon Sanderson",
    "image": "https://covers.openlibrary.org/b/id/14811583-L.jpg",
    "year": 2006,
    "description": "An epic fantasy about rebellion and magical metals.",
    "price": "$13.99"
  },
  {
    "title": "Convenience Store Woman",
    "author": "Sayaka Murata",
    "image": "https://m.media-amazon.com/images/I/71K1cEWkDGL._AC_UY327_FMwebp_QL65_.jpg",
    "year": 2016,
    "description": "A quirky story about a woman working at a convenience store in Tokyo.",
    "price": "$10.99"
  },
  {
    "title": "Heaven",
    "author": "Mieko Kawakami",
    "image": "https://m.media-amazon.com/images/I/41WlKs9XhNL._SY445_SX342_.jpg",
    "year": 2009,
    "description": "A haunting exploration of bullying, violence, and friendship.",
    "price": "$12.25"
  },
  {
    "title": "The Seven Husbands of Evelyn Hugo",
    "author": "Taylor Jenkins Reid",
    "image": "https://m.media-amazon.com/images/I/81DfvU9E33L._AC_UY327_FMwebp_QL65_.jpg",
    "year": 2017,
    "description": "A historical fiction about the glamorous yet tragic life of a Hollywood icon.",
    "price": "$15.00"
  },
  {
    "title": "The Cruel Prince",
    "author": "Holly Black",
    "image": "https://m.media-amazon.com/images/I/91vfeH144cL._AC_UY327_FMwebp_QL65_.jpg",
    "year": 2018,
    "description": "A dark fantasy tale of faerie politics, ambition, and betrayal.",
    "price": "$11.20"
  },
  {
    "title": "A Court of Mist and Fury",
    "author": "Sarah J. Maas",
    "image": "https://m.media-amazon.com/images/I/81X7G446iEL._AC_UY327_FMwebp_QL65_.jpg",
    "year": 2016,
    "description": "The second book in a fantasy series filled with romance and magic.",
    "price": "$13.50"
  },
  {
    "title": "Vicious",
    "author": "V. E. Schwab",
    "image": "https://m.media-amazon.com/images/I/71+eIG7LsiL._AC_UY327_FMwebp_QL65_.jpg",
    "year": 2013,
    "description": "A gritty story of superpowers, ambition, and revenge.",
    "price": "$12.49"
  },
  {
    "title": "A Little Life",
    "author": "Hanya Yanagihara",
    "image": "https://m.media-amazon.com/images/I/71If19m2RXL._AC_UY327_FMwebp_QL65_.jpg",
    "year": 2015,
    "description": "An emotional epic about friendship, trauma, and survival.",
    "price": "$16.75"
  },
  {
    "title": "Circe",
    "author": "Madeline Miller",
    "image": "https://m.media-amazon.com/images/I/81POqvuiqTL._AC_UY327_FMwebp_QL65_.jpg",
    "year": 2018,
    "description": "A feminist retelling of the myth of the Greek sorceress Circe.",
    "price": "$13.80"
  }
];

setInterval(() => {
  const randomIndex = Math.floor(Math.random() * books.length);
  const newBook = { ...books[randomIndex], id: `${books[randomIndex].title}-${Date.now()}` };
  const oldBookIndex = books.findIndex(book => book.title === newBook.title && book.year === newBook.year);
  books.unshift(newBook);
  if (oldBookIndex !== -1) books.splice(oldBookIndex + 1, 1);
  console.log("Added new book:", newBook.title, "Removed old copy at index:", oldBookIndex);
}, 15000);

app.get('/books', (req, res) => {
  res.json(books);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const isValidPassword = /^[a-zA-Z]{7,}$/.test(password);
  if (!email || !password) {
    return res.status(400).json({ message: "Будь ласка, заповніть усі поля." });
  } else if (!isValidPassword) {
    return res.status(401).json({ message: "Пароль має містити лише літери і бути довшим за 6 символів." });
  } else {
    return res.status(200).json({ message: "Успішний вхід!" });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущено на http://localhost:${port}`);
});