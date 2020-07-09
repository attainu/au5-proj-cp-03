const express = require("express");

const upload = require("../utils/multerconfig");

const router = express.Router();
const { getebook, saveebook } = require("../controllers/ebookController");

router.get("/getebook/:courseid", getebook);
router.post("/saveebook", upload.single("file"), saveebook);
module.exports = router;
