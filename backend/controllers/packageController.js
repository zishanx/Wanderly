import Package from "../models/Package.js"

export const newPackage = async (req, res) => {
    try {

        const { name, price, destination, things, images, duration, maxTraveler, availableDate } = req.body;

        const newPackage = await Package.create({ name, price, destination, things, images, duration, maxTraveler, availableDate })

        res.status(200).json(newPackage)

    } catch (error) {
        res.status(400).json({ message: error.message })

    }

}

export const getAll = async (req, res) => {
    try {
        const all = await Package.find()
        res.status(200).json(all)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }

}

export const getOne = async (req, res) => {
    try {

        const { id } = req.params

        const foundPackage = await Package.findById(id);

        res.status(200).json(foundPackage);

    } catch (err) {

        res.status(400).json({ message: err.message });
    }
}

export const updatePackage = async (req, res) => {
    try {

        const { id } = req.params

        const updated = await Package.findByIdAndUpdate(id, req.body, { new: true });

        res.status(200).json(updated)

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

export const deletePackage = async (req, res) => {
    try {
        const { id } = req.params
        await Package.findByIdAndDelete(id)
        res.status(200).json("Deleted")
    } catch (error) {

        res.status(400).json({ message: error.message })

    }
}