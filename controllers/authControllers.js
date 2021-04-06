const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const { body, validationResult } = require("express-validator");
var bcrypt = require("bcrypt");

module.exports.sign_up = async (req, res) => {
  const { first_name, last_name, pseudo_name, email, password } = req.body;

  if (!first_name || !last_name || !pseudo_name || !email || !password) {
    return res.status(400).json({ msg: "Missing fields " });
  }

  try {
    var existingUser = User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }
    // req.checkBody('first_name', "James, like all secret agents !").not().isEmpty(),
    // req.checkBody('last_name', "Bond, really ??").not().isEmpty(),
    // req.checkBody('pseudo_name', "007 ????").not().isEmpty(),
    // req.checkBody('email', 'Please enter a valid email address').isEmail(),
    // req.checkBody('password', 'Please choose a password with at least 8 characters').isLength({ min: 8 })
    // const errors = validationResult(req.body);
    // if (!errors.isEmpty()) {
    //         return res.status(400).json({ errors: errors.array() });
    //     }
    const newUser = new User({
      first_name,
      last_name,
      pseudo_name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    newUser.save();

    res.status(200).json({ msg: "User created" });
  } catch (e) {
    console.log(e);
    res.status(500).send("Server error");
  }
};

module.exports.login = async (re, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (user) {
      if (user.password == password) {
        res.status(200).json({ msg: "User found" });
      } else {
        res.status(400).json({ msg: "Please ensure your password is correct" });
      }
    } else {
      res
        .status(400)
        .json({ msg: "User not found, please ensure your email is valid" });
    }
  });
};

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

// module.exports.login = async (req, res) => {
//     const { email, password } = req.body;
//     if (!email || !password) {
//         res.status(400).json({ msg: 'Please enter all required fields'});
//     }

//     User.findOne({email}).then((user) => {
//         if(!user) return res.status(400).json({ msg: 'Looks there is no user linked to this email :/'});

//         bcrypt.compare(password, user.password)
//             .then((isMatch) => {
//                 if(!isMatch) return res.status(400).json({ msg: 'Please ensure your credentials are correct'})

//                 jwt.sign(
//                     { id: user._id},
//                     config.get('jwtsecret'),
//                     { expiresIn: 3600 },
//                     (err, token) => {
//                         if(err) throw err;
//                         res.json({
//                             token,
//                             user: {
//                                 id: user._id,
//                                 pseudo_name: user.pseudo_name,
//                                 email: user.email
//                             }
//                         });
//                     }
//                 )
//             })
//     })
// }

// module.exports.get_user = (req, res) => {
//     User.findById(req.user.id)
//         .select('-password')
//         .then(user => res.json(user));
// }
