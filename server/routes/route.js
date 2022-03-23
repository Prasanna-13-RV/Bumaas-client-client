const express = require("express");
const app = express();

const router = express.Router({mergeParams: true});

router.get("/hi", (req, res) => {
    res.send("Hi");
});