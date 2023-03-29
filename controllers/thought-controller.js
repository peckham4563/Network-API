const { User, Thought } = require("../models");

module.exports = {
  // Get all students
  getThought(req, res) {
    Thought.find()
      .then(async (thought) => {
        return res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single student
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that id." })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new student
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((updatedUser) => {
        if (!updatedUser) {
          return res.status(404).json({
            message: "thought created but not added to user",
          });
        }
        res.json({
          message: "thought created",
        });
      })
      .catch((err) => res.status(500).json(err));
  },
  // Delete a student and remove them from the course
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: "No thought found" });
        }
        return User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          {
            $pull: {
              thoughts: req.params.thoughtId,
            },
          },
          { new: true }
        );
      })
      .then(() =>
        res.json({
          message: "User and thoughts deleted",
        })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json({ message: "No thought found" });
        }
        res.json(thoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: {reactionId: req.params.reactionId} } },
      { runValidators: true, new: true }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json({ message: "No thought found" });
        }
        res.json(thoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add an assignment to a student
  //   addAssignment(req, res) {
  //     console.log('You are adding an assignment');
  //     console.log(req.body);
  //     Student.findOneAndUpdate(
  //       { _id: req.params.studentId },
  //       { $addToSet: { assignments: req.body } },
  //       { runValidators: true, new: true }
  //     )
  //       .then((student) =>
  //         !student
  //           ? res
  //               .status(404)
  //               .json({ message: 'No student found with that ID :(' })
  //           : res.json(student)
  //       )
  //       .catch((err) => res.status(500).json(err));
  //   },
  // Remove assignment from a student
  //   removeAssignment(req, res) {
  //     Student.findOneAndUpdate(
  //       { _id: req.params.studentId },
  //       { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
  //       { runValidators: true, new: true }
  //     )
  //       .then((student) =>
  //         !student
  //           ? res
  //               .status(404)
  //               .json({ message: 'No student found with that ID :(' })
  //           : res.json(student)
  //       )
  //       .catch((err) => res.status(500).json(err));
  //   },
};
