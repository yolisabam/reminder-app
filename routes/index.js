const router = require("express").Router(); //use express Router
const apiRoutes = require("./api");

//API routes, using the prefix of "/api"
router.use("/api", apiRoutes);

module.exports = router;