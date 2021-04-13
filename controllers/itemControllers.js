const Item = require('../models/Item');

module.exports.get_items = (req, res) => {
    Item.find().sort({ date: -1 }).then(items => res.json(items));
}

module.exports.post_item = async (req, res) => {
    const { title, description, category, price, availability } = req.body;

    if (!title|| !description || !category || !price || !availability) res.status(400).json(
        { msg: "Missing fields :/" }
    );
    
    try {
        let item = await Item.findOne({ title });

        if (item) {
            return res.status(400).json({ msg: "This item already exists" });
        }
        item = new Item(req.body);
        item.save().then(() => res.json(item));
        console.log(item)

        res.status(200).send("Item created")

    } catch(e) {
        console.log(e);
        res.status(500).send("Server error");
    }    
}

module.exports.update_item = async (req, res) => {
    const { title, description, category, price, availability } = req.body;

    const fieldsToUpdate = {}
    if (title) fieldsToUpdate.title = title;
    if (description) fieldsToUpdate.description = description;
    if (category) fieldsToUpdate.category = category;
    if (price) fieldsToUpdate.price = price;
    if (availability) fieldsToUpdate.availability = availability;

    try {
        let itemToUpdate = Item.findOne({ title });

        if (itemToUpdate) {
            itemtoUpdate = await Item.findOneAndUpdate(
                { title: req.body.title },
                { '$set': fieldsToUpdate },
                { new: true }
            );
            return res.send("Item infos updated");
        }
    } catch (err) {
        console.log(err);
        return res.json(item)
    }
}

module.exports.delete_item = (req, res) => {
    const id = req.body.id;

    try {
        let itemToDelete = Item.findOne({ _id: id });

        if (itemToDelete) {
            Item.findOneAndDelete(
                { _id: id },
                function (err, deletedItem) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log("Item : " + deletedItem.title + " has been deleted");
                    }         
                }
            );
            res.status(200).json({ msg: "Item deleted"});
        }
    } catch (err) {
        console.log(err);
        res.status(400).send("Server error")
    }
}