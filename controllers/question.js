const Question = require("../model/question");

const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find({}).lean();
    res.status(200).send(questions);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const getQuestion = async (req, res) => {
  if (req.params) {
    const _id = req.params.id;
    try {
      const findQuestion = await Question.findById(_id);
      if (!findQuestion) {
        return res.status(404).send("Question Not Found");
      }

      res.status(200).send(findQuestion);
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.status(400).send("Bad Request");
  }
};

const postQuestion = async (req, res) => {
  try {
    let { title, description } = req.body;
    let createdAt = new Date();

    const question = new Question({
      title,
      description,
      createdAt,
    });
    await question.save();
    res.status(200).send(question);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const editQuestion = async (req, res) => {
  try {
    let { title, description } = req.body;
    const _id = req.params.id;
    const updatedAt = new Date();

    const updatedQuestion = {
      title,
      description,
      updatedAt,
    };

    const result = await Question.findByIdAndUpdate(_id, updatedQuestion, {
      new: true,
    });

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const deleteQuestion = async (req, res) => {
  if (req.params) {
    const _id = req.params.id;
    try {
      const deleteQuestion = await Question.findByIdAndDelete(_id);
      if (!deleteQuestion) {
        return res.status(404).send("Question not Found");
      }

      res.status(200).send(deleteQuestion);
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.status(400).send("Bad Request");
  }
};

module.exports = {
  postQuestion,
  getQuestion,
  getQuestions,
  deleteQuestion,
  editQuestion,
};
