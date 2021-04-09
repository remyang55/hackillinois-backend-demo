const express = require("express");
const Contact = require("./models/Contact");
const router = express.Router();

// Get all contacts
router.get("/contacts", async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.send(contacts);
    } catch {
        res.status(404);
        res.send({ error: "Get request error" });
    }
});

// Get specific contact
router.get("/contacts/:id", async (req, res) => {
	try {
		const contact = await Contact.findOne({ _id: req.params.id });
		res.send(contact);
	} catch {
		res.status(404);
		res.send({ error: "ID incorrect: Post doesn't exist" });
	}
})

// Create new contact
router.post("/contacts", async (req, res) => {
    try {
        const contact = new Contact({
            name: req.body.name,
            phone: req.body.phone,
            titles: req.body.titles
        });

        await contact.save();
        res.send(contact);
    } catch {
        res.status(404);
        res.send({ error: "Post request error" });
    }
});

// Update existing contact
router.patch("/contacts/:id", async (req, res) => {
	try {
		const contact = await Contact.findOne({ _id: req.params.id });

		if (req.body.name) {
			contact.name = req.body.name;
		}
		if (req.body.phone) {
			contact.phone = req.body.phone;
		}
        if (req.body.titles) {
            contact.titles = req.body.titles;
        }

		await contact.save();
		res.send(contact);
	} catch {
		res.status(404);
		res.send({ error: "ID incorrect: Post doesn't exist" });
	}
});

// Delete contact
router.delete("/contacts/:id", async (req, res) => {
	try {
		await Contact.deleteOne({ _id: req.params.id });
		res.status(204).send();
	} catch {
		res.status(404);
		res.send({ error: "ID incorrect: Post doesn't exist" });
	}
});

module.exports = router;
