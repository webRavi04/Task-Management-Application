const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateAuthToken = (user) => {
    return jwt.sign({ _id: user._id }, '4c0d608098b', { expiresIn: '7d' });
};

exports.register = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        const token = generateAuthToken(user);
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).send({ error: 'Invalid login credentials' });
        }

        const token = generateAuthToken(user);
        res.send({ user, token });
    } catch (error) {
        res.status(500).send(error);
    }
};
