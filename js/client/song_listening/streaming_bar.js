function buttonStyle(){
    // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
    isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    // Firefox 1.0+
    isFirefox = typeof InstallTrigger !== 'undefined';
    // Safari 3.0+
    isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
    // Internet Explorer 6-11
    isIE = /*@cc_on!@*/false || !!document.documentMode;
    // Edge 20+
    isEdge = !isIE && !!window.StyleMedia;
    // Chrome 1+
    isChrome = !!window.chrome && !!window.chrome.webstore;
    // Blink engine detection
    isBlink = (isChrome || isOpera) && !!window.CSS;

    if(isFirefox){
        $('#prev_song').attr('class', 'firefox_button');
        $('#next_song').attr('class', 'firefox_button');
    }

    if(isChrome){
        $('#prev_song').attr('class', 'chrome_button');
        $('#next_song').attr('class', 'chrome_button');
        $('#prev_song_imgID').attr('src', './images/audio_buttons/previous_black.png');
        $('#next_song_imgID').attr('src', './images/audio_buttons/next_black.png');
    }

    if(isEdge){
        $('#prev_song').attr('class', 'edge_button');
        $('#next_song').attr('class', 'edge_button');
        $('#prev_song_imgID').attr('src', './images/audio_buttons/previous.png');
        $('#next_song_imgID').attr('src', './images/audio_buttons/next.png');
        $('#streaming_section').attr('class', 'edge_streaming_section');
        
    }
}

$(document).ready(buttonStyle);