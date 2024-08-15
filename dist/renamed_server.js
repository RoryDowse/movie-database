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
// Update a movie
// Delete movie
// Default response for any other request (Not Found)
