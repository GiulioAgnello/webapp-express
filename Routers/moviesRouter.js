// import
const express = require("express");
const controllerRouter = require("../Controller/Controller");

const router = express.Router();

// router
router.get(`/`, controllerRouter.index);
router.get("/:id", controllerRouter.show);

// add reviews route
router.post("/:id/reviews", controllerRouter.storeReview);

// export
module.exports = router;
