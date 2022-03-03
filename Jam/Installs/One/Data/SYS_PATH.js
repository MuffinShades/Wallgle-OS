var path = {
    ROOT: {
        Jam: {
            content_name: 'Core',
            Personalize: {
                Backgrounds: {
                    bgg: {
                        type: 'png',
                    },
                    snfl: {
                        type: 'png'
                    }
                },
            },
            all: {
                type: 'exe',
                display_name: 'system',
            }
        },
        System: {
            content_name: 'Data',
            Program_Files: {
                content_name: 'Apps',
                sys_resources: {
                    content_name: 'helpers',
                    apld: {
                        type: 'dll',
                        content_name: 'APP_LOAD',
                    },
                    jmMnFil: {
                        type: 'dll',
                    }
                }
            }
        }
    },
    About: {
        Credits: {
            fileType: 'txt',
        }
    }
}
