const User = require("../models/User");
var bcrypt = require("bcrypt");

module.exports.update_profile = async (req, res) => {
    const { first_name, last_name, pseudo_name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const fieldsToUpdate = {}
    if (first_name) fieldsToUpdate.first_name = first_name;
    if (last_name) fieldsToUpdate.last_name = last_name;
    if (pseudo_name) fieldsToUpdate.pseudo_name = pseudo_name;
    if (email) fieldsToUpdate.email = email;
    if (password) fieldsToUpdate.password = await bcrypt.hash(password, salt);

    try {
        let profile = await User.findOne({ _id : req.user.id })

        if (profile) {
            profile = await User.findOneAndUpdate(
                { _id: req.user.id },
                { '$set': fieldsToUpdate },
                {new: true}
            );
            return res.json(profile)
        }
        
    } catch (err) {
          console.log(err);
          res.status(500).send("Server error");
        }
}