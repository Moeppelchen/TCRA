# TCRA aka TwitchCommandAndRedemptionAlert

TCRA is a Twitch overlay alert bot for custom commands and redemptions.

It's build on the [ComfyJS](https://github.com/instafluff/ComfyJS) (a wrapper around [tmi.js](https://github.com/tmijs/tmi.js))
and is based on the initial work of [bdougie's beybot](https://github.com/open-sauced/beybot).

## Installation

Unzip downloaded zip to a folder of your choice.
Edit settings.js to your likings.
Create commands in /cfg/alerts/commands.js based on the given Example.
Create redemptions in /cfg/alerts/redemptions.js based on the given Example.

Create a new 'Browser Source' in your streaming software and change the path to lead to the 'index.html'.


## Usage ./cfg/settings.js

```js
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
```

## Usage ./cfg/alerts/commands.js

```js
const customCommands = [
    {
        // Name of the command
        // example: "welcome"
        // used in chat with !welcome
        "name": "Replace_With_Command_Name",
        // Command access 
        // 0 broadcaster < 1 mod < 2 subscriber < 3 vip < 4 all
        "access": "4",
        // Text to be displayed
        // For Commands with custom text input use #REPLACEWITHCONTENT# 
        // where you want to have the user input to the Alert
        "text": " Replace_With_Custom_Text",
        // Either a link or a file in the current folder
        // Example online file: https://media.giphy.com/media/XD9o33QG9BoMis7iM4/source.gif
        // Example local file: test-pattern.jpeg
        // IMPORTANT: User Image files like jpg,jpeg,png or GIF
        "gif": "Replace_With_Image_Or_Gif_Path",
        // File in current folder
        // Example: horn.wav or Magic_Chime.mp3
        "sound": "Replace_With_SoundFile_Name",
        // Duration to display alert in seconds
        // Default: 10
        "duration": 10,
        // Cooldown to reuse the command in seconds
        // Default: 60
        // Only used for Commands right now
        "cooldown": 60,
        // Soundfile volume
        // Values between 1.0 and 0.0
        // Default: 1.0
        "volume": 1.0,
        // Custom font settings
        "fontSettings": {
            // Font family to use
            // see settings.js for Info
            // 0 = first entry, 1 = second entry, 2 = third entry, ...
            "fontFamily": 0,
            // Set text color
            // Leave empty to use default set in settings.js
            // Example Color: black or #000000 or rgb(0, 0, 0)
            // https://htmlcolorcodes.com/color-picker/
            "textColor": "",
            // Set Shadow Colors
            // Leave empty to use default set in settings.js
            // Example Color: black or #000000 or rgb(0, 0, 0)
            // https://htmlcolorcodes.com/color-picker/
            "shadowColor1": "",
            "shadowColor2": "",
            "shadowColor3": "",
            "shadowColor4": "",
            // Text Outline Color and Width
            // Leave empty to use default set in settings.js
            // Example Color: black or #000000 or rgb(0, 0, 0)
            // https://htmlcolorcodes.com/color-picker/
            // Example Width: 1px
            "textOutlineColor": "",
            "textOutlineWidth": ""
        }
    },
    // To add another command put a comma to the end of the last entry -> { ... }, -> then open the next entry -> { ... }
    {
        "name": "Replace_With_Command_Name",
        "access": "4",
        "text": " Replace_With_Custom_Text",
        "gif": "Replace_With_Image_Or_Gif_Path",
        "sound": "Replace_With_SoundFile_Name",
        "duration": 10,
        "cooldown": 60,
        "volume": 1.0,
        "fontSettings": {
            "fontFamily": 0,
            "textColor": "",
            "shadowColor1": "",
            "shadowColor2": "",
            "shadowColor3": "",
            "shadowColor4": "",
            "textOutlineColor": "",
            "textOutlineWidth": ""
        }
    } // Only put comma if another entry follows
]
```

## Usage ./cfg/alerts/redemptions.js

```js
const customRedemptions = [
    {
        // Name of the redemption
        // example: "welcome"
        // used in chat with !welcome
        "name": "Replace_With_Redemption_Name",
        // Text to be displayed
        // For redemptions with custom text input use #REPLACEWITHCONTENT#
        // where you want to have the user input to the Alert
        "text": " Replace_With_Custom_Text",
        // Either a link or a file in the current folder
        // Example online file: https://media.giphy.com/media/XD9o33QG9BoMis7iM4/source.gif
        // Example local file: test-pattern.jpeg
        // IMPORTANT: User Image files like jpg,jpeg,png or GIF
        "gif": "Replace_With_Image_Or_Gif_Path",
        // File in current folder
        // Example: horn.wav or Magic_Chime.mp3
        "sound": "Replace_With_SoundFile_Name",
        // Duration to display alert in seconds
        // Default: 10
        "duration": 10,
        // Soundfile volume
        // Values between 1.0 and 0.0
        // Default: 1.0
        "volume": 1.0,
        // Custom font settings
        "fontSettings": {
            // Font family to use
            // see settings.js for Info
            // 0 = first entry, 1 = second entry, 2 = third entry, ...
            "fontFamily": 0,
            // Set text color
            // Leave empty to use default set in settings.js
            // Example Color: black or #000000 or rgb(0, 0, 0)
            // https://htmlcolorcodes.com/color-picker/
            "textColor": "",
            // Set Shadow Colors
            // Leave empty to use default set in settings.js
            // Example Color: black or #000000 or rgb(0, 0, 0)
            // https://htmlcolorcodes.com/color-picker/
            "shadowColor1": "",
            "shadowColor2": "",
            "shadowColor3": "",
            "shadowColor4": "",
            // Text Outline Color and Width
            // Leave empty to use default set in settings.js
            // Example Color: black or #000000 or rgb(0, 0, 0)
            // https://htmlcolorcodes.com/color-picker/
            // Example Width: 1px
            "textOutlineColor": "",
            "textOutlineWidth": ""
        }
    },
    // To add another redemption put a comma to the end of the last entry -> { ... }, -> then open the next entry -> { ... }
    {
        "name": "Replace_With_Redemption_Name",
        "text": " Replace_With_Custom_Text",
        "gif": "Replace_With_Image_Or_Gif_Path",
        "sound": "Replace_With_SoundFile_Name",
        "duration": 10,
        "volume": 1.0,
        "fontSettings": {
            "fontFamily": 0,
            "textColor": "",
            "shadowColor1": "",
            "shadowColor2": "",
            "shadowColor3": "",
            "shadowColor4": "",
            "textOutlineColor": "",
            "textOutlineWidth": ""
        }
    } // Only put comma if another entry follows
]
```

## Testing in Browser

Just open the 'index.html' in a Browser after adjusting the settings and either use the channelpoints or commands in the defined channel
OR
open the Browser developer console and try
```js
// first var is text that is shown and second is one of the defined fonts
testAlert("TestText", 0);
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
MIT License

Copyright (c) 2020 MutualFun

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.