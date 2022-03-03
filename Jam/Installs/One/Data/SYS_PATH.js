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
                app_resources: {
                    content_name: 'helpers',
                    apld: {
                        type: 'dll',
                        content_name: 'APP_LOAD',
                    },
                    jmMnFil: {
                        type: 'dll',
                    },
                    dg: {
                        type:'dll',
                        content_name: 'drag',
                    }
                },
                ld_resource: {
                    content_name: 'insert_scripts',
                },
                sys_Programs: {
                    content_name: 'Main',
                    explorer: {
                        content_name: '01',
                        explorer: {
                            type: 'exe',
                        }
                    },
                    app_adder: {
                        content_name: 'aa',
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
