import { User } from "../user/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.sendStatus(400);
    return;
  }
  const user = await User.findOne({ email }).lean();
  const compareResult = await bcrypt.compare(password, user.passwordHash);
  if (!compareResult) {
    res.sendStatus(401);
    return
  }
  
  const token = jwt.sign(
    { username: user.username, email },
    process.env.JWT_SECRET
  );
  res.cookie("token", token)
  res.json({ status: "ok"});
};

export const userLogout = (req, res) =>{
  res.clearCookie("token")
  res.end()
}