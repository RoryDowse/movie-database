SELECT * FROM movies;

SELECT current_database();

SELECT id, movie_name AS title FROM movies;

INSERT INTO movies (movie_name)
VALUES ('The Godfather');

DELETE FROM movies
WHERE id = '4';

SELECT movies.movie_name AS movie, reviews.review
FROM reviews
LEFT JOIN movies
ON reviews.movie_id = movies.id
ORDER BY movies.movie_name; 