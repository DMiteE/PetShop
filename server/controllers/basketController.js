const { Device, BasketDevice, Basket } = require("../models/models")

class BasketController {
    // ------ CRUD корзины ------ //

    async addToBasket(req,res,next){
        const user = req.user
        const {deviceId} = req.body
        const basket = await BasketDevice.create({basketId : user.id, deviceId : deviceId})
        return res.json(basket)
    }

    async getBasketUser(req,res){
        const {id} = req.user
        const basket = await BasketDevice.findAll({include: {
                model: Device
            }, where: {basketId: id}})

        return res.json(basket)
    }

    async deleteBasket (req, res) {
        const {id} = req.body
        if(!id) res.status(400).json('None Id')
            await BasketDevice.destroy({where: {id: id}})
        res.status(200).json('Product deleted')
    }

    async delToBasket(req,res,next){
        const {deviceId} = req.body
        const basket = await BasketDevice.destroy({ eviceId : deviceId})
        return res.json(basket)
    }

}

module.exports = new BasketController()