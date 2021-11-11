let installFolder = '../../../../';

var mnfil = document.createElement('script');
mnfil.src = installFolder+'Data/Apps/helpers/jmMnFil.js';
document.body.appendChild(mnfil);

var md = document.createElement('script');
md.src = installFolder+'Data/Drivers/Mouse.js';
document.body.appendChild(md);

var desktopp = document.createElement('script');
desktopp.src = installFolder+'Data/Desktop/jmdsk.js';
document.body.appendChild(desktopp);

var appLoader = document.createElement('script');
appLoader.src = installFolder+'Data/Apps/helpers/APP_LOAD.js';
document.body.appendChild(appLoader);

appLoader.onload = function() {
    mde = 1;
}

function add() {
    let name = '../../Apps/'+document.getElementById('app-name-box').value;

    console.log(name);

    let fscript = document.createElement('script');
    fscript.src = installFolder + name + '/info.js';
    document.body.appendChild(fscript);

    fscript.onload = function(e) {setTimeout(function() {
        let can = true;
        for (let i = 0; i < CUSTOM_FILES.length; i++) {
            console.log(CUSTOM_FILES[i].name+'   '+appName)
            if (CUSTOM_FILES[i].name.toString().toLowerCase() == appName.toString().toLowerCase()) {
                can = false;
            }
        }
        if (can == true) {
            exportApp({
                name: appName,
                src: '../'+name,
                img: appIcon,
                file: appHTML,
                openHeigh: appOpenHeight,
                openWidth: appOpenWidth,
                windowType: appWindowType,
            });
        }

        fscript.remove();
    })}
}
var cdd = JSON.parse(localStorage.getItem('newData'));
let posS = false;
md.onload = function() {
    posS = true;
}
var cint = parseInt(localStorage.getItem('newDataInt'));


setInterval(function() {
    if (posS && JSON.parse(localStorage.getItem('newData')) && cdd && cint != parseInt(localStorage.getItem('newDataInt'))) {
        CUSTOM_FILES.push(JSON.parse(localStorage.getItem('newData')));
        console.log(JSON.parse(localStorage.getItem('newData')));
        cdd = JSON.parse(localStorage.getItem('newData'));
        cint = parseInt(localStorage.getItem('newDataInt'));
    }
})