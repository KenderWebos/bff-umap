const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const ApiResponse = require('../utils/ApiResponse');

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(new ApiResponse(400, 'Bad Request', null, errors.array()));
    }

    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json(new ApiResponse(400, 'Bad Request', null, 'Email already exists'));
        }

        user = new User({ name, email, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.status(201).json(new ApiResponse(201, 'Created', { token }));
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json(new ApiResponse(500, 'Server Error', null));
    }
};

exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(new ApiResponse(400, 'Bad Request', null, errors.array()));
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json(new ApiResponse(400, 'Bad Request', null, 'Invalid Credentials'));
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json(new ApiResponse(400, 'Bad Request', null, 'Invalid Credentials'));
        }

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.status(200).json(new ApiResponse(200, 'OK', { token }));
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json(new ApiResponse(500, 'Server Error', null));
    }
};
