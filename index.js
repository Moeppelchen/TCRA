/* CONFIG SETUP [DO NOT TOUCH]*/
const twitchTvHandle = settings.user; // Username / Botname
const oAuth = "oauth:" + settings.oAuth; // oAuth Token
const channelsToConnectTo = settings.channels; // Channels where the bot should listen

const textColor = settings.fontSettings.textColor;           // Sets default Text Color | Falls back to default if empty
const shadowColor1 = settings.fontSettings.shadowColor1;     // Sets default Shadow Color 1 | Falls back to default if empty
const shadowColor2 = settings.fontSettings.shadowColor2;     // Sets default Shadow Color 2 | Falls back to default if empty
const shadowColor3 = settings.fontSettings.shadowColor3;     // Sets default Shadow Color 3 | Falls back to default if empty
const shadowColor4 = settings.fontSettings.shadowColor4;     // Sets default Shadow Color 4 | Falls back to default if empty
const textOutlineColor = settings.fontSettings.textOutlineColor;
const textOutlineWidth = settings.fontSettings.textOutlineWidth;

const fontFamilies = settings.fontSettings.fontFamilies; // Sets default font families to load into cache
const defaultFontFamily = settings.fontSettings.defaultFontFamily;

var PAUSE_DURATION = settings.durationPause * 1000; // Default pause duration
var DISPLAY_DURATION = settings.durationDisplay * 1000; //Default showing duration

const customRedeemAlerts = customRedemptions;

const customCommandAlerts = customCommands;

/* DOM [DO NOT TOUCH]*/
const root = document.documentElement;
const container = document.querySelector(".alerts");
const img = new Image();
const queue = new Queue();

const wait = async duration => {
  return new Promise(resolve => setTimeout(resolve, duration));
};

ComfyJS.Init(twitchTvHandle, oAuth, channelsToConnectTo, true);

//SetFontSettings(settings.fontSettings);

WebFont.load({
  google: {
    families: fontFamilies
  }
});

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
          //SetFontSettings(customCommandAlerts[i].fontSettings);
          InitAlert(user, message, customCommandAlerts[i]);
        } else if(access == 4 || (flags.mod && access > 0) || (flags.subscriber && access > 1) || (flags.vip && access > 2)) {
          console.log(extra.sinceLastCommand.user);
          if(extra.sinceLastCommand.user == 0 || (extra.sinceLastCommand.user > (customCommandAlerts[i].cooldown * 1000)))  {
            //SetFontSettings(customCommandAlerts[i].fontSettings);
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
      //SetFontSettings(customRedeemAlerts[i].fontSettings);
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
  new gifAlert(user, opts.gif, sound, content, opts.volume, opts.fontSettings);
}

function gifAlert(user, gif, audio, text, vol, font) {
  var animation = "neon";
  queue.add(async () => {
    if(audio) {
      audio.volume = vol;
      audio.play();
    }
    SetFontSettings(font);
    var content = "<br><br>";
    if(text != "") {
      content = user + text;
      content = content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    container.innerHTML = `
      <h1 class="text-${animation}">${content}</h1>
      <img src="${gif}" />
    `;
    container.style.opacity = 1;
    await wait(DISPLAY_DURATION);
    if (!queue.isLooping) {
      if(audio) {
        getSoundAndFadeAudio(audio);
      }
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

function SetFontSettings(opts) {
  console.log(opts);
  /*if(opts.fontFamilies) {
    console.log(opts.fontFamilies);
    opts['fontFamily'] = opts.fontFamilies[defaultFontFamily];
  }*/
  if(opts.fontFamily != "") {
    root.style.setProperty("--fontFamily", fontFamilies[(opts.fontFamily-1)]);
  } else {
    root.style.setProperty("--fontFamily", fontFamilies[defaultFontFamily]);
  }
  if(opts.textColor != "") {
    root.style.setProperty("--text", opts.textColor);
  } else {
    root.style.setProperty("--text", textColor);
  }
  if(opts.shadowColor1 != "") {
    root.style.setProperty("--shadow-part1", opts.shadowColor1);
  } else {
    root.style.setProperty("--shadow-part1", shadowColor1);
  }
  if(opts.shadowColor2 != "") {
    root.style.setProperty("--shadow-part2", opts.shadowColor2);
  } else {
    root.style.setProperty("--shadow-part2", shadowColor2);
  }
  if(opts.shadowColor3 != "") {
    root.style.setProperty("--shadow-part3", opts.shadowColor3);
  } else {
    root.style.setProperty("--shadow-part3", shadowColor3);
  }
  if(opts.shadowColor4 != "") {
    root.style.setProperty("--shadow-part4", opts.shadowColor4);
  } else {
    root.style.setProperty("--shadow-part4", shadowColor4);
  }
  if(opts.textOutlineColor != "") {
    root.style.setProperty("--textOutlineColor", opts.textOutlineColor);
  }else {
    root.style.setProperty("--textOutlineColor", textOutlineColor);
  }
  if(opts.textOutlineWidth != "") {
    root.style.setProperty("--textOutlineWidth", opts.textOutlineWidth);
  }else {
    root.style.setProperty("--textOutlineWidth", textOutlineWidth);
  }
}

function testAlert(text = "", font = defaultFontFamily) {
  const testAlert = {
    "name": "Test",
    "access": 0,
    "text":  " is trying the Alert: #REPLACEWITHCONTENT#",
    "gif": "https://media.giphy.com/media/MgBJ3UifivIY/source.gif",
    "sound": "horn.wav",
    "duration": 5,
    "cooldown": 60,
    "volume": 0.5,
    "fontSettings": {
      "fontFamily": font,
      "textColor": "#2fed43",
      "shadowColor1": "#2cd43d",
      "shadowColor2": "#21b030",
      "shadowColor3": "#1a9627",
      "shadowColor4": "#127a1d",
      "textOutlineColor": "black",
      "textOutlineWidth": "1px"
    }
  }
  //SetFontSettings(testAlert.fontSettings);
  InitAlert("An ordinary turtle", text, testAlert);
}
