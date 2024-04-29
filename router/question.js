const express = require("express");
const router = express.Router();

const {
  postQuestion,
  getQuestion,
  getQuestions,
  deleteQuestion,
  editQuestion,
} = require("../controllers/question");

router.route("/").post(postQuestion).get(getQuestions);
router.route("/delete/:id").delete(deleteQuestion);
router.route("/edit/:id").put(editQuestion);
router.route("/:id").get(getQuestion);

module.exports = router;
