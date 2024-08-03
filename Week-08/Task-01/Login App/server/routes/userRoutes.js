const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  readUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/userController");
const { verify } = require("../middleware/verify");

router.get("/read", verify, readUser);
router.post("/create", upload.single("image"), createUser);
router.post("/login", loginUser);
router.put("/update/:id", verify, updateUser);
router.delete("/delete/:id", verify, deleteUser);

module.exports = router;
