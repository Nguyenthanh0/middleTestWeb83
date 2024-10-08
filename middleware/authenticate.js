import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, "your_jwt_secret");
    req.userId = decoded.userId; // Gắn userId vào request để sử dụng sau
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token." });
  }
};
