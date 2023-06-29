import asyncHandler from "express-async-handler";
import Quote from "../models/quoteModel.js";
import User from "../models/userModel.js";

// @desc    Create a new quote
// @route   POST /api/quotes
// @access  Private
const createQuote = asyncHandler(async (req, res) => {
    const { gallons, state, city, deliveryDate, suggestedPrice, amountDue } = req.body;
    const user = req.user;

    const quote = await Quote.create({
        gallons,
        state,
        city,
        deliveryDate,
        suggestedPrice,
        amountDue
    });

    if(quote) {
        user.quotes.push(quote._id);
        await user.save();
        res.status(201).json(quote);
    } else {
        res.status(400);
        throw new Error("Quote not found");
    }
});

// @desc    Get quote by ID
// @route   GET /api/quotes/:id
// @access  Private
const getQuoteById = asyncHandler(async (req, res) => {
  const quote = await Quote.findById(req.params.id);

  if(quote) {
      res.json(quote);
  } else {
      res.status(404);
      throw new Error("Quote not found");
  }
});

// @desc    Get quotes by user ID
// @route   GET /api/quotes/user/:userId
// @access  Private
const getUserQuotes = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.userId).populate("quotes");

    if(user) {
        res.json(user.quotes);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

export { 
    createQuote,
    getQuoteById,
    getUserQuotes
};