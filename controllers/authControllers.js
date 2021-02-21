const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');

module.exports.sign_up = (req, res) => {
    const { pseudo_name, email, password } = req.body;
    if (!pseudo_name || !email || !password) {
        res.status(400).json({ msg: 'Please enter all required fields'});
    }

    User.findOne({email}).then((user) => {
        if(user) return res.status(400).json({ msg: 'A user already exists with this e-mail address'});

        const NewUser =  new User({pseudo_name, email, password});

        bcrypt.genSalt(10, (err, salt) => {
            if(err) throw err;
            newUser.save()
                .then((user) =>{
                    jwt.sign(
                        { id: user._id},
                        config.get('jwtsecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user._id,
                                    pseudo_name: user.pseudo_name,
                                    password: user.password
                                }
                            });
                        }
                    )
                });
        })
    })
}

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ msg: 'Please enter all required fields'});
    }

    User.findOne({email}).then((user) => {
        if(!user) return res.status(400).json({ msg: 'Looks there is no user linked to this email :/'});

        bcrypt.compare(password, user.password)
            .then((isMatch) => {
                if(!isMatch) return res.status(400).json({ msg: 'Please ensure your credentials are correct'})

                jwt.sign(
                    { id: user._id},
                    config.get('jwtsecret'),
                    { expiresIn: 3600 },
                    (err, token) => {
                        if(err) throw err;
                        res.json({
                            token,
                            user: {
                                id: user._id,
                                pseudo_name: user.pseudo_name,
                                email: user.email
                            }
                        });
                    }
                )
            })
    })
}

module.exports.get_user = (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
}

