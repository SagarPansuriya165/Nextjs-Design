import Order from '../../models/order'
import connectDb from '../../middleware/mongoose'

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let order = new Order({
            email: req.body.email,
            orderId: req.body.oid,
            address: req.body.address,
            city: req.body.city,
            pincode: req.body.pincode,
            name: req.body.name,
            phone: req.body.phone,
            amount: req.body.subTotal,
            products: req.body.cart
        })
        await order.save()
        res.status(200).json({ success: "success", data: order })
    } else {
        res.status(400).json({ error: "This method is not allowed" })
    }
}
export default connectDb(handler)
