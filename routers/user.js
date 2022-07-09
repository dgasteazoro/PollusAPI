const {
    createUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
    addGroup,
} = require("../controllers/user");
var express = require("express");
const { authorizeAdmin, authorizeOrg } = require("../middlewares/authorize");
var router = express.Router();

router.post("/", authorizeOrg, createUser);

router.get("/:username", authorizeAdmin, getUser);
router.get("/", authorizeAdmin, getAllUsers);

// router.put("/:username", updateUser);

router.delete("/:username", deleteUser);

router.patch('/groups/:id', authorizeOrg, addGroup);

module.exports = router;