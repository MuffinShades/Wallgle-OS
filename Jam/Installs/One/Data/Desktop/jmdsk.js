var desktop = {
    onload: function(a) {},
    apps: [],
}

for (let i = 0; i < MAIN_FILES.length; i++) {
    desktop.apps.push(MAIN_FILES[i]);
}

for (let i = 0; i < CUSTOM_FILES.length; i++) {
    desktop.apps.push(CUSTOM_FILES[i]);
}

setTimeout(function() {
    desktop.onload(desktop.apps);
},1000);

document.body.focus();