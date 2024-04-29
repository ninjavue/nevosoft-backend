const TELEGRAM_BOT = require('node-telegram-bot-api')
const Agent = require('socks5-https-client/lib/Agent')
// const User = require('../model/user')
const Order = require('../model/order')
const Type = require('../model/type')

const bot = new TELEGRAM_BOT(process.env.TOKEN, {polling:true})






module.exports.sendOrder = async (order) => {
   try {
    const types = await Type.findById(order.typeId)
    const sentMessage = await bot.sendMessage(process.env.CHANEL_ID, 
        `🛒 Buyurtma: #${order._id}
    
👤 Mijoz: ${order.name}
    
📞 Telefon: ${order.phone}
    
🗒 Malumot: ${order.description}
    
✍️ Murojat turi: ${types.name.uz}
    
        `)
    
    const messageId = sentMessage.message_id;
    await Order.findByIdAndUpdate(order._id, {messageId})
   } catch (error) {
    console.log(error.message)
   }
};


module.exports.editOrder = async (order) => {
    const types = await Type.findById(order.typeId)
 try {
        const messageId = order.messageId;
        const editedMessage = `

    🛒 *Buyurtma:* #${order._id}

👤 *Mijoz:* ${order.name}

📞 *Telefon:* ${order.phone}

🗒 *Malumot:* ${order.description}

✍️ *Murojat turi:* ${types.name.uz}



*Malumot tahrirlandi:* @CyberScr1be`;

        await bot.editMessageText(editedMessage, {
            chat_id: process.env.CHANEL_ID,
            message_id: messageId,
            parse_mode: 'Markdown'
        });

 } catch (error) {
    console.log(error.message)
 }
}

module.exports.deleteOrder = async (order) => {
    try {
        await bot.deleteMessage(process.env.CHANEL_ID, order.messageId); 
    } catch (error) {
        console.log(error.message)
    }
}