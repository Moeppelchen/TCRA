/* Config */
const twitchTvHandle = "Replace_With_User-/Botname"; // Username / Botname
const oAuth = "oauth:Replace_With_Token"; // https://twitchtokengenerator.com/ <- Generation of an oAuth token only replace after `oath:`
const channelsToConnectTo = ["Replace_With_Channel"]; // Channel where the bot should listen | In case of multiple channels do: ["channel1", "channel2", ...]

const textColor = "";        // Set Text Color | Falls back to default if empty
const shadowColor1 = "";     // Set Shadow Color 1 | Falls back to default if empty
const shadowColor2 = "";     // Set Shadow Color 2 | Falls back to default if empty
const shadowColor3 = "";     // Set Shadow Color 3 | Falls back to default if empty
const shadowColor4 = "";     // Set Shadow Color 4 | Falls back to default if empty


/* Default Variables to fall back to [DO NOT TOUCH] */
var PAUSE_DURATION = 30 * 1000; // 30 seconds -- Pause Duration 
var DISPLAY_DURATION = 10 * 1000; // 10 seconds -- Default Duration if not configured in custom

/* DOM [DO NOT TOUCH] */
const  root = document.documentElement;
const container = document.querySelector(".alerts");
const img = new Image();
const queue = new Queue();

/* Custom Redemption Alerts */
var customRedeemAlerts = [
    {
    "name": "Replace_With_Redemption_Name", // Correct name of the redemption
    "text":  " Replace_With_Custom_Text", // Text to be displayed | For Redemptions with Text Input put #REPLACEWITHCONTENT# to input the user text to the Alert
    "gif": "Replace_With_Image_Or_Gif_Path", // Either a link or a file in the current folder | Example : https://media.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif
    "sound": "Replace_With_SoundFile_Name", // File in current folder | tested: .wav and .mp3
    "duration": 8, // Duration to show gif or image in seconds
    "volume": 1.0 //  Volume | Default : 1.0 | values between 0.0 and 1.0
  }
];

/* Custom Command Alerts */
var customCommandAlerts = [
  {
    "name": "Replace_With_Command_Name", // Name of the command
    "access": "4", // 0 broadcaster < 1 mod < 2 subscriber < 3 vip < 4 all
    "text": " Replace_With_Custom_Text", // Text to be displayed | For Redemptions with Text Input put #REPLACEWITHCONTENT# to input the user text to the Alert
    "gif": "Replace_With_Image_Or_Gif_Path", // Either a link or a file in the current folder | Example : test-pattern.jpeg
    "sound": "Replace_With_SoundFile_Name", // File in current folder | tested: .wav and .mp3
    "duration": 10, // Duration to show gif or image in seconds
    "cooldown": 60, // Cooldown in seconds | Default: 60 seconds
    "volume": 1.0 // Volume | Default : 1.0 | values between 0.0 and 1.0
  }
];

const wait = async duration => {
  return new Promise(resolve => setTimeout(resolve, duration));
};

ComfyJS.Init(twitchTvHandle, oAuth, channelsToConnectTo, true);

getColorsAndSet();

ComfyJS.onCommand = (user, command, message, flags, extra) => {
  console.log(`!${command} was typed in chat`);
  if(command == "pause") {
    if((flags.broadcaster || flags.mod)) {
      console.log(typeof message);
      if(!isNaN(message)) {
        let pauseTime = parseInt(message);
        queue.clear();
        PAUSE_DURATION = pauseTime * 1000;
        queue.pause(PAUSE_DURATION);
        console.log(`The AlertQueue has been paused for ${pauseTime} seconds`);
      } else {
        console.log("The correct usage to pause is: !pause {time in seconds}. The used input -> ${message} is not defined as a number. Please try again.");
      }
    } else {
      console.log(`!${user} didn't have the required rights to access the !pause command!`);
    }
  } else {
    for(var i = 0; i < customCommandAlerts.length; i++) {
      if(command == customCommandAlerts[i].name) {
        console.log(customCommandAlerts[i]);
        var access = customCommandAlerts[i].access;
        if(flags.broadcaster) {
          InitAlert(user, message, customCommandAlerts[i]);
        } else if(access == 4 || (flags.mod && access > 0) || (flags.subscriber && access > 1) || (flags.vip && access > 2)) {
          console.log(extra.sinceLastCommand.user);
          if(extra.sinceLastCommand.user == 0 || (extra.sinceLastCommand.user > (customCommandAlerts[i].cooldown * 1000)))  {
            InitAlert(user, message, customCommandAlerts[i]);
          }
        } else {
          console.log(`!${user} didn't have the required rights to access this command!`);
        }
        break;
      }
    }
  }
  console.log( user, command, message, flags, extra );
};


ComfyJS.onReward = ( user, reward, cost, extra ) => {
  for (var i = 0; i < customRedeemAlerts.length; i++) {
    if(reward == customRedeemAlerts[i].name) {
      InitAlert(user, extra, customRedeemAlerts[i]);
      break;
    }
  }
  console.log( user, reward, cost, extra );
}

// No use right now. Maybe some integration to greet vips, subscriber or whatever on first message?
ComfyJS.onChat = (user, message, flags, self, extra) => {
    console.log(user + ":", message, flags);
};

function InitAlert(user, msg, opts) {
  var sound = null; 
  if (opts.sound != "") {
    sound = new Audio(opts.sound);
  }
  content = opts.text.replace(/#([^#]+)#/g, msg);
  DISPLAY_DURATION = opts.duration * 1000;
  new gifAlert(user, opts.gif, sound, content, opts.volume);
}

function gifAlert(user, gif, audio, text, vol) {
  queue.add(async () => {
    if(audio) {
      audio.volume = vol;
      audio.play();
    }
    var content = user + text;
    content = content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    container.innerHTML = `
      <h1 class="text-shadows">${content}</h1>
      <img src="${gif}" />
    `;
    container.style.opacity = 1;
    await wait(DISPLAY_DURATION);
    if (!queue.isLooping) {
      getSoundAndFadeAudio(audio);
      container.style.opacity = 0;
    }
  });
}

function getSoundAndFadeAudio(audio) {
  if(audio) {
    var fadeAudio = setInterval(function () {
      // Only fade if not at zero already
      if ((audio.volume >= 0.1)) {
          audio.volume = audio.volume - 0.1;
      } else {
        clearInterval(fadeAudio);
        audio.pause();
      }
    }, 50);
  }
}

function getColorsAndSet() {
  if(textColor != "") {
    root.style.setProperty("--text", textColor);
  }
  if(shadowColor1 != "") {
    root.style.setProperty("--shadow-part1", shadowColor1);
  }
  if(shadowColor2 != "") {
    root.style.setProperty("--shadow-part2", shadowColor2);
  }
  if(shadowColor3 != "") {
    root.style.setProperty("--shadow-part3", shadowColor3);
  }
  if(shadowColor4 != "") {
    root.style.setProperty("--shadow-part4", shadowColor4);
  }
}