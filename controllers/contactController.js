const asynchandler = require('express-async-handler')
const Contact = require('../models/contactModel')


// Get All Contacts
const getContacts = asynchandler(async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.id})
    res.status(200).json(contacts)
})


// Create Contact
const createContact = asynchandler(async (req, res) => {
    console.log(req.body)
    const {name, email, phone} = req.body
    if (!name || !email || !phone) {
        return res.status(400).json({ message: 'Please provide all fields' })
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    })
    res.status(201).json({message: contact})
})


// Get Contact
const getContact = asynchandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        return res.status(404).json({ message: 'Contact not found' })
    }
    res.status(200).json(contact)
})


// Update Contact
const updateContact = asynchandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        return res.status(404).json({ message: 'Contact not found' })
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403)
        throw new Error('You do not own this contact')
    }

    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedContact)
})


// Delete Contact
const deleteContact = asynchandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        return res.status(404).json({ message: 'Contact not found' })
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403)
        throw new Error('You do not own this contact')
    }

    await Contact.deleteOne({_id: req.params.id})
    res.status(200).json(contact)
})


module.exports = { getContacts, createContact, getContact, updateContact, deleteContact }