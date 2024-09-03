import TelegramBot from 'node-telegram-bot-api';
import schedule from 'node-schedule';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Replace with your bot token
const token = process.env.TELEGRAM_BOT_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Define the group chat IDs and the message to be sent
const plsChatid = process.env.PLS_GROUP_CHAT_ID;
const bnbChatid = process.env.BNB_GROUP_CHAT_ID;
const plsInterval = process.env.PLS_TIME_INTERVAL;
const bnbInterval = process.env.BNB_TIME_INTERVAL;

// Image path or URL (You can use a local path or a URL)
const imagePath = './imgs/the_directorate.jpg'; // Local file path
const message = process.env.MESSAGE;

// Function to send a message with an image
function sendImageWithCaption(chatId) {
    bot.sendPhoto(chatId, imagePath, { caption: message }).catch(err => {
        console.error(`Failed to send image to chat ID ${chatId}:`, err);
    });
}

// Schedule the message with image to be sent to the PLS group at the specified interval
schedule.scheduleJob(plsInterval, function () {
    sendImageWithCaption(plsChatid);
});

// Schedule the message with image to be sent to the BNB group at the specified interval
schedule.scheduleJob(bnbInterval, function () {
    sendImageWithCaption(bnbChatid);
});

// Schedule the message with image to be sent to the test group at the specified interval
// schedule.scheduleJob(process.env.TEST_TIME_INTERVAL, function () {
//     sendImageWithCaption(process.env.TEST_GROUP_CHAT_ID);
// });