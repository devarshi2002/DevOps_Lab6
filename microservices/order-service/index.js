const express = require('express');
const app = express();
const PORT = 3002;

app.get('/orders', (req, res) => {
    res.json([{ id: 101, item: "Laptop" }]);
});

app.listen(PORT, () => {
    console.log(`Order Service running on port ${PORT}`);
});
