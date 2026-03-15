const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getBalance,
  getStatement,
  transferMoney,
} = require("../controllers/accountController");

const router = express.Router();

router.get("/balance", authMiddleware, getBalance);
router.get("/statement", authMiddleware, getStatement);
router.post("/transfer", authMiddleware, transferMoney);

module.exports = router;
