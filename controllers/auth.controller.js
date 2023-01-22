const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
var uniqid = require('uniqid');

const { User } = require('../database/database')

exports.signUpPost = async (req, res) => {
    try {
        const { email, password, otp, confirmOTP, phone } = req.body;
        if (otp !== confirmOTP) {
            return res.status(500).json('Invalid OTP. Please enter the OTP which is sent to your mail.')
        }

        let user = await User.findOne({ where: { email }, raw: true })

        if (user) return res.status(500).json({
            error: 'User already exists'
        });

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const user_id = uniqid()

        user = await User.create({
            id_user: user_id,
            name: email.split('@')[0],
            email,
            phone,
            password: hash
        })

        const token = jwt.sign({
            id_user: user.id_user,
            name: user.name,
            email: user.email,
            phone: user.phone,
            icon: user.icon,
            role: user.role,
            created_at: user.created_at,
            updated_at: user.updated_at,
        }, process.env.SECRET, {
            expiresIn: 1000 * 60 * 60 * 24 * 7 * 30
        });

        return res.json({
            token,
            ...user.dataValues
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}

exports.loginPost = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ where: { email }, raw: true })

        if (!user) return res.status(500).json({ error: 'User does not exist' })

        if (!bcrypt.compareSync(password, user.password))
            return res.status(500).json({
                error: 'Invalid password'
            });

        const token = jwt.sign({
            id_user: user.id_user,
            name: user.name,
            email: user.email,
            phone: user.phone,
            icon: user.icon,
            role: user.role,
            created_at: user.created_at,
            updated_at: user.updated_at,
        }, process.env.SECRET, {
            expiresIn: 60 * 60 * 24 * 7 * 30
        });

        return res.json({
            token,
            ...user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}
