
import bcrypt from 'bcrypt'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'



export const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const isUser = await User.findOne({ email });
        if (isUser) {
            return res.status(409).json("User already exists.")
        } else {
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = await User.create({ name, email, password: hashedPassword });
            const { password: _, ...newUserwithoutPassword } = newUser.toObject()
            res.status(200).json(newUserwithoutPassword)
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const isUser = await User.findOne({ email });
        if (!isUser) {
            res.status(409).json("No user found")
        } else {
            if (await bcrypt.compare(password, isUser.password)) {
                const token = jwt.sign({ user_id: isUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
                const { password: _, ...userWithoutPassword } = isUser.toObject();
                res.status(200).json({ user: userWithoutPassword, token });
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

