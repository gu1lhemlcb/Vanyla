const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const jwtSecretToken = config.get('jwtSecretToken');
const { body, validationResult } = require("express-validator");
var bcrypt = require("bcrypt");

module.exports.sign_up = async (req, res) => {
  const { first_name, last_name, pseudo_name, email, password } = req.body;

  if (!first_name || !last_name || !pseudo_name || !email || !password) res.status(400).json({ msg: "Missing fields :/" });

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "An user is already registered with this email buddy" });
    }
    // check('first_name', "James, like all secret agents !").not().isEmpty(),
    // check('last_name', "Bond, really ??").not().isEmpty(),
    // check('pseudo_name', "007 ????").not().isEmpty(),
    // check('email', 'Please enter a valid email address').isEmail(),
    // check('password', 'Please choose a password with at least 8 characters').isLength({ min: 8 })
    // const errors = validationResult(req.body);
    // if (!errors.isEmpty()) {
    //         return res.status(400).json({ errors: errors.array() });
    //     }
    user = new User({
      first_name,
      last_name,
      pseudo_name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    user.save();

    const payload = {
      user: {
        id : user._id // See mongoose _id field in the collection
      }
    }

    jwt.sign(
      payload,
      jwtSecretToken,
      { expiresIn : 36000},
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user
        });
      });

    // res.status(200).json({ msg: "User created" });
  } catch (e) {
    console.log(e);
    res.status(500).send("Server error");
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) res.status(400).json({ msg: "Please enter all requiered fields " });

  User.findOne({ email }).then((user) => {

    bcrypt.compare(password, user.password)
    .then((isMatch) => {
        if(!isMatch) return res.status(400).json({ msg: 'Please ensure your password correct'})

        jwt.sign(
            { id: user._id},
            config.get('jwtSecretToken'),
            { expiresIn: 36000 },
            (err, token) => {
                if(err) throw err;
                res.json({
                    token,
                    user
                });
            }
        )
    })
  });
};

module.exports.get_user = (req, res) => {
  User.findById(req.user.id)
      .select('-password')
      .then(user => res.json(user));
}

// module.exports.sign_up = (req, res) => {
//     const { pseudo_name, email, password } = req.body;
//     if (!pseudo_name || !email || !password) {
//         res.status(400).json({ msg: 'Please enter all required fields'});
//     }

//     User.findOne({email}).then((user) => {
//         if(user) return res.status(400).json({ msg: 'A user already exists with this e-mail address'});

//         const NewUser =  new User({pseudo_name, email, password});

//         bcrypt.genSalt(10, (err, salt) => {
//             if(err) throw err;
//             newUser.save()
//                 .then((user) =>{
//                     jwt.sign(
//                         { id: user._id},
//                         config.get('jwtsecret'),
//                         { expiresIn: 3600 },
//                         (err, token) => {
//                             if(err) throw err;
//                             res.json({
//                                 token,
//                                 user: {
//                                     id: user._id,
//                                     pseudo_name: user.pseudo_name,
//                                     password: user.password
//                                 }
//                             });
//                         }
//                     )
//                 });
//         })
//     })
// }
