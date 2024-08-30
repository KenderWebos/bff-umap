const User = require('../models/User');
const { validationResult } = require('express-validator');
const ApiResponse = require('../utils/ApiResponse');

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json(new ApiResponse(404, 'Not Found', null, 'User not found'));
        }
        res.status(200).json(new ApiResponse(200, 'OK', user));
    } catch (err) {
        console.error(err.message);
        res.status(500).json(new ApiResponse(500, 'Server Error', null));
    }
};

exports.updateUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(new ApiResponse(400, 'Bad Request', null, errors.array()));
    }

    const { name, email } = req.body;

    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json(new ApiResponse(404, 'Not Found', null, 'User not found'));
        }

        if (name) user.name = name;
        if (email) user.email = email;

        await user.save();

        res.status(200).json(new ApiResponse(200, 'OK', user));
    } catch (err) {
        console.error(err.message);
        res.status(500).json(new ApiResponse(500, 'Server Error', null));
    }
};

exports.deleteUser = async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json(new ApiResponse(404, 'Not Found', null, 'User not found'));
        }

        await user.remove();

        res.status(200).json(new ApiResponse(200, 'OK', 'User deleted'));
    } catch (err) {
        console.error(err.message);
        res.status(500).json(new ApiResponse(500, 'Server Error', null));
    }
};
