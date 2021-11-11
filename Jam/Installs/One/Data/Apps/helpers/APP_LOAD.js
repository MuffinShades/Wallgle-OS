var freeId = 0;

console.log('!@')

var mx = 0;
var my = 0;

var mde = 0;

var appIDS = [];

function saveApps() {
    localStorage.setItem('cstmFiles', JSON.stringify(CUSTOM_FILES));
}

function setKid() {
    if (mde == 0) {
        let df = [];
        for (let i = 0; i < document.getElementById('app-box').children.length; i++) {
            df.push(document.getElementById('app-box').children[i].id.toString().replace('win_',''));
        }
        localStorage.setItem('app-box-kids',JSON.stringify(df));
    }
}

//window.onload = function(e) {
    if (desktop && mde == 0) {desktop.onload = function(apps) {if (mde==0) {
        console.log('Loading App...')
        for (let i = 0; i < apps.length; i++) {
            let app_HTML = `<div id='app_`+freeId+`' class='app' onmousedown='dragStart(`+freeId+`)' style='top: `+((freeId*82) + 5)+`px; left: 5px;' ondblclick="win(0, 0, 500, 500, '`+(`../Data/Apps/`+apps[i].src+`/`+apps[i].file)+`', '`+apps[i].name.toString()+`', '`+apps[i].img.toString()+`')" onmouseenter='ctxEnter(`+freeId+`)' onmouseleave='ctxLeave(`+freeId+`)'>
                <center>
                    <img class='img' src='`+(`../Data/Apps/`+apps[i].src+`/`+apps[i].img)+`' height='71'>
                    <div class='name' width='73px'>`+apps[i].name+`</div>
                </center>
            </div>`;

            if (document.getElementById('app-box')) {
                document.getElementById('app-box').innerHTML += app_HTML;
            } else {
                localStorage.setItem('EXPORTED_APP', app_HTML);
                localStorage.setItem('export', true);
            }

            freeId ++;
        }
        if (mde == 0) {
            setKid();
        }
    }}}
//}
console.log('&!@')
function exportApp(d) {
    console.log('&!(@*#')
    let apps = [];
    apps.push(d);
    console.log(d)
    let i =0;
    let pa = JSON.parse(localStorage.getItem('app-box-kids'));
    console.log(pa)
    for (let i = 0; i < pa.length; i++) {
        if (pa[i].toString().replace('app_', '') == freeId.toString()) {
            freeId++;
            i=0;
        }
    }
    //if (cna) {
        let app_dt = `<div id='app_`+freeId+`' class='app' onmousedown='dragStart(`+freeId+`)' style='top: `+((freeId*82) + 5)+`px; left: 5px;' ondblclick="win(0, 0, 500, 500, '`+(apps[i].src+`/`+apps[i].file)+`', '`+apps[i].name.toString()+`', '`+apps[i].img.toString()+`')">
            <center>
                <img class='img' src='`+(apps[i].src+`/`+apps[i].img)+`' height='71'>
                <div class='name' width='73px'>`+apps[i].name+`</div>
            </center>
        </div>`;
        let exdta = JSON.stringify(d);
        localStorage.setItem('EXPORTED_APP',app_dt);
        localStorage.setItem('exportData', exdta);
        localStorage.setItem('export', true);
    //}
}
mousemove.push(function(e) {
    mx=e.pageX;
    my=e.pageY;
});

var curDat = JSON.parse(localStorage.getItem('newData'));
var curInt = localStorage.getItem('newDataInt');

//listener
setInterval(function() {

    //listen for app  add
    if (mde == 0) {
        if (localStorage.getItem('export') != null && localStorage.getItem('export').toString() == 'true') {
            let jsonData = localStorage.getItem('exportData');
            localStorage.setItem('newData', null);
            localStorage.setItem('newData', jsonData);
            localStorage.setItem('newDataInt', parseInt(localStorage.getItem('newDataInt')) + 1);
            document.getElementById('app-box').innerHTML += localStorage.getItem('EXPORTED_APP');
            localStorage.setItem('EXPORTED_APP', null);
            localStorage.setItem('exportData', null);
            localStorage.setItem('export', false);
            setKid();
        }
    }

    if (/*JSON.parse(localStorage.getItem('newData')) != curDat &&*/ mde == 0 && parseInt(localStorage.getItem('newDataInt')) != curInt) {
        CUSTOM_FILES.push(JSON.parse(localStorage.getItem('newData')));
        curDat = JSON.parse(localStorage.getItem('newData'));
        curInt = parseInt(localStorage.getItem('newDataInt'));
        setKid();
    }
});

if (mde == 0) {
    localStorage.setItem('newDataInt', 0);
}
