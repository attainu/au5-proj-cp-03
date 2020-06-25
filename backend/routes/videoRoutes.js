const express = require("express");

const router = express.Router();
const upload = require("../utils/uploadfile");
const {
  getvideos,
  createvideo,
  getallvideos,
} = require("../controllers/videoController");
//getlistofvideos
router.get("/getvideos", getvideos);
//getallvideos
router.get("/getallvideos", getallvideos);
//insert video in the database
router.post("/createvideo", upload.single('file'), createvideo);

module.exports = router;
