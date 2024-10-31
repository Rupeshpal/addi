const express = require('express');
const { handleCreateNewUser, handleGetUser, getByUSerID, login } = require("../controllers/dashuser");
const router = express.Router();

// Correct route definitions
router.route("/").get(handleGetUser).post(handleCreateNewUser);
router.post("/login", login);  // Removed the second .post() call
router.route("/:id").get(getByUSerID);

module.exports = router;
