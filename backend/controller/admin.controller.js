import Admin from "../models/admin.model.js";


export const adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const admin = await Admin.findOne({ username });
        if (!admin || admin.password !== password) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        res.status(200).json({ message: "Login successful." });
    } catch (error) {
        res.status(500).json({ message: "Failed to login.", error: error.message });
    }
};
