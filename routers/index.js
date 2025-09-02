const router = require("express").Router();

router.use("/user",require('./userRouter'));
router.use("/admin",require('./adminRoutes'));
router.use("/editor",require('./editorRoutes'));

module.exports = router;