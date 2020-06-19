const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
  try {
    let { name, email, role, password, gender, location } = req.body;

    let salt = await bcryptjs.genSalt(10);
    let hashPassword = await bcryptjs.hash(password, salt);

    let user = await user.create({
      name,
      email,
      role,
      password: hashPassword,
      gender,
      location
    });

    res.json({
      status: true,
      data: user
    })
  } catch (error) {

  }
};

exports.login = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      return res.json({ status: false })
    }

    //Decrypt password
    let validPassword = await bcryptjs.compare(password, user.password);
    // validPassword = true;
    if (validPassword) {
      const token = jwt.sign({ _id: user._id }, 'secretkey',
      )
      res.header('auth-token', token).json({
        status: true,
        data: user,
        token
      });
    } else {
      return res.json({ status: false })
    }
  } catch (error) {

  }
}