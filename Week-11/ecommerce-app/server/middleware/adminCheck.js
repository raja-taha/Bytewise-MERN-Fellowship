const adminCheck = (req, res, next) => {
  // Check if the user is authenticated and has a role or email
  if (req.user && req.user.email === "rajataha062@gmail.com") {
    next(); // User is an admin, proceed to the next middleware or route handler
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};

module.exports = adminCheck;
