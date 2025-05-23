const {
    Sparky,
    commands,
    isPublic
} = require("../lib");
const {
    getBuffer
} = require("./pluginsCore");
const plugins = require("../lib");
const config = require("../config.js");
const font = require("@viper-x/fancytext");
const menust = config.MENU_FONT;
const style = font[menust];
const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);


Sparky({
    name: "menu",
    category: "misc",
    fromMe: isPublic,
    desc: "List all available commands"
}, async ({
    client,
    m,
    args
}) => {
    try {
        if (args) {
            for (let i of plugins.commands) {
                if (i.name.test(args)) {
                    return m.reply(style(`*command : ${args.trim()}*\n*description : ${i.desc.toLowerCase()}*`));
                }
            }
            return m.reply(style("_oops command not found_"))
        } else {
            let [date,
                time
            ] = new Date().toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata"
            }).split(",");
            let menu = `╭━━━〔${config.BOT_INFO.split(";")[0].toLowerCase()}〕━━>
┃╭━━━━━━━━━━━━━━◉
┃┃✈︎  𝚘𝚠𝚗𝚎𝚛: ${config.BOT_INFO.split(";")[1].toLowerCase()}
┃┃✈︎  𝚖𝚘𝚍𝚎: ${config.WORK_TYPE.toLowerCase()}
┃┃✈︎  𝚙𝚛𝚎𝚏𝚒𝚡 : ${m.prefix}
┃┃✈︎  𝚍𝚊𝚝𝚎 : ${date}
┃┃✈︎  𝚝𝚒𝚖𝚎 : ${time}
┃┃✈︎  𝚞𝚙𝚝𝚒𝚖𝚎 : ${await m.uptime()}
┃┃✈︎  𝚙𝚕𝚞𝚐𝚒𝚗𝚜 : ${commands.length}
┃╰━━━━━━━━━━━━━◉
╰━━━━━━━━━━━━━>\n ${readMore}\n\n`;
            
                        let cmnd = [];
                        let Sparky;
                        let type = [];
            
                        // Sorting commands based on category
                        commands.map((command, num) => {
                            if (command.name) {
                                let SparkyName = command.name;
                                Sparky = SparkyName.source.split('\\s*')[1].toString().match(/(\W*)([A-Za-züşiğ öç1234567890]*)/)[2];
                            }
                            if (command.dontAddCommandList || Sparky === undefined) return;
                            if (!command.dontAddCommandList && Sparky !== undefined) {
                                let category;
                                if (!command.category) {
                                    category = "misc";
                                } else {
                                    category = command.category.toLowerCase();
                                }
                                cmnd.push({
                                    Sparky,
                                    category: category
                                });
                                if (!type.includes(category)) type.push(category);
                            }
                        });
            
                        cmnd.sort();
                        type.sort().forEach((cmmd) => {
                            menu += `╭━━━>
┠┌─⭓『 *${cmmd.toUpperCase()}* 』\n`;
                            let comad = cmnd.filter(({ category }) => category == cmmd);
                            comad.sort();
                            comad.forEach(({ Sparky }) => {
                                menu += `┃│• ${Sparky.trim()}\n`;
                            });
                            menu += `┃└─⭓\n`;
                            menu += `╰━━━━>\n`;
                        });
            let sperky = {
                "key": {
                    "participants": "0@s.whatsapp.net",
                    "remoteJid": "status@broadcast",
                    "fromMe": false,
                    "id": "Hey!"
                },
                "message": {
                    "contactMessage": {
                        "displayName": `${config.BOT_INFO.split(";")[0]}`,
                        "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                    }
                },
                "participant": "0@s.whatsapp.net"
            }
         switch (config.MENU_TYPE.toLowerCase()) {
         case 'big': {
         return await client.sendMessage(m.jid, {
                    text: style(menu),
                    contextInfo: {
                        externalAdReply: {
                            title: style(`Hey ${m.pushName}!`),
                            body: style(`${config.BOT_INFO.split(";")[0]}`),
                            sourceUrl: "https://syam.fun",
                            mediaType: 1,
                            showAdAttribution: true,
                            renderLargerThumbnail: true,
                            thumbnailUrl: `${config.BOT_INFO.split(";")[2]}`
                        }
                    }
                 }, { quoted: m });
         break;
         }
         case 'image': {
         return await client.sendMessage(m.jid, { image: await getBuffer(config.BOT_INFO.split(";")[2]), caption: style(menu) }, { quoted: m });
         break;
         }
         case 'small': {
         return await client.sendMessage(m.jid, {
                    text: style(menu),
                    contextInfo: {
                        externalAdReply: {
                            title: style(`Hey ${m.pushName}!`),
                            body: style(`${config.BOT_INFO.split(";")[0]}`),
                            sourceUrl: "https://syam.fun",
                            mediaUrl: "https://syam.fun",
                            mediaType: 1,
                            showAdAttribution: true,
                            renderLargerThumbnail: false,
                            thumbnailUrl: `${config.BOT_INFO.split(";")[2]}`
                        }
                    }
                }, { quoted: sperky });
         break;
         }
         case 'document': {
         return await client.sendMessage(m.jid, {
                    document: {
                        url: 'syam.fun'
                    },
                    caption: menu,
                    mimetype: 'application/zip',
                    fileName: style(config.BOT_INFO.split(";")[0]),
                    fileLength: "99999999999",
                    contextInfo: {
                        externalAdReply: {
                            title: style(`Hey ${m.pushName}!`),
                            body: style(`${config.BOT_INFO.split(";")[0]}`),
                            sourceUrl: "sy4m.vercel.app",
                            mediaType: 1,
                            showAdAttribution: true,
                            renderLargerThumbnail: true,
                            thumbnailUrl: `${config.BOT_INFO.split(";")[2]}`
                        }
                    }
                }, {
                    quoted: sperky
                });
         break;
         }
         case 'text': {
        return await client.sendMessage(m.jid, {
                    text: style(menu)
                }, {
                    quoted: sperky
                });
         break;
         }
         case 'call': {
         return await client.relayMessage(m.jid, {
                    viewOnceMessage: {
                        message: {
                            messageContextInfo: {
                                deviceListMetadataVersion: 2,
                                deviceListMetadata: {},
                            },
                            scheduledCallCreationMessage: {
                                scheduledTimestampMs: Date.now(),
                                callType: 1,
                                title: style(menu)
                            }
                        }
                    }
                }, {
                    deviceId: "44"
                });
         break;
         }
         case 'payment': {
         return await client.relayMessage(m.jid, {
                    requestPaymentMessage: {
                        currencyCodeIso4217: 'INR',
                        amount1000: '99000',
                        requestFrom: m.sender.jid,
                        noteMessage: {
                            extendedTextMessage: {
                                text: style(menu)
                            }
                        },
                        expiryTimestamp: '0',
                        amount: {
                            value: '99000',
                            offset: 1000,
                            currencyCode: 'INR'
                        },
                    }
                }, {});
         break;
         }
         default: {
         console.log("Unsupported menu format!", config.MENU_TYPE);
         }
           }
        }
    } catch (e) {
        console.log(e);
    }
});
