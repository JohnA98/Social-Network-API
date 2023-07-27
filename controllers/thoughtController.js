const { User, Thought } = require("../models");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughtsData = await Thought.find();
      res.status(200).json(thoughtsData);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thoughtData = await Thought.findById(req.params.thoughtID);
      res.status(200).json(thoughtData);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  //create a thought and push the created thought's _id to the associated user's thoughts array field
  // async createThought(req, res) {
  //   try {
  //     const chosenUser = await User.findOne({ username: req.body.username})
  //   }
  //   Thought.create(req.body)
  //     .then(({ _id }) => {
  //       return User.findOneAndUpdate(
  //         { _id: req.body.userId },
  //         { $push: { thoughts: _id } },
  //         { new: true }
  //       );
  //     })
  //     .then((thought) =>
  //       !thought
  //         ? res.status(404).json({ message: "No User find with this ID!" })
  //         : res.json(thought)
  //     )
  //     .catch((error) => res.status(500).json(error));
  // },

  // // async createThought(req, res) {
  // // try {
  // //   const createdThought = await Thought.create(req.body);

  // //   if (!createdThought) {
  // //     return res.status(404).json({ message: "No User found with this ID!" });
  // //   }

  // //   const updatedUser = await User.findOneAndUpdate(
  // //     { _id: req.body.userId },
  // //     { $push: { thoughts: createdThought._id } },
  // //     { new: true }
  // //   );

  // //   return res.json(updatedUser);
  // // } catch (error) {
  // //   return res.status(500).json(error);
  // // }
  // // },

  // // //   async createThought(req, res) {
  // // //   try {
  // // //     const { thoughtText, userId } = req.body;

  // // //     // Ensure thoughtText and userId are provided in the request body
  // // //     if (!thoughtText || !userId) {
  // // //       return res.status(400).json({ message: "Both thoughtText and userId are required!" });
  // // //     }

  // // //     // Create the new thought with the provided thoughtText
  // // //     const createdThought = await Thought.create({ thoughtText });

  // // //     // If the thought couldn't be created, handle the error
  // // //     if (!createdThought) {
  // // //       return res.status(500).json({ message: "Failed1 to create the thought!" });
  // // //     }

  // // //     // Find the user by the specified userId and update the thoughts array
  // // //     const updatedUser = await User.findOneAndUpdate(
  // // //       { _id: userId },
  // // //       { $push: { thoughts: createdThought._id } },
  // // //       { new: true }
  // // //     );

  // // //     // If the user couldn't be found, handle the error
  // // //     if (!updatedUser) {
  // // //       return res.status(404).json({ message: "No 2User found with this ID!" });
  // // //     }

  // // //     // Return the updated user data as the response
  // // //     return res.json(updatedUser);
  // // //   } catch (error) {
  // // //     // Handle any other errors that might occur
  // // //     console.error(error);
  // // //     return res.status(500).json({ message: "3Internal server error" });
  // // //   }
  // // // },

  createThought(req, res) {
    Thought.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No User find with this ID!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  //update a thought
  // updateThought(req, res) {
  //   Thought.findOneAndUpdate(
  //     { _id: req.params.thoughtId },
  //     { $set: req.body },
  //     { runValidators: true, New: true }
  //   )
  //     .then((user) =>
  //       !user
  //         ? res.status(404).json({ message: "No thought find with this ID!" })
  //         : res.json(user)
  //     )
  //     .catch((error) => res.status(500).json(error));
  // },

  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!updatedThought) {
        return res
          .status(404)
          .json({ message: "No thought found with this ID!" });
      }

      return res.json(updatedThought);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  //delete a thought
  // deleteThought(req, res) {
  //   Thought.findOneAndDelete({ _id: req.params.thoughtId })
  //     .then((thought) =>
  //       !thought
  //         ? res.status(404).json({ message: "No thought find with this ID!" })
  //         : User.findOneAndUpdate(
  //             { thoughts: req.params.thoughtId },
  //             { $pull: { thoughts: req.params.thoughtId } },
  //             { new: true }
  //           )
  //     )
  //     .then((user) =>
  //       !user
  //         ? res
  //             .status(404)
  //             .json({ message: "Thought deleted, but no user found" })
  //         : res.json({ message: "Thought successfully deleted" })
  //     )
  //     .catch((error) => res.status(500).json(error));
  // },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with this ID!" });
      }

      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "Thought deleted, but no user found" });
      }

      return res.json({ message: "Thought successfully deleted" });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  //create reaction
  // createReaction(req, res) {
  //   Thought.findOneAndUpdate(
  //     { _id: req.params.thoughtId },
  //     { $addToSet: { reactions: req.body } },
  //     { runValidators: true, new: true }
  //   )
  //     .then((thought) =>
  //       !thought
  //         ? res.status(404).json({ message: "No thought frind with ID!" })
  //         : res.json(thought)
  //     )
  //     .catch((error) => res.status(500).json(error));
  // },

  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with this ID!" });
      }
      return res.json(thought);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  //delete reaction
  // deleteReaction(req, res) {
  //   Thought.findOneAndUpdate(
  //     { _id: req.params.thoughtId },
  //     { $pull: { reactions: { reactionId: req.params.reactionId } } },
  //     { runValidators: true, new: true }
  //   )
  //     .then((thought) =>
  //       !thought
  //         ? res.status(404).json({ message: "No thought find with this ID!" })
  //         : res.json(thought)
  //     )
  //     .catch((error) => res.status(500).json(error));
  // },
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with this ID!" });
      }

      return res.json(thought);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
