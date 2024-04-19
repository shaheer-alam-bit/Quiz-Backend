const router = require('express').Router();
const {addIngredient,getIngredient} = require('../controllers/Ingredient');

router.use((req,res,next) => {
    if (req.user.isAdmin) {
        next();
    }
    else {
        res.status(400).json({msg : "You are not an admin"})
    }
})

router.post('/add', addIngredient);
router.get('/get', getIngredient)

module.exports = router;