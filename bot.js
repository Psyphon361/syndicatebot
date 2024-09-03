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

const message = process.env.MESSAGE;

// Log when the bot starts
console.log('Bot has been started...');

// Schedule the message to be sent to the PLS group at the specified interval
schedule.scheduleJob(plsInterval, function() {
    bot.sendMessage(plsChatid, message);
});

// Schedule the message to be sent to the BNB group at the specified interval
schedule.scheduleJob(bnbInterval, function() {
    bot.sendMessage(bnbChatid, message);
});