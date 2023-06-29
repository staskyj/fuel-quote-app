import express from "express";
const router = express.Router();
import {
    createQuote,
    getQuoteById,
    getUserQuotes
} from "../controllers/quoteController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, createQuote);
router.route("/:id").get(protect, getQuoteById);
router.route("/user/:userId").get(protect, getUserQuotes);

export default router;