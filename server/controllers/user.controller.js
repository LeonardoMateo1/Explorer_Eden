const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    register: async (req, res) => {
        User.create(req.body)
            .then(user => {
                const userToken = jwt.sign({
                    id: user._id}, process.env.JWT_SECRET)
                    res
                        .cookie('usertoken', userToken, {httpOnly: true})
                        .json({ msg: 'User successfully created', user: user});
            })
            .catch(err => res.status(400).json(err));
    },

    login: async (req, res) => {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(400).json({ error: 'Email not found'});
        }
        const correctPassword = await bcrypt.compare(req.body.password, user.password);
        if (!correctPassword) {
            res.status(400).json({ error: 'Incorrect password'});
        }
        const userToken = jwt.sign({id: user._id}, process.env.JWT_SECRET);
            res
                .cookie('usertoken', userToken, {httpOnly: true})
                .json({ msg: 'User successfully logged in', user: user});
    },

    logout: (req, res) => {
        res.clearCookie('usertoken');
        res.status(200).json({msg: "Successfully logged out"});
    },

    getTrips: async (req, res) => {
        console.log(req.user.id)
        User.findOne({_id: req.user.id})
            .populate('trips')
            .then(user => res.json({user : user}))
            .catch(err => res.status(400).json(err));
    }
}