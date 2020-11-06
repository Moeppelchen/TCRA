const settings = {
    // User or Botname to use
    "user": "REPLACE",
    // Twitch Access Token
    // https://twitchtokengenerator.com/ | don't put "oauth"
    "oAuth": "REPLACE",
    // Channels the bot should listen to
    // In case of multiple channels do: ["channel1", "channel2", ...]
    "channels": ["REPLACE"],
    // Default text color settings if none defined in command or redemption settings
    // https://htmlcolorcodes.com/color-picker/
    "fontSettings": {
        // Font Families to load into cache on load to use in alerts
        // Default: ["Bungee", "Open Sans"]
        // https://fonts.google.com/
        "fontFamilies": ["Bungee", "Open Sans"],
        // Default text color
        // Falls back to default if not set
        // Example Color: black or #000000 or rgb(0, 0, 0)
        // https://htmlcolorcodes.com/color-picker/
        "textColor": "",
        // Default Shadow colors
        // Falls back to default if not set
        // Example Color: black or #000000 or rgb(0, 0, 0)
        // https://htmlcolorcodes.com/color-picker/
        "shadowColor1": "",
        "shadowColor2": "",
        "shadowColor3": "",
        "shadowColor4": "",
        // Default Text Outline Color and Width
        // Falls back to default if not set
        // Example Color: black or #000000 or rgb(0, 0, 0)
        // https://htmlcolorcodes.com/color-picker/
        "textOutlineColor": "",
        "textOutlineWidth": ""
    },
    // Default duration in seconds the !pause command stops the queue
    // Default: 30
    "durationPause": 30,
    // Default duration alerts are displayed if not defined in command or redemption settings
    // Default: 10
    "durationDisplay": 10
};
