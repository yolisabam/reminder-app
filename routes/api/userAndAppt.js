//require dependencies
const router = require("express").Router();
const userController = require("../../controllers/userController");
const apptController = require("../../controllers/apptController");

//Matches with "/api/login"
router.route("/login")
  .post(userController.findOne);

//Matches with "/api/signup"
router.route("/signup")
  .post(userController.create);

router.route("/user/:userid/appt/:id*?")
  .get(apptController.get)
  .post(apptController.create)
  .put(apptController.update)
  .delete(apptController.remove);

module.exports = router;