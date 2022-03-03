var system = {
    
}

function request_content(content) {
    if (content == 'SYS_PATH')  {
        return localStorage.getItem('SYSPATH') || {};
    }
}