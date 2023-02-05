const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");


exports.signin = async (req, res) => {
  try {
    const { phoneNumber, name } = req.body

    const token = jwt.sign({ id: phoneNumber }, config.secret);

    req.session.token = token;

    return res.status(200).send({
      phoneNumber, name,
      token,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!"
    });
  } catch (err) {
    this.next(err);
  }
};
