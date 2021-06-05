require('dotenv').config();
const { Telegraf } = require('telegraf');
const api = require('covid19-api');
const bot = new Telegraf(process.env.BOT_TOKEN);
const COUNTRIES_LIST = require('./constants');
/* bot.start((ctx) => ctx.reply(`Здравей ${ctx.message.from.first_name}!`)); */

bot.start((ctx) =>
    ctx.reply(
        `
Здравей ${ctx.message.from.first_name}!
Искаш да знаеш статистиката за коронавирус?
Въведи името на держава на АНГЛИЙСКИ и гледай.
Целият списък от държави да гледаш с команда /help.
`,
    )
);

bot.help((ctx) => ctx.reply(COUNTRIES_LIST));

bot.on('text', async (ctx) => {
    let data = {};

    try {
        data = await api.getReportsByCountries(ctx.message.text);

        const formatData = `
Держава: ${data[0][0].country}
Случаи: ${data[0][0].cases}
Умряли: ${data[0][0].deaths}
Оздравявали: ${data[0][0].recovered}
    `;
        ctx.reply(formatData);
    } catch {
        console.log('Грешка');
        ctx.reply('Грешно изписване!, провери /help');
    }
});

bot.launch();
console.log('Бот пуснат');
