const router = require("express").Router();
// All the different thought api methods
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

// routes for getThoughts and createThought
router.get("/", getThoughts);
router.post("/", createThought);

// routes for getSingleThought, updateThought, and deleteThought
router.get("/:thoughtId", getSingleThought);
router.get("/:thoughtId", updateThought);
router.get("/:thoughtId", deleteThought);

// route for createReaction
router.post("/:thoughtId/reactions", createReaction);

// route for delete reaction
router.delete("/:thoughtId/reactions/:reactionId", deleteReaction);

module.exports = router;
