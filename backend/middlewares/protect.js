import jwt from 'jsonwebtoken'

export const protect = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    try {
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decoded
            next()
        } else {
            res.status(401).json("No token found.")
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}