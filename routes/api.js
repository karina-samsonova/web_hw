const express = require('express');
const db = require('../db.js');

const router = express.Router();

router.post('/expenses', (req, res) => {
    const body = req.body;

    if (!body.name || !body.amount || typeof body.amount !== 'number' || body.amount < 1 || !body.date) {
        return res.status(400).json({ error: 'Required fields are missing or wrong' });
    }

    const expense = {
        name: body.name,
        amount: body.amount,
        date: new Date(body.date),
        category: body.category,
    };

    db.pushExpense(expense);
    res.status(200).json(expense);
});

router.get('/expenses', (req, res) => {
    res.json(db.getExpenses());
});

router.post('/expenses/search', (req, res) => {
    const { date } = req.body;

    if (!date) {
        return res.status(400).json({ error: "No required 'date' field" });
    }

    const formatted = new Date(date).toDateString();
    const filtered = db.getExpenses().filter(expense =>
        expense.date.toDateString() === formatted
    );

    res.json(filtered);
});

router.post('/limit', (req, res) => {
    const { limit } = req.body;

    if (typeof limit !== 'number' || limit < 0) {
        return res.status(400).json({ error: 'Incorrect format' });
    }

    db.setLimit(limit);
    res.status(200).json({ message: 'Daily limit set successfully' });
});

router.get('/limit', (req, res) => {
    res.json({ limit: db.getLimit() });
});

module.exports = router;
