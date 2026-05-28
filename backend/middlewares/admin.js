
import User from "../models/User.js";

export const admin = async (req, res, next) => {
    try {
        const id = req.user.user_id;

        const admin = await User.findById(id);

        if (admin.isAdmin) {
            next()
        } else {
            res.status(403).json("Forbidden.")
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}