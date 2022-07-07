const {
    createUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
    addGroup,
} = require("../controllers/user");
var express = require("express");
var router = express.Router();

router.post("/", createUser);

router.get("/:username", getUser);
router.get("/", getAllUsers);

router.put("/:username", updateUser);

router.delete("/:username", deleteUser);

router.patch('/groups/:id', addGroup);

module.exports = router;