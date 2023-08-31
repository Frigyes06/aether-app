const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
    'electronAPI', {
        RouteTo: (callback: any) => {
            ipcRenderer.on('RouteTo', callback)
        },
        FullscreenState: (callback: any) => {
            ipcRenderer.on('FullscreenState', callback)
        },
        NewUpdateReady: (callback: any) => {
            ipcRenderer.on('NewUpdateReady', callback)
        },
        QuitApp: () => {
            ipcRenderer.send('QuitApp')
        },
        SetFrontendReady: (val: boolean) => {
            ipcRenderer.send('SetFrontendReady', val)
        },
        SetFrontendAPIPort: (val: number) => {
            ipcRenderer.send('SetFrontendAPIPort', val)
        },
        GetFrontendAPIPort: () => {
            ipcRenderer.invoke('GetFrontendAPIPort')
        },
        GetClientAPIServerPort: () => {
            ipcRenderer.invoke('GetClientAPIServerPort')
        },
        SetFrontendClientConnInitialised: (val: boolean) => {
            ipcRenderer.send('SetFrontendClientConnInitialised', val)
        },
        GetFrontendClientConnInitialised: () => {
            ipcRenderer.invoke('GetFrontendClientConnInitialised')
        },
        RestartToUpdateTheApp: () => {
            ipcRenderer.send('RestartToUpdateTheApp')
        },
        FocusAndShow: () => {
            ipcRenderer.send('FocusAndShow')
        },
        DisableExternalResourceAutoLoad: () => {
            ipcRenderer.send('DisableExternalResourceAutoLoad')
        },
        EnableExternalResourceAutoLoad: () => {
            ipcRenderer.send('EnableExternalResourceAutoLoad')
        },
        RegisterIPC: () => {
            require('./services/eipc/eipc-renderer') // Register IPC events
        },
        load_isDev: () => {return require('electron-is-dev')},
        load_ipcRenderer: () => {
            const {ipcRenderer} = require('../../node_modules/electron')
            return ipcRenderer
        },
        load_clapiserver: () => {return require('./services/clapiserver/clapiserver')},
        load_feapiconsumer: () => {return require('./services/feapiconsumer/feapiconsumer')},
        load_globalMethods: () => {return require('./services/globals/methods')},
        load_Vue: (isDev: boolean) => {
            if (isDev)  {
                var Vue = require('../../node_modules/vue/dist/vue.js') // Dev
                Vue.config.devtools = true
                return Vue
            } else {
                return require('../../node_modules/vue/dist/vue.min.js') // Production
            }
            const {ipcRenderer} = require('../../node_modules/electron')
            return ipcRenderer
        },
        load_VueRouter: () => {return require('../../node_modules/vue-router').default},
        load_Icon: () => {return require('../../node_modules/vue-awesome')},
        load_ClickOutside: () => {return require('../../node_modules/v-click-outside')},
        load_Mousetrap: () => {return require('../../node_modules/mousetrap')},
        load_Spinner: () => {return require('../../node_modules/vue-simple-spinner')},

        load_a_app: () => {return require('./components/a-app.vue').default},
        load_a_header: () => {return require('./components/a-header.vue').default},
        load_a_header_icon: () => {return require('./components/a-header-icon.vue').default},
        load_a_sidebar: () => {return require('./components/a-sidebar.vue').default},
        load_a_boardheader: () => {return require('./components/a-boardheader.vue').default},
        load_a_tabs: () => {return require('./components/a-tabs.vue').default},
        load_a_thread_listitem: () => {return require('./components/listitems/a-thread-listitem.vue').default},
        load_a_vote_action: () => {return require('./components/a-vote-action.vue').default},
        load_a_thread_header_entity: () => {return require('./components/a-thread-header-entity.vue').default},
        load_a_post: () => {return require('./components/a-post.vue').default},
        load_a_side_header: () => {return require('./components/a-side-header.vue').default},
        load_a_breadcrumbs: () => {return require('./components/a-breadcrumbs.vue').default},
        load_a_username: () => {return require('./components/a-username.vue').default},
        load_a_timestamp: () => {return require('./components/a-timestamp.vue').default},
        load_a_globalscopeheader: () => {return require('./components/a-globalscopeheader.vue').default},
        load_a_board_listitem: () => {return require('./components/listitems/a-board-listitem.vue').default},
        load_a_hashimage: () => {return require('./components/a-hashimage.vue').default},
        load_a_no_content: () => {return require('./components/a-no-content.vue').default},
        load_a_markdown: () => {return require('./components/a-markdown.vue').default},
        load_a_avatar_block: () => {return require('./components/a-avatar-block.vue').default},
        load_a_composer: () => {return require('./components/a-composer.vue').default},
        load_a_ballot: () => {return require('./components/a-ballot.vue').default},
        load_a_progress_bar: () => {return require('./components/a-progress-bar.vue').default},
        load_a_inflight_info: () => {return require('./components/a-inflight-info.vue').default},
        load_a_info_marker: () => {return require('./components/a-info-marker.vue').default},
        load_a_spinner: () => {return require('./components/a-spinner.vue').default},
        load_a_notfound: () => {return require('./components/a-notfound.vue').default},
        load_a_guidelight: () => {return require('./components/a-guidelight.vue').default},
        load_a_home_header: () => {return require('./components/a-home-header.vue').default},
        load_a_popular_header: () => {return require('./components/a-popular-header.vue').default},
        load_a_new_header: () => {return require('./components/a-new-header.vue').default},
        load_a_notifications_icon: () => {return require('./components/a-notifications-icon.vue').default},
        load_a_sfwlist_icon: () => {return require('./components/a-sfwlist-icon.vue').default},
        load_a_notification_entity: () => {return require('./components/a-notification-entity.vue').default},
        load_a_main_app_loader: () => {return require('./components/a-main-app-loader.vue').default},
        load_a_global_header: () => {return require('./components/a-global-header.vue').default},
        load_a_fin_puck: () => {return require('./components/a-fin-puck.vue').default},
        load_a_bootstrapper: () => {return require('./components/a-bootstrapper.vue').default},
        load_a_fingerprint: () => {return require('./components/a-fingerprint.vue').default},
        load_a_settings_block: () => {return require('./components/a-settings-block.vue').default},
        load_a_software_update_icon: () => {return require('./components/a-software-update-icon.vue').default},
        load_a_patreon_button: () => {return require('./components/a-patreon-button.vue').default},
        load_a_crypto_fund_button: () => {return require('./components/a-crypto-fund-button.vue').default},
        load_a_boardname: () => {return require('./components/a-boardname.vue').default},
        load_a_search_icon: () => {return require('./components/a-search-icon.vue').default},
        load_a_search_header: () => {return require('./components/a-search-header.vue').default},
        load_a_user_listitem: () => {return require('./components/listitems/a-user-listitem.vue').default},
        load_a_post_listitem: () => {return require('./components/listitems/a-post-listitem.vue').default},
        load_a_threadname: () => {return require('./components/a-threadname.vue').default},
        load_a_link: () => {return require('./components/a-link.vue').default},
        load_vue_simple_spinner: () => {return require('../../node_modules/vue-simple-spinner')},
        
        load_Home: () => {return require('./components/locations/home.vue').default},
        load_Popular: () => {return require('./components/locations/popular.vue').default},
        load_New: () => {return require('./components/locations/new.vue').default},

        load_global_scope: () => {return require('./components/locations/globalscope.vue').default},
        load_global_root: () => {return require('./components/locations/globalscope/globalroot.vue').default},
        load_global_subbed: () => {return require('./components/locations/globalscope/subbedroot.vue').default},
        load_new_board: () => {return require('./components/locations/globalscope/newboard.vue').default},
        load_board_scope: () => {return require('./components/locations/boardscope.vue').default},
        load_board_root: () => {return require('./components/locations/boardscope/boardroot.vue').default},
        load_board_info: () => {return require('./components/locations/boardscope/boardinfo.vue').default},
        load_mod_activity: () => {return require('./components/locations/boardscope/modactivity.vue').default},
        load_elections: () => {return require('./components/locations/boardscope/elections.vue').default},
        load_reports: () => {return require('./components/locations/boardscope/reports.vue').default},
        
        load_new_thread: () => {return require('./components/locations/boardscope/newthread.vue').default},
        load_thread_scope: () => {return require('./components/locations/threadscope.vue').default},
        
        load_settings_scope: () => {return require('./components/locations/settingsscope.vue').default},
        load_settings_root: () => {return require('./components/locations/settingsscope/settingsroot.vue').default},
        load_defaults: () => {return require('./components/locations/settingsscope/defaults.vue').default},
        load_shortcuts: () => {return require('./components/locations/settingsscope/shortcuts.vue').default},
        load_advanced_settings: () => {return require('./components/locations/settingsscope/advancedsettings.vue').default},
        load_about: () => {return require('./components/locations/settingsscope/about.vue').default},
        load_membership: () => {return require('./components/locations/settingsscope/membership.vue').default},
        load_changelog: () => {return require('./components/locations/settingsscope/changelog.vue').default},
        load_admins_quickstart: () => {return require('./components/locations/settingsscope/adminsquickstart.vue').default},
        load_intro: () => {return require('./components/locations/settingsscope/intro.vue').default},
        load_new_user: () => {return require('./components/locations/settingsscope/newuser.vue').default},
        load_sfw_list: () => {return require('./components/locations/settingsscope/sfwlist.vue').default},
        load_modship: () => {return require('./components/locations/settingsscope/modship.vue').default},
        load_name_mint: () => {return require('./components/locations/settingsscope/namemint.vue').default},
        
        load_user_scope: () => {return require('./components/locations/userscope.vue').default},
        load_user_root: () => {return require('./components/locations/userscope/userroot.vue').default},
        load_user_boards: () => {return require('./components/locations/userscope/userboards.vue').default},
        load_user_threads: () => {return require('./components/locations/userscope/userthreads.vue').default},
        load_user_posts: () => {return require('./components/locations/userscope/userposts.vue').default},
        load_notifications: () => {return require('./components/locations/userscope/notifications.vue').default},
        
        load_status: () => {return require('./components/locations/status.vue').default},
        
        load_onboard_scope: () => {return require('./components/locations/onboardscope.vue').default},
        load_onboard_root: () => {return require('./components/locations/onboardscope/onboardroot.vue').default},
        load_onboard1: () => {return require('./components/locations/onboardscope/onboard1.vue').default},
        load_onboard2: () => {return require('./components/locations/onboardscope/onboard2.vue').default},
        load_onboard3: () => {return require('./components/locations/onboardscope/onboard3.vue').default},
        load_onboard4: () => {return require('./components/locations/onboardscope/onboard4.vue').default},
        load_onboard5: () => {return require('./components/locations/onboardscope/onboard5.vue').default},
        load_onboard6: () => {return require('./components/locations/onboardscope/onboard6.vue').default},
        
        load_search_scope: () => {return require('./components/locations/searchscope.vue').default},
        load_search_community: () => {return require('./components/locations/searchscope/communitysearch.vue').default},
        load_search_content: () => {return require('./components/locations/searchscope/contentsearch.vue').default},
        load_search_user: () => {return require('./components/locations/searchscope/usersearch.vue').default},

        load_store: () => {return require('./store').default},

        load_sync: () => {return require('../../node_modules/vuex-router-sync').sync},
        
        load_electron_hunspell: () => {return require('electron-hunspell')},
        load_path: () => {return require('path')},
        load_fs: () => {return require('fs')},
        
        load_grpc: () => {return require('@grpc/grpc-js')},
        load_vuexStore: () => {return require('../../store/index').default},
        protoload_messages: () => {return require('../../../../../protos/clapi/clapi_pb.js')},
        protoload_services: () => {return require('../../../../../protos/clapi/clapi_grpc_pb')},
        
        get_version: () => {return require('electron').remote.app.getVersion()},
        metrics: () => {return require('../metrics/metrics')},
        get_main_router: () => {return require('../../renderermain').router},
        
    }
)