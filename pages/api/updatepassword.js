import User from '../../models/user'
import connectDb from '../../middleware/mongoose'
import jsonwebtoken from 'jsonwebtoken'
var cryptoJs = require("crypto-js")

const handler = async (req, res) => {
    if (req.method === 'POST') {
        let token = req.body.token
        let user = jsonwebtoken.verify(token, 'abcdefg')
        let dbuser = await User.findOne({ email: user.email })
        const bytes = cryptoJs.AES.decrypt(dbuser.password, '123456789')
        let decryptedPass = bytes.toString(cryptoJs.enc.Utf8)
        if (decryptedPass == req.body.password && req.body.npassword == req.body.cpassword) {
            let dbuser = await User.findOneAndUpdate({ email: user.email }, { password: cryptoJs.AES.encrypt(req.body.cpassword, "123456789").toString() })
            res.status(200).json({ success: true })
            return
        }
        res.status(200).json({ success: false })
    } else {
        res.status(400).json({ error: "error" })

    }
}

export default connectDb(handler)