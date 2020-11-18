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
            // 1 = first entry, 2 = second entry, 3 = third entry, ...
            "fontFamily": 1,
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
            // Default Text Outline Color and Width
            // Falls back to default if not set
            // Example Color: black or #000000 or rgb(0, 0, 0)
            // https://htmlcolorcodes.com/color-picker/
            "textOutlineColor": "",
            // Example Width: 0.75px | Default: 1px
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
