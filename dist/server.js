import express from 'express';
import { pool, connectToDb } from './connection.js';
await connectToDb();
const PORT = process.env.PORT || 3001;
const app = express();
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Create a movie
// Test requests in Insomnia
// http://localhost:3001/api/add-movie
app.post('/api/add-movie', ({ body }, res) => {
    const sql = `INSERT INTO movies (movie_name)
    VALUES ($1)`;
    const params = [body.movie_name];
    pool.query(sql, params, (err, _result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body,
        });
    });
});
// Read all movies
app.get('/api/movies', (_req, res) => {
    const sql = `SELECT id, movie_name AS title FROM movies`;
    pool.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        const { rows } = result;
        res.json({
            message: 'success',
            data: rows,
        });
    });
});
// Get list of all reviews with movie data
app.get('/api/movie-reviews', (_req, res) => {
    const sql = `SELECT movies.movie_name AS movie, reviews.review
FROM reviews
LEFT JOIN movies
ON reviews.movie_id = movies.id
ORDER BY movies.movie_name;`;
    pool.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        const { rows } = result;
        res.json({
            message: 'success',
            data: rows,
        });
    });
});
// Update a movie review
app.put('/api/review/:id', (req, res) => {
    const sql = `UPDATE reviews SET review = $1 WHERE id = $2`;
    const params = [req.body.review, req.params.id];
    pool.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }
        else if (!result.rowCount) {
            res.json({
                message: 'Review not found',
            });
        }
        else {
            res.json({
                message: 'success',
                data: req.body,
                changes: result.rowCount,
            });
        }
    });
});
// Delete movie
app.delete('/api/movie/:id', (req, res) => {
    const sql = `DELETE FROM movies
    WHERE id = $1;`;
    const params = [req.params.id];
    pool.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }
        else if (!result.rowCount) {
            res.json({
                message: 'Movie not found'
            });
        }
        else {
            res.json({
                message: 'deleted',
                changes: result.rowCount,
                id: req.params.id,
            });
        }
    });
});
// Default response for any other request (Not Found)
app.use((_req, res) => {
    res.status(404).end();
});
app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}`);
});
