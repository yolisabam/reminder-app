const router = require("express").Router(); //use express Router
const userAndApptRoutes = require("./userAndAppt");

//user and appointment router
router.use("/", userAndApptRoutes);

module.exports = router;