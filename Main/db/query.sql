SELECT movies.movie_name AS movie, reviews.review
FROM reviews
LEFT JOIN movies
ON reviews.movie_id = movies.id
ORDER BY movies.movie_name;


-- movies_db=# SELECT movies.movie_name AS movie, reviews.review
-- movies_db-# FROM reviews
-- movies_db-# LEFT JOIN movies
-- movies_db-# ON reviews.movie_id = movies.id
-- movies_db-# ORDER BY movies.movie_name;
--       movie       |                                     review                                     
-- ------------------+--------------------------------------------------------------------------------
--  Lion King        | Scar is the lion everyone loves to hate
--  Lion King        | Zazu is underrated. Give that hornbill a sequel!
--  Lion King        | Hakuna matata
--  The Godfather    | I'm gonna make him an offer you can't refuse, watch this movie
--  The Wizard of Oz | Those flying monkeys are nightmare fuel!
--  The Wizard of Oz | The tin man gave a metallic, hollow performance
--  West Side Story  | Ten years of ballet and three years of tap to join a gang in this neighborhood
