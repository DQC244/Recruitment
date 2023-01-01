import jwt from "jsonwebtoken";
import { createError } from "./error";
import User from "./models/User";

export const verifyTokenAdmin = async (req, res, next) => {
  try {
    const accessToken = req.header("access_token");
    if (!accessToken) {
      return res.status(403).send({ message: "Required JWT Token" });
    }

    if (!accessToken)
      return next(createError(401, "You are not authenticated!"));

    const decoded = jwt.verify(accessToken, process.env.JWT);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findById(decoded.id);

    if (!user || user.permission !== 0) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    req.userId = user.id;
    next();
  } catch (error) {
    next(error);
  }
};
