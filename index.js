// Sol's Stat Tracker Webhook Client
// Created by @mongoo.se
// Last edited 06/05/2025

const WebSocket = require('ws');
const { WebhookClient, Events, EmbedBuilder } = require('discord.js');

const { token, webhookURL, gatewayURL, maxReconnectInterval, overrideUsername, overrideAvatarURL, colors, emojis } = require('./config.json');

let reconnectInterval = 5_000;

const webhookClient = new WebhookClient({ // Use the webhook URL to login to the webhook client
    url: webhookURL
});

webhookClient.on(Events.Error, (error) => {
    console.error(`Webhook client error: ${error.message}`)
});

const connect = () => {
    const ws = new WebSocket(gatewayURL, { // Create a WS connetion
        headers: {
            token: token
        }
    });

    ws.on('open', () => {
        console.log(`WS client connected: ${gatewayURL}`);
        reconnectInterval = 5_000;

        setTimeout(() => {
            if (ws.readyState === ws.OPEN) {
                const connectedEmbed = new EmbedBuilder()
                    .setDescription(`${emojis.success} **Sol's Stat Tracker** - Connected`)
                    .setColor(colors.success);
    
                webhookClient.send({ embeds: [ connectedEmbed ] });
            }
        }, 1_000);
    });

    ws.on('message', (rawData) => {
        try {
            rawData = JSON.parse(rawData.toString('utf8')); // Read the JSON data from the buffer

            switch (rawData.action) {
                case 'enabled':
                    const enabledEmbed = new EmbedBuilder()
                        .setDescription(`${emojis.success} **Sol's Stat Tracker** - Enabled`)
                        .setColor(colors.success);

                    webhookClient.send({ embeds: [ enabledEmbed ] });
                    break;
                case 'disabled':
                    const disabledEmbed = new EmbedBuilder()
                        .setDescription(`${emojis.error} **Sol's Stat Tracker** - Disabled`)
                        .setColor(colors.error);

                    webhookClient.send({ embeds: [ disabledEmbed ] });
                    break;
                case 'executeWebhook':
                    rawData.data.username = overrideUsername ?? rawData.data.username; // Set overrides
                    rawData.data.avatarURL = overrideAvatarURL ?? rawData.data.avatarURL;
                    rawData.allowedMentions = { parse: [] }; // Under no circumstances should the webhook be able to send mentions clea

                    webhookClient.send(rawData.data); // Send the message payload
                    break;
                default:
                    console.error(`WS client invalid action: ${rawData.action}`);
                    break;
            }
        } catch (error) {
            console.error(`WS client message error: ${error.message}`);
        };
    });

    ws.on('close', async (code, reason) => {
        console.warn(`WS client disconnected: Code ${code}${reason ? ` - ${reason}` : ''}`);
        reason = reason.toString('utf8');

        switch (code) {
            case 1008:
                if (reason === 'Unauthorized') {
                    const unauthorizedEmbed = new EmbedBuilder()
                    .setTitle(`${emojis.error} Unauthorized`)
                        .setDescription(`The API token is invalid.`)
                        .setColor(colors.error);

                    await webhookClient.send({ embeds: [ unauthorizedEmbed ] });
                } else if (reason === 'Duplicate connection') {
                    const unauthorizedEmbed = new EmbedBuilder()
                        .setTitle(`${emojis.error} Duplicate Connection`)
                            .setDescription(`The API token is already in-use.`)
                            .setColor(colors.error);

                    await webhookClient.send({ embeds: [ unauthorizedEmbed ] });
                }

                break;
                
            case 1000:
                const deletedEmbed = new EmbedBuilder()
                .setTitle(`${emojis.error} Deleted`)
                    .setDescription(`The API token has been deleted.`)
                    .setColor(colors.error);

            await webhookClient.send({ embeds: [ deletedEmbed ] });
            break;

            default:
                console.log(`Reconnecting WS client in ${reconnectInterval}ms...`);
                setTimeout(connect, reconnectInterval);

                const reconnectingEmbed = new EmbedBuilder()
                    .setDescription(`${emojis.none} **Sol's Stat Tracker** - Reconnecting`)
                    .setColor(colors.none);
        
                await webhookClient.send({ embeds: [ reconnectingEmbed ] });

                reconnectInterval = Math.min(maxReconnectInterval, reconnectInterval * 2);
                break;
        }
    });

    ws.on('error', async (error) => {
        console.error(`WS client error: ${error.message}`);
        ws.terminate();
    });
};

connect();