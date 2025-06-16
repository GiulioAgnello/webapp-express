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
        vote: review.vote,
        text: review.text,
      }));
      res.json(movie);
    });
  });
};
const store = (req, res) => {
  //   // recuperiamo info dal body
  //   const { title, content, image, reviewss } = req.body;
  //   // controllo dati dal body
  //   let isRequestMalformed = false;
  //   const malformedElement = [];
  //   if (!title || typeof title !== "string") {
  //     console.log("title is malformed");
  //     malformedElement.push(title);
  //     isRequestMalformed = true;
  //   }
  //   if (!content || typeof content !== "string") {
  //     console.log("content is malformed");
  //     malformedElement.push(content);
  //     isRequestMalformed = true;
  //   }
  //   if (!image || typeof image !== "string") {
  //     console.log("image is malformed");
  //     malformedElement.push(image);
  //     isRequestMalformed = true;
  //   }
  //   if (!Array.isArray reviewss)) {
  //     console.log( reviewss is malformed");
  //     malformedElement.push reviewss);
  //     isRequestMalformed = true;
  //   }
  //   if (isRequestMalformed) {
  //     res.status(400);
  //     res.json({
  //       error: "400 bad request",
  //       message: "request is malformed",
  //     });
  //     return;
  //   }
  //   // nuovo id
  //   const newId = movies[movies.length - 1].id + 1;
  //   const newmovie = {
  //     id: newId,
  //     title: title,
  //     content: content,
  //     image: image,
  //     reviewss: reviewss,
  //   };
  //   // pusho il nuovo movie nell'array
  //   movies.push(newmovie);
  //   // restituisco le informazioni aggionrate
  //   res.status(201);
  //   res.json(newmovie);
};
const update = (req, res) => {
  // // recupero il movie da modificare
  // const id = parseInt(req.params.id);
  // const movie = movies.find((currentmovie) => currentmovie.id === id);
  // if (!movie) {
  //   res.status(404);
  //   return res.json({
  //     error: "not found",
  //     message: "movie not found",
  //   });
  // }
  // // creiamo il nuovo movie
  // const { title, content, image, reviewss } = req.body;
  // // controllo dati dal body
  // let isRequestMalformed = false;
  // const malformedElement = [];
  // if (!title || typeof title !== "string") {
  //   console.log("title is malformed");
  //   malformedElement.push("title");
  //   isRequestMalformed = true;
  // }
  // if (!content || typeof content !== "string") {
  //   console.log("content is malformed");
  //   malformedElement.push("content");
  //   isRequestMalformed = true;
  // }
  // if (!image || typeof image !== "string") {
  //   console.log("image is malformed");
  //   malformedElement.push("image");
  //   isRequestMalformed = true;
  // }
  // if (!Array.isArray( reviewss")) {
  //   console.log( reviewss is malformed");
  //   malformedElement.push reviewss);
  //   isRequestMalformed = true;
  // }
  // if (isRequestMalformed) {
  //   res.status(400);
  //   res.json({
  //     error: "400 bad request",
  //     message: "request is malformed",
  //   });
  //   return;
  // }
  // const newmovie = {
  //   id: movie.id,
  //   title: title,
  //   content: content,
  //   image: image,
  //   reviewss: reviewss,
  // };
  // // sostituisco con lo splice il movie con id d'interesse
  // movies.splice(movies.indexOf(movie), 1, newmovie);
  // res.json({
  //   description: `lista dei movie`,
  //   data: movies,
  // });
};
const modify = (req, res) => {
  // recupero movie dove applicare la patch
  //   const id = parseInt(req.params.id);
  //   const movie = movies.find((currentmovie) => currentmovie.id === id);
  //   if (!movie) {
  //     res.status(404);
  //     return res.json({
  //       error: "not found",
  //       message: "movie not found",
  //     });
  //   }
  //   // creiamo il nuovo movie
  //   const title = req.body.title !== undefined ? req.body.title : movie.title;
  //   const content =
  //     req.body.content !== undefined ? req.body.content : movie.content;
  //   const image = req.body.image !== undefined ? req.body.image : movie.image;
  //   const reviewss = req.body reviewss !== undefined ? req.body reviewss : movie reviewss;
  //   // controllo dati dal body
  //   let isRequestMalformed = false;
  //   const malformedElement = [];
  //   if (!title || typeof title !== "string") {
  //     console.log("title is malformed");
  //     malformedElement.push("title");
  //     isRequestMalformed = true;
  //   }
  //   if (!content || typeof content !== "string") {
  //     console.log("content is malformed");
  //     malformedElement.push("content");
  //     isRequestMalformed = true;
  //   }
  //   if (!image || typeof image !== "string") {
  //     console.log("image is malformed");
  //     malformedElement.push("image");
  //     isRequestMalformed = true;
  //   }
  //   if (!Array.isArray reviewss)) {
  //     console.log( reviewss is malformed");
  //     malformedElement.push( reviewss");
  //     isRequestMalformed = true;
  //   }
  //   if (isRequestMalformed) {
  //     res.status(400);
  //     res.json({
  //       error: "400 bad request",
  //       message: "request is malformed",
  //       malformedElement,
  //     });
  //     return;
  //   }
  //   // if (title) {
  //   //   movie.title = title;
  //   // }
  //   // if (content) {
  //   //   movie.content = content;
  //   // }
  //   // if (image) {
  //   //   movie.image = image;
  //   // }
  //   // if  reviewss) {
  //   //   movie reviewss = reviewss;
  //   // }
  //   movie.title = title;
  //   movie.content = content;
  //   movie.image = image;
  //   movie reviewss = reviewss;
  //   res.json(movie);
  // };
  // const destroy = (req, res) => {
  //   const id = parseInt(req.params.id);
  //   const movie = movies.find((movie) => movie.id === id);
  //   if (!movie) {
  //     res.status(404);
  //     return res.json({
  //       error: "not found",
  //       message: "movie not found",
  //     });
  //   }
  //   movies.splice(movies.indexOf(movie), 1);
  //   res.json({
  //     description: `lista dei movie`,
  //     data: movies,
  //   });
};
const destroy = (req, res) => {
  //   // recupero id
  //   const { id } = req.params;
  //   const destroySql = `DELETE FROM blog_db.movies WHERE id = ?`;
  //   // eliminiamo il movie identicato con id
  //   connection.query(destroySql, [id], (err) => {
  //     if (err)
  //       return res.status(500).json({ error: `Failed to delet movie ${[id]}` });
  //     res.sendStatus(204);
  //   });
};

module.exports = {
  index,
  show,
  store,
  update,
  modify,
  destroy,
};
