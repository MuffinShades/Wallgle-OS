let win_freeId = 0;

var iframeX = 0;
var iframeY = 0;

var winIndex = [];
var currentWinId = -1;

//taskbar

var taskbarApps = [];

function selectWin(id) {
    if (document.getElementById('win_'+id)) {
    winIndex = document.getElementById('win-con').children;
    console.log(winIndex);
    let indxa;
    for (let i = 0; i < winIndex.length; i++) {
        if (winIndex[i].id.toString().replace('win_', '') == id.toString()) {
            indxa = i;
            break;
        }
    }
    indxa = parseInt(indxa);
    console.log(indxa)
    console.log(winIndex);
    let t = [];
    for (let i = 0; i < winIndex.length; i++) {
        console.log(winIndex[i].id.toString().replace('win_',''))
        t[i] = winIndex[i].id.toString().replace('win_','');
    }
    winIndex = t;
    if (indxa) {
        currentWinId = id;
        let el = winIndex[indxa];
        winIndex.splice(indxa, 1);
        winIndex.splice(0, 0, el);
        for (let i = 0; i < winIndex.length; i++) {
            if (parseInt(winIndex[i].id) == id) {
                indxa = i;
                break;
            }
        }
    }
    console.log(winIndex);
    winIndex = winIndex.reverse()
    for (let i = winIndex.length-1; i >= 0; i--) {
        document.getElementById('win_'+winIndex[i]).style['z-index'] = i + 100;
    }
    } else {
        return;
    }
}

function active(a) {
    for (var i = 0; i < taskbarApps.length; i++) {
        if (taskbarApps[i].name == a) {
            taskbarApps[i].active = true;
            selectWin(taskbarApps[i].winId);
        } else {
            taskbarApps[i].active = false;
        }
    }
    displayTaskbar();
}

function displayTaskbar() {
    document.getElementById('run').innerHTML = '';
    for (var i = 0; i < taskbarApps.length; i++) {
        if (taskbarApps[i].active) {
            document.getElementById('run').innerHTML += `
        <div class='ac-bv' style='left: `+(48+(i*54))+`px;'>
            <img src='`+taskbarApps[i].img+`'>
        </div>
        `;
        } else {
            document.getElementById('run').innerHTML += `
        <div class='bv' style='left: `+(48+(i*54))+`px;' onclick='active("`+taskbarApps[i].name+`");'>
            <img src='`+taskbarApps[i].img+`'>
        </div>
        `;
        }
    }
}

function tskApp(name, active, id, img) {
    if (active == false) {
        for (let i = 0; i < taskbarApps.length; i++) {
            if (taskbarApps[i].name == name) {
                taskbarApps[i].active = false;
            }
        }
        taskbarApps.push({
            name: name,
            open: active,
            img: img,
            winId: id,
            rem: function() {
                for (let i = 0; i < taskbarApps.length; i++) {
                    if (taskbarApps[i].winId == id) {
                        taskbarApps.splice(i, 1);
                        displayTaskbar();
                        return;
                    }
                }
            },
        });
        displayTaskbar();
    } else if (active) {
        for (let i = 0; i < taskbarApps.length; i++) {
            if (taskbarApps[i].active && taskbarApps[i].name == name) {
                return;
            } else if (taskbarApps[i].name == name) {
                taskbarApps[i].active = true;
                displayTaskbar();
                return;
            }
        }
    } else {
        return;
    }
    displayTaskbar();
}

//

function win(x, y, w, h, src, title, icon, jsonData) {
        var win = `
    <div id='win_`+win_freeId+`' class='window' style='top:`+parseInt(y)+`; left:`+parseInt(x)+`; width: `+(parseInt(w))+`px; height: `+(parseInt(h)+32)+`px;' onmousedown='selectWin(`+win_freeId+`)'>
        <div class='options' onmousedown='win_dragStart(`+win_freeId+`)' style='width: 100%; height: 32px; position: relative: top: 0;'>
            <div class='btns'>
                <button class='close-btn' onclick='win_close(`+win_freeId+`)'>X</button>
            </div>
            <div class='title-container'>
                <div class='title'>
                    <img class='icon' src='`+icon+`'>
                    <p class='title-txt'>`+title+`</p>
                </div>
            </div>
        </div>
        <iframe src='`+src.toString()+`' style='border: none; position: absolute; top: calc(32px); height: calc(100% - 32px - 5px); width: calc(100% - 10px);' id='UI_`+win_freeId+`'></iframe>
        <div id='bg' style='border: none; position: absolute; top: calc(32px); height: calc(100% - 32px - 5px); width: calc(100% - 10px); z-index: -1; background-color: #fff;'></div>
        <!--<div id='content_`+win_freeId+`' class='cnt'></div>-->
        <div class='rezine-bars'>
            <div class='left-bar' onmousedown='re(2, `+win_freeId+`)' id='`+win_freeId+`r2'></div>
            <div class='right-bar' onmousedown='re(3, `+win_freeId+`)' id='`+win_freeId+`r3'></div>
            <div class='bottom-bar' onmousedown='re(1, `+win_freeId+`)' id='`+win_freeId+`r1'></div>
            <div class='top-bar' onmousedown='re(0, `+win_freeId+`)' id='`+win_freeId+`r0'></div>
            <div class='right-bottom-bar' onmousedown='re(6, `+win_freeId+`)' id='`+win_freeId+`r6'></div>
            <div class='left-bottom-bar' onmousedown='re(7, `+win_freeId+`)' id='`+win_freeId+`r7'></div>
            <div class='left-top-bar' onmousedown='re(4, `+win_freeId+`)' id='`+win_freeId+`r4'></div>
            <div class='right-top-bar' onmousedown='re(5, `+win_freeId+`)' id='`+win_freeId+`r5'></div>
        </div>  
    </div>
    `;


    //addition data
    if (jsonData) {
    }

    document.getElementById('win-con').innerHTML += win;

    //context menu btn

    let ccnt = true;
    for (let i = 0; i < taskbarApps.length; i++) {
        if (taskbarApps[i].name.toString() == title.toString()) {
            ccnt = false;
            break;
        }
    }
    if (ccnt) {
        tskApp(title, false, win_freeId, icon);
    }
    active(title); 
    selectWin(win_freeId);

    //insert system script
    let doc = document.getElementById('UI_'+win_freeId).document;

    if (doc) {
        let body = doc.body;
        let script = document.createElement('script');
        if (body && script) {
            script.src = '../../../../Data/Apps/insert_scripts/sys.js';
            body.appendChild(script);
        }
    }

    //update id
    win_freeId ++;
}

var minWidth = 128;
var minHeight = 32;

/*win(0, 0, 500, 500, 'https://www.wallgle.com', 'Wallgle');*/

//window drag
let drgLook = false;
let drag = false;
let targetWinId = -1;
let prog = false;
let _offX = 0;
let _offY = 0;

function win_dragStart(id) {
    drgLook = true;
    targetWinId = id;
    console.log('!')
    prog = true;
}

function win_close(id) {
    for (let i = 0; i < taskbarApps.length; i++) {
        if (taskbarApps[i].winId == id) {
            taskbarApps[i].rem();
            break;
        }
    }
    if (document.getElementById('win_'+id)) {
        document.getElementById('win_'+id).remove();
    }
}

mousemove.push(function(e) {
    if (drgLook == true) {
        drag = true;
    }
    if (prog && targetWinId > -1) {
        //set offests
        if (document.getElementById('win_'+targetWinId)) {
            _offY = parseInt(document.getElementById('win_'+targetWinId).style.top) - e.pageY;
            _offX = parseInt(document.getElementById('win_'+targetWinId).style.left) - e.pageX;
        } else {
            drag = false;
        }

        prog = false;
    }

    if (drag == true && targetWinId > -1) {
        if (document.getElementById('win_'+targetWinId)) {
            document.getElementById('win_'+targetWinId).style.top = (e.pageY + _offY)+ 'px';
            document.getElementById('win_'+targetWinId).style.left = (e.pageX + _offX) + 'px';
        } else {
            drag = false;
        }
    }
});

mouseup.push(function(e) {
    if (drag == true) {
        drag = false;
        targetWinId = -1;
    }
});

//resize
let rezDir = -1;
let rz = false;
let rezId = -1;

let side = -1;
let srt = false;

var movs = [[0, -1, 0, 1], [0, 0, 0, 1]];

var modes = [['top', 1], ['top', -1], 'left', 'left'];

function re(dir, id) {
    console.log('!')
    rezDir = dir;
    rz = true;
    rezId = id;
    srt = true;
}

var sd1 = -1;
var sd2 = -1;

var orgW = -1;
var orgH = -1;
var orgX = -1;
var orgY = -1;

mousemove.push(function(e) {
    if (rz && srt) {
        orgH = document.getElementById(rezId+'r'+rezDir).style.height;
            orgW = document.getElementById(rezId+'r'+rezDir).style.width;
            orgX = document.getElementById(rezId+'r'+rezDir).style.left;
            orgY = document.getElementById(rezId+'r'+rezDir).style.right;
            document.getElementById(rezId+'r'+rezDir).style.width = document.documentElement.clientWidth + 'px';
            document.getElementById(rezId+'r'+rezDir).style.height = document.documentElement.clientHeight + 'px';
            document.getElementById(rezId+'r'+rezDir).style.top = '0px';
            document.getElementById(rezId+'r'+rezDir).style.left = '0px';
            document.getElementById(rezId+'r'+rezDir).style['z-index'] = '1000000';
    }
    if (rz && rezDir <= 3) {
        let tg = document.getElementById('win_'+rezId);
        if (srt) {
            if (rezDir == 0) {
                side = parseInt(tg.style.top) + parseInt(tg.style.height);
            } else if (rezDir == 1) {
                side = parseInt(tg.style.top);
            } else if (rezDir == 2) {
                side = parseInt(tg.style.left) + parseInt(tg.style.width);
            } else if (rezDir == 3) {
                side = parseInt(tg.style.left);
            }
            srt = false;
        }
        if (side >= 0) {
            //if (Math.abs(side - e.pageY) > minHeight && Math.abs(side - e.pageX) > minWidth) {
                if ((e.pageY > side && rezDir == 1) || (e.pageY < side && rezDir == 0) || (e.pageX < side && rezDir == 2) || (e.pageX > side && rezDir == 3)) {
                if (rezDir == 0) {
                    tg.style.height = Math.abs(side - e.pageY) + 'px';
                    tg.style.top = (e.pageY)+'px';
                }
                if (rezDir == 1) {
                    tg.style.height = Math.abs(side - e.pageY) + 'px';
                }
                if (rezDir == 2) {
                    tg.style.width = Math.abs(side - e.pageX) + 'px';
                    tg.style.left = (e.pageX)+'px';
                }
                if (rezDir == 3) {
                    tg.style.width = Math.abs(side - e.pageX) + 'px';
                }
            }
            //}
        }
    } else if (rezDir > 3) {
        let tg = document.getElementById('win_'+rezId);
        if (srt) {
            if (rezDir == 4) {
                sd1 = parseInt(tg.style.top) + parseInt(tg.style.height);
                sd2 = parseInt(tg.style.left) + parseInt(tg.style.width);
            } else if (rezDir == 5) {
                sd1 = parseInt(tg.style.top) + parseInt(tg.style.height);
                sd2 = parseInt(tg.style.left);
            } else if (rezDir == 6) {
                sd1 = parseInt(tg.style.top);
                sd2 = parseInt(tg.style.left);
            } else if (rezDir == 7) {
                sd1 = parseInt(tg.style.top);
                sd2 = parseInt(tg.style.left) + parseInt(tg.style.width);
            }
            srt = false;
        }
        if (rezDir == 4) {
            if (e.pageY + minHeight < sd1) {
                tg.style.height = Math.abs(sd1- e.pageY) + 'px';
                tg.style.top = (e.pageY)+'px';
            }
            if (e.pageX + minWidth < sd2) {
                tg.style.width = Math.abs(sd2 - e.pageX) + 'px';
                tg.style.left = (e.pageX)+'px';
            }
        } else if (rezDir == 5) {
            if (e.pageY + minHeight < sd1) {
                tg.style.height = Math.abs(sd1- e.pageY) + 'px';
                tg.style.top = (e.pageY)+'px';
            }
            if (e.pageX - minWidth > sd2) {
                tg.style.width = Math.abs(sd2 - e.pageX) + 'px';
            }
        } else if (rezDir == 6) {
            if (e.pageY - minHeight > sd1) {
                tg.style.height = Math.abs(sd1- e.pageY) + 'px';
            }
            if (e.pageX - minWidth > sd2) {
                tg.style.width = Math.abs(sd2 - e.pageX) + 'px';
            }
        } else if (rezDir == 7) {
            if (e.pageY - minHeight > sd1) {
                tg.style.height = Math.abs(sd1- e.pageY) + 'px';
            }
            if (e.pageX + minWidth < sd2) {
                tg.style.width = Math.abs(sd2 - e.pageX) + 'px';
                tg.style.left = (e.pageX)+'px';
            }
        }
    }
});

mouseup.push(function(e) {
    if (rz) {
        document.getElementById(rezId+'r'+rezDir).style.height = orgH;
        document.getElementById(rezId+'r'+rezDir).style.width = orgW;
        document.getElementById(rezId+'r'+rezDir).style.left = orgX;
        document.getElementById(rezId+'r'+rezDir).style.top = orgY;
        rezDir = -1;
        rz = false;
        rezId = -1;

        side = -1;
        srt = false;
        rz = false;
    }
});