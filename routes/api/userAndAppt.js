//require dependencies
const router = require("express").Router();
const userController = require("../../controllers/userController");
const apptController = require("../../controllers/apptController");

//Matches with "/api/login"
router.route("/login")
  .post(userController.findOne);

// //Matches with "/api/signup"
// router.route("signup")
//   .post(userController.create);

// //Matches with "/api/user/appt"
// router.route("user/:id/appt")
//   .get(apptController.findAll);

// //Matches with "/api/user/appt/"
// router.route("user/:id/appt/")
//   .post(apptController.create);

// //Matches with "/api/user/appt/:id"
// router.route("user/:id/appt/:id")
//   .put(apptController.update)
//   .delete(apptController.remove);

module.exports = router;