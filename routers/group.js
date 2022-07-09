const router = require("express").Router();
const { createGroup, getMembers, getAllGroups, getGroup } = require('../controllers/group');

router.post("/", createGroup);

router.get("/members/:id", getMembers);
router.get("/:id", getGroup);
router.get("/", getAllGroups);

module.exports = router;