const { createGroup, getMembers } = require('../controllers/group');
var express = require("express");
var router = express.Router();

router.post("/", createGroup);

router.get("/members/:id", getMembers);

// router.get("/:username", getUser);
// router.get("/", getAllUsers);
// router.put("/:username", updateUser);
// router.delete("/:username", deleteUser);
// router.patch('/groups/:id', addGroup);

module.exports = router;