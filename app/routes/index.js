const express = require("express");
const router = express.Router();

const games = [];

// localhost:3000/games/
router.get("/", (req, res) => {
    res.status(200).json({
        message: "http://localhost:3000/games",
        data: games,
        metadata: { hostname: req.hostname, method: req.method },
    });
});

router.get("/:id", (req, res) => {
    const { id } = req.params;

    const game = games.find(game => id === game);

    const status = game ? 200 : 404;
    const data = game ? game : "Game does not exist";
    
    res.status(status).json({
        message: `http://localhost:3000/games/${id}`,
        data,
        metadata: { hostname: req.hostname, method: req.method },
    });
});

router.put("/:id", (req, res) => {
    // ID from existing game
    const { id } = req.params;
    // New object to update
    const { game } = req.body;

    // Does the id exist?
    const index = games.findIndex(existingGame => id === existingGame);
    // Does the update object already exist?
    const otherExistingGame = games.find(existingGame => existingGame === game);

    // If the index is -1, the object with the id was not found
    // Else, if the update object already exists, return a 409 - Conflict code
    const status = index === -1
        ? 404
        : (otherExistingGame ? 409 : 200);

    // Update if no 4xx error code has been assigned
    if (status === 200) {
        games[index] = game;
    }

    const data = status === 200
    ? games
    : (status === 404 ? "Game does not exist" : "New game already exists");
    
    res.status(status).json({
        message: `http://localhost:3000/games/${id}`,
        data,
        metadata: { hostname: req.hostname, method: req.method },
    });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const index = games.findIndex(existingGame => existingGame === id);

    const status = index === -1 ? 404 : 200;

    if (index !== -1) {
        games.splice(index, 1);
    }

    const data = index === -1 ? "Game does not exist" : games;

    res.status(status).json({
        message: `http://localhost:3000/games/${id}`,
        data,
        metadata: { hostname: req.hostname, method: req.method },
    });
});

router.post("/", (req, res) => {
    const { game } = req.body;
    const existingGame = games.find(existingGame => existingGame === game);

    const status = existingGame ? 409 : 201;

    if (!existingGame)
        games.push(game);

    res.status(status).json({
        message: "http://localhost:3000/games",
        data: games,
        metadata: {
            hostname: req.hostname,
            method: req.method,
        }
    });
});

module.exports = router;