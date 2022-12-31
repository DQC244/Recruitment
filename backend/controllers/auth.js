import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import VerifyToken from "../models/VerifyToken.js";
import { HOUR_BY_TIMESTAMP, USER_STATUS } from "../constants.js";

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();

    const code = Math.round(Math.random() * 1000000);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "dqc.recruitment@gmail.com",
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: "dqc.recruitment@gmail.com",
      to: req.body.email,
      subject: "Verification",
      text: `${code} is your verification code.`,
    };

    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        return next(createError(400, error.msg));
      } else {
        const newVerify = new VerifyToken({
          verifyToken: code,
          userId: newUser._id.toString(),
        });

        await newVerify.save();

        res
          .status(200)
          .send(
            `We just sent a text message containing a 6-digit verification code to ${req.body.email}`
          );
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      const msg = Object.keys(error.keyValue)[0] + " existed!";

      return next(createError(400, msg));
    } else {
      next(error);
    }
  }
};

export const signIn = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);

    if (!isCorrect) return next(createError(400, "Wrong credentials!"));

    if (!user.isVerified) return next(createError(400, "unverified account"));

    if (user.status===USER_STATUS.block) return next(createError(400, "Your account has been locked"));

    const { password, ...otherUser } = user._doc;
    const token = jwt.sign({ id: user._id }, process.env.JWT);

    res.status(200).json({ ...otherUser, token });
  } catch (error) {
    next(error);
  }
};

export const verifyCode = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(createError(500, "user not found!"));
    }

    const verifyCodeText = await VerifyToken.findOne({
      userId: user._id.toString(),
    }).sort({ createdAt: -1 });

    if (req.body.code === verifyCodeText.verifyToken) {
      const dateNow = Date.now() / 1000;
      if (Number(dateNow) < Number(verifyCodeText.expireDate)) {
        await User.findOneAndUpdate(
          { email: req.body.email },
          { isVerified: true }
        );
        return res.status(200).json("verify success!");
      } else {
        return next(createError(500, "expired code!"));
      }
    } else {
      return next(createError(500, "incorrect code!"));
    }
  } catch (error) {
    next(error);
  }
};
