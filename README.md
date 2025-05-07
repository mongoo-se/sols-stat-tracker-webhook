# Sol's Stat Tracker Webhook
Connect to Sol's Stat Tracker to post stats found through a Discord webhook.

## Setup
1. Install Sol's Stat Tracker Webhook
2. Open the `config.json` file in Sol's Stat Tracker Webhook
3. Using the Sol's Stat Tracker Discord bot, execute the `/generatetoken` command to generate an API token.
4. In the `config.json` file, place the API token in the token field.

Example:
```json
{
    "token": "0123456789ABCDEFabcdef0123456789ABCDEFabcdef0123456789ABCDEFabcdef01234567",
    "webhookURL": "PLACE THE WEBHOOK URL HERE",

    "gatewayURL": "wss://api.mongoosee.com/solsstattracker/v1/gateway",

    "maxReconnectInterval": 30000,

    "overrideUsername": null,
    "overrideAvatarURL": null,

    "colors": {
        "success": "#6ab183",
        "error": "#d85a4b",
        "none": "#777f8d"
    },

    "emojis": {
        "success": "<:green_tick:1365702693326422026>",
        "error": "<:red_tick:1365702694727188491>",
        "none": "<:gray_tick:1365702690985738390>"
    }
}
```
5. Create a Discord webhook, and copy the webhook URL.
4. In the `config.json` file, place the webook URL in the webhookURL field.

Example:
```json
{
    "token": "0123456789ABCDEFabcdef0123456789ABCDEFabcdef0123456789ABCDEFabcdef01234567",
    "webhookURL": "https://discord.com/api/webhooks/123456789012345678/AbCdEfGhIjKlMnOpQrStUvWxYz0123456789abcdef",

    "gatewayURL": "wss://api.mongoosee.com/solsstattracker/v1/gateway",

    "maxReconnectInterval": 30000,

    "overrideUsername": null,
    "overrideAvatarURL": null,

    "colors": {
        "success": "#6ab183",
        "error": "#d85a4b",
        "none": "#777f8d"
    },

    "emojis": {
        "success": "<:green_tick:1365702693326422026>",
        "error": "<:red_tick:1365702694727188491>",
        "none": "<:gray_tick:1365702690985738390>"
    }
}
```


6. Download [Node.js](https://nodejs.org/en)
7. In Sol's Stat Tracker Webhook open the `setup.bat` file to install the dependencies.
8. In Sol's Stat Tracker Webhook open the `run.bat` file.
