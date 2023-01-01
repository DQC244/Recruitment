import express from "express";
import Stripe from "stripe";
import { User } from "../models";
import Order from "../models/Order";
import { verifyToken } from "../verifyToken";

const router = express.Router();

// add
router.post("/payment", verifyToken, (req, res) => {
  Stripe(process.env.SECRET_KEY).charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    async (stripeError, stripRes) => {
      if (stripeError) {
        res.status(500).json(stripeError);
      } else {
        const order = new Order({
          userId: req.userId,
          packageId: req.body.packageId,
          amount: req.body.amount / 100,
          paymentId: stripRes.id,
        });

        await order.save();
        await User.findByIdAndUpdate(
          req.userId,
          {
            $set: { package: req.body.packageId },
          },
          { new: true }
        );
        res.status(200).json(stripRes);
      }
    }
  );
});

export default router;
