const User = require("../models/user.model");
const jwt = require('jsonwebtoken');
const bcypt = require('bcrypt');

module.exports.registerController = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });


        const jwtToken = jwt.sign({ userId: user.id }, process.env.JWT_TOKEN_PRIVATE_KEY);

        return res.json({ status: true, token: jwtToken, message: "User created successfully!" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Oops! Something went wrong. Please try again in a moment' });
    }
}

module.exports.loginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({
            where: {
                email: email
            }
        });

        if (!user) {
            return res.status(400).json({ error: "Invalid username or password!" });
        }

        const passwordMatched = await bcypt.compare(password, user.password);
        if (!passwordMatched) {
            return res.status(400).json({ error: "Invalid username or password!" });
        }

        const jwtToken = jwt.sign({ userId: user.id }, process.env.JWT_TOKEN_PRIVATE_KEY);

        return res.json({ status: true, token: jwtToken, message: "User loggedin successfully!" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Oops! Something went wrong. Please try again in a moment' });
    }
}
