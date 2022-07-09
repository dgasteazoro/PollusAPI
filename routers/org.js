const router = require("express").Router();
const { 
    createOrg,
    getOrg,
    getAllOrgs,
    updateOrg,
    deleteOrg, 
} = require("../controllers/org");

router.post('/', createOrg);

router.get('/:id', getOrg);
router.get('/', getAllOrgs);

router.put('/:id', updateOrg);

router.delete('/:id', deleteOrg);

module.exports = router;
