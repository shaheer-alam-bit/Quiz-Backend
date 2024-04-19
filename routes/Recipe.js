const router = require('express').Router();
const {addRecipe,getRecipe,deleteRecipe,updateRecipe,getRecipeByID} = require('../controllers/Recipe');

router.get('/get', getRecipe);
router.get('/getByID/:id', getRecipeByID);

router.use((req,res,next) => {
    if (req.user.isAdmin) {
        next();
    }
    else {
        res.status(400).json({msg : "You are not an admin"})
    }
})

router.post('/add', addRecipe);
router.post('/delete/:id', deleteRecipe);
router.post('/update/:id', updateRecipe);

module.exports = router;
