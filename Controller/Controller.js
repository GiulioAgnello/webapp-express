// import
const connection = require(`../Data/db`);

// controller routers
const index = (req, res) => {
  // date to take a query for movie
  const sql = `
  SELECT * 
  FROM movie_db.movies
  `;
  // query for movie
  connection.query(sql, (err, movie) => {
    if (err) return res.status(500).json({ error: `database query failed` });
    res.json(movie);
  });
};
const show = (req, res) => {
  // date to take a query for movie and reviews
  const { id } = req.params;
  const sql = `
  SELECT * 
  FROM movie_db.movies 
  WHERE id = ?
  `;
  // join
  const reviewsSql = `
    SELECT reviews.*
    FROM movies 
        JOIN reviews 
            ON movies.id = reviews.movie_id 
    WHERE movies.id = ?
  `;
  // query for movie
  connection.query(sql, [id], (err, movieResults) => {
    if (err) return res.status(500).json({ error: `database query failed` });
    if (movieResults.length === 0)
      return res.status(404).json({ error: `movie not found` });
    const movie = movieResults[0];
    // query for reviews
    connection.query(reviewsSql, [movie.id], (err, reviewResults) => {
      if (err) return res.status(500).json({ error: "Database query failed" });
      console.log(reviewResults);
      //   map to take info that i need
      movie.reviews = reviewResults.map((review) => ({
        id: review.id,
        name: review.name,
        vote: review.vote,
        text: review.text,
      }));
      res.json(movie);
    });
  });
};
const storeReview = (req, res) => {
  const { id } = req.params;

  const { name, vote, text } = req.body;

  let errors = [];

  if (!vote || vote < 1 || vote > 10) {
    errors.push({
      inputError: "vote",
      message: "aggiungere un voto tra 1 e 10",
    });
  }
  if (!name) {
    errors.push({
      inputError: "name",
      message: "Specifica un nome",
    });
  }
  if (!text) {
    errors.push({
      inputError: "text",
      message: "scrivi un testo per la recensione",
    });
  }

  if (errors.length) {
    return res.status(403).json({ message: "invalid input added", errors });
  }

  const sqlStoreReview = `INSERT INTO movie_db.reviews 
  (movie_id, name, vote, text) VALUES 
  (?, ?, ?, ?);`;

  const sqlReviewsValue = [id, name, vote, text];

  connection.query(sqlStoreReview, sqlReviewsValue, (err, results) => {
    if (err)
      return res.status(500).json({ error: `database query failed`, err });

    res.status(201).json({ message: "review added", id: id });
  });
};

module.exports = {
  index,
  show,
  storeReview,
};
