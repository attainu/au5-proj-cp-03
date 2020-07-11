const express = require("express");



const router = express.Router();
const { getebook, saveebook } = require("../controllers/ebookController");

router.get("/getebook/:courseid", getebook);
router.post("/saveebook", saveebook);
module.exports = router;
