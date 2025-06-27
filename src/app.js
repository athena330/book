const { useState, useEffect } = React;

function Book({ book, isNew }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="card h-100">
        <div className="book-image-container">
          <img
            src={book.image || "https://via.placeholder.com/250"}
            alt={book.title || "No title"}
            className="card-img-top"
            style={{ height: "250px", objectFit: "contain" }}
            onError={(e) => (e.target.src = "https://via.placeholder.com/250")}
          />
          {isNew && <span className="badge bg-success position-absolute top-0 start-0 m-2">Нове</span>}
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title book-title">{book.title || "Без назви"}</h5>
          <p className="card-text book-author">Автор: {book.author || "Невідомо"}</p>
          <div className="mt-auto">
            <button
              className="btn btn-custom-purple w-100"
              onClick={() => setShowModal(true)}
            >
              Детальніше
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div
          className="modal fade show d-block modal-overlay"
          tabIndex="-1"
          onClick={() => setShowModal(false)}
        >
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title book-title">{book.title || "Без назви"}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p className="book-detail"><strong>Автор:</strong> {book.author || "Невідомо"}</p>
                <p className="book-detail"><strong>Рік:</strong> {book.year || "Невідомо"}</p>
                <p className="book-detail"><strong>Опис:</strong> {book.description || "Немає опису"}</p>
                <p className="book-detail"><strong>Ціна:</strong> {book.price || "Невідомо"}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-custom-purple" onClick={() => setShowModal(false)}>
                  Закрити
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SearchBar({ query, setQuery }) {
  return (
    <div className="input-group mb-4">
      <input
        className="form-control custom-search-input"
        type="text"
        placeholder="Пошук книги за назвою..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Sending login:", { email, password: pass });
    if (!email || !pass) {
      setError("Будь ласка, заповніть усі поля.");
      setSuccess("");
      return;
    }
    try {
      const response = await fetch("http://localhost:8888/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pass }),
      });
      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);
      if (response.ok) {
        setSuccess(data.message || "Успішний вхід!");
        setError("");
      } else {
        setError(data.message || "Невірний логін або пароль");
        setSuccess("");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Помилка з'єднання з сервером");
      setSuccess("");
    }
  };

  return (
    <div className="card p-4 mb-4 custom-login-form">
      <h4 className="card-title">Вхід користувача</h4>
      <input
        type="email"
        className="form-control mb-2 custom-login-input"
        placeholder="Ім'я користувача"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="form-control mb-2 custom-login-input"
        placeholder="Пароль"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />
      <button type="submit" className="btn btn-custom-purple w-100" onClick={handleLogin}>
        Увійти
      </button>
      {error && <div className="alert alert-danger mt-2">{error}</div>}
      {success && <div className="alert alert-success mt-2">{success}</div>}
    </div>
  );
}

function Quiz() {
  const questions = [
    {
      question: "Що таке фентезі?",
      options: ["Наукова література", "Жанр із вигаданим світом", "Автобіографія", "Історичний роман"],
      correct: 1,
    },
    {
      question: "Чим відрізняється новела від роману?",
      options: ["Довжиною та структурою", "Мова оригіналу", "Кількість героїв", "Обкладинкою"],
      correct: 0,
    },
    {
      question: "Що означає 'детектив'?",
      options: ["Комічна розповідь", "Жанр про кохання", "Розслідування злочинів", "Фантастична подорож"],
      correct: 2,
    },
    {
      question: "Які ознаки має байка?",
      options: ["Без сюжету", "Гумор та мораль", "Тільки діалоги", "Наукові терміни"],
      correct: 1,
    },
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const handleAnswer = (index) => {
    if (index === questions[current].correct) {
      setScore(score + 1);
    }
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setDone(true);
    }
  };

  return (
    <div className="card p-4 mb-4">
      <h4 className="card-title quiz-title">Вікторина: Жанри та стилі</h4>
      {!done ? (
        <div>
          <p className="mb-3 quiz-question"><strong>{questions[current].question}</strong></p>
          {questions[current].options.map((opt, i) => (
            <button key={i} onClick={() => handleAnswer(i)} className="btn btn-custom-purple w-100 mb-2 quiz-option">
              {opt}
            </button>
          ))}
        </div>
      ) : (
        <div className="alert alert-info">
          <h5 className="quiz-result">Результат:</h5>
          {score === 4 && <p className="quiz-result-text">Ти чудово орієнтуєшся в жанрах!</p>}
          {score === 3 && <p className="quiz-result-text">Ти добре знаєш жанри, трохи практики — і супер!</p>}
          {score === 2 && <p className="quiz-result-text">Ти посередньо обізнаний/на в жанрах літератури.</p>}
          {score < 2 && <p className="quiz-result-text">Варто трохи підтягнути знання про жанри.</p>}
        </div>
      )}
    </div>
  );
}

function App() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [oldBooks, setOldBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:8888/books');
        if (!response.ok) throw new Error('Помилка завантаження книг: ' + response.status);
        const newBooks = await response.json();
        console.log("Fetched books:", newBooks);
        if (oldBooks.length === 0) {
          setOldBooks(newBooks);
        } else {
          const updatedBooks = newBooks.map(book => ({
            ...book,
            isNew: !oldBooks.some(oldBook => oldBook.title === book.title)
          }));
          setBooks(updatedBooks);
          setOldBooks(newBooks);
        }
      } catch (err) {
        console.error('Помилка fetch:', err.message);
      }
    };

    fetchBooks();
    const interval = setInterval(fetchBooks, 10000);
    return () => clearInterval(interval);
  }, [oldBooks]);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(query.toLowerCase())
  );
  console.log("Rendered books:", filteredBooks);

  return (
    <div className="main-container">
      <div className="container mt-4">
        <div className="row">
          <div className="col-12">
            <div className="menu-block">
              <div className="menu-item"><a href="#books">Книги</a></div>
              <div className="menu-item"><a href="#sale">Акція</a></div>
              <div className="menu-item"><a href="#quiz">Вікторина</a></div>
            </div>
          </div>
          <div className="col-12">
            <LoginForm />
            <SearchBar query={query} setQuery={setQuery} />
            <div className="row row-cols-1 row-cols-md-4 g-4" id="books">
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <div key={book.title} className="col">
                    <Book book={book} isNew={book.isNew} />
                  </div>
                ))
              ) : (
                <p className="text-center">Книги не знайдено</p>
              )}
            </div>
            <div id="sale" className="alert alert-warning mt-5 w-100" role="alert">
              Акція! Купи 2 книги — отримай 1 безкоштовно! Тільки сьогодні!
            </div>
            <div id="quiz">
              <Quiz />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
