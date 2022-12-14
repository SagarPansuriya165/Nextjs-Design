import Order from "../../models/order"
import connectDb from "../../middleware/mongoose"
import jsonwebtoken from "jsonwebtoken"

const handler = async (req, res) => {
    const token = req.body.token
    const data = jsonwebtoken.verify(token, "abcdefg");
    let orders = await Order.find({ email: data.email, status: 'paid' })
    res.status(200).json({ orders })
}

export default connectDb(handler);

