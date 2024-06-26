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
const chatIds = process.env.GROUP_CHAT_IDS.split(',');
const message = process.env.MESSAGE;

// Log when the bot starts
console.log('Bot has been started...');

// // Schedule the message to be sent every 4 hours
// const job = schedule.scheduleJob('0 */4 * * *', function(){
//   chatIds.forEach(chatId => {
//     bot.sendMessage(chatId, message);
//   });
// });

// Schedule the message to be sent every 30 seconds
const job = schedule.scheduleJob(process.env.TIME_INTERVAL, function(){
  chatIds.forEach(chatId => {
    bot.sendMessage(chatId, message);
  });
});
