"use strict";
var _a = require('electron'), contextBridge = _a.contextBridge, ipcRenderer = _a.ipcRenderer;
contextBridge.exposeInMainWorld('electronAPI', {
    RouteTo: function (callback) {
        ipcRenderer.on('RouteTo', callback);
    },
    FullscreenState: function (callback) {
        ipcRenderer.on('FullscreenState', callback);
    },
    NewUpdateReady: function (callback) {
        ipcRenderer.on('NewUpdateReady', callback);
    },
    QuitApp: function () {
        ipcRenderer.send('QuitApp');
    },
    SetFrontendReady: function (val) {
        ipcRenderer.send('SetFrontendReady', val);
    },
    SetFrontendAPIPort: function (val) {
        ipcRenderer.send('SetFrontendAPIPort', val);
    },
    GetFrontendAPIPort: function () {
        ipcRenderer.invoke('GetFrontendAPIPort');
    },
    GetClientAPIServerPort: function () {
        ipcRenderer.invoke('GetClientAPIServerPort');
    },
    SetFrontendClientConnInitialised: function (val) {
        ipcRenderer.send('SetFrontendClientConnInitialised', val);
    },
    GetFrontendClientConnInitialised: function () {
        ipcRenderer.invoke('GetFrontendClientConnInitialised');
    },
    RestartToUpdateTheApp: function () {
        ipcRenderer.send('RestartToUpdateTheApp');
    },
    FocusAndShow: function () {
        ipcRenderer.send('FocusAndShow');
    },
    DisableExternalResourceAutoLoad: function () {
        ipcRenderer.send('DisableExternalResourceAutoLoad');
    },
    EnableExternalResourceAutoLoad: function () {
        ipcRenderer.send('EnableExternalResourceAutoLoad');
    },
    RegisterIPC: function () {
        require('./services/eipc/eipc-renderer'); // Register IPC events
    },
    load_isDev: function () { return require('electron-is-dev'); },
    load_ipcRenderer: function () {
        var ipcRenderer = require('../../node_modules/electron').ipcRenderer;
        return ipcRenderer;
    },
    load_clapiserver: function () { return require('./services/clapiserver/clapiserver'); },
    load_feapiconsumer: function () { return require('./services/feapiconsumer/feapiconsumer'); },
    load_globalMethods: function () { return require('./services/globals/methods'); },
    load_Vue: function (isDev) {
        if (isDev) {
            var Vue = require('../../node_modules/vue/dist/vue.js'); // Dev
            Vue.config.devtools = true;
            return Vue;
        }
        else {
            return require('../../node_modules/vue/dist/vue.min.js'); // Production
        }
        var ipcRenderer = require('../../node_modules/electron').ipcRenderer;
        return ipcRenderer;
    },
    load_VueRouter: function () { return require('../../node_modules/vue-router').default; },
    load_Icon: function () { return require('../../node_modules/vue-awesome'); },
    load_ClickOutside: function () { return require('../../node_modules/v-click-outside'); },
    load_Mousetrap: function () { return require('../../node_modules/mousetrap'); },
    load_Spinner: function () { return require('../../node_modules/vue-simple-spinner'); },
    load_a_app: function () { return require('./components/a-app.vue').default; },
    load_a_header: function () { return require('./components/a-header.vue').default; },
    load_a_header_icon: function () { return require('./components/a-header-icon.vue').default; },
    load_a_sidebar: function () { return require('./components/a-sidebar.vue').default; },
    load_a_boardheader: function () { return require('./components/a-boardheader.vue').default; },
    load_a_tabs: function () { return require('./components/a-tabs.vue').default; },
    load_a_thread_listitem: function () { return require('./components/listitems/a-thread-listitem.vue').default; },
    load_a_vote_action: function () { return require('./components/a-vote-action.vue').default; },
    load_a_thread_header_entity: function () { return require('./components/a-thread-header-entity.vue').default; },
    load_a_post: function () { return require('./components/a-post.vue').default; },
    load_a_side_header: function () { return require('./components/a-side-header.vue').default; },
    load_a_breadcrumbs: function () { return require('./components/a-breadcrumbs.vue').default; },
    load_a_username: function () { return require('./components/a-username.vue').default; },
    load_a_timestamp: function () { return require('./components/a-timestamp.vue').default; },
    load_a_globalscopeheader: function () { return require('./components/a-globalscopeheader.vue').default; },
    load_a_board_listitem: function () { return require('./components/listitems/a-board-listitem.vue').default; },
    load_a_hashimage: function () { return require('./components/a-hashimage.vue').default; },
    load_a_no_content: function () { return require('./components/a-no-content.vue').default; },
    load_a_markdown: function () { return require('./components/a-markdown.vue').default; },
    load_a_avatar_block: function () { return require('./components/a-avatar-block.vue').default; },
    load_a_composer: function () { return require('./components/a-composer.vue').default; },
    load_a_ballot: function () { return require('./components/a-ballot.vue').default; },
    load_a_progress_bar: function () { return require('./components/a-progress-bar.vue').default; },
    load_a_inflight_info: function () { return require('./components/a-inflight-info.vue').default; },
    load_a_info_marker: function () { return require('./components/a-info-marker.vue').default; },
    load_a_spinner: function () { return require('./components/a-spinner.vue').default; },
    load_a_notfound: function () { return require('./components/a-notfound.vue').default; },
    load_a_guidelight: function () { return require('./components/a-guidelight.vue').default; },
    load_a_home_header: function () { return require('./components/a-home-header.vue').default; },
    load_a_popular_header: function () { return require('./components/a-popular-header.vue').default; },
    load_a_new_header: function () { return require('./components/a-new-header.vue').default; },
    load_a_notifications_icon: function () { return require('./components/a-notifications-icon.vue').default; },
    load_a_sfwlist_icon: function () { return require('./components/a-sfwlist-icon.vue').default; },
    load_a_notification_entity: function () { return require('./components/a-notification-entity.vue').default; },
    load_a_main_app_loader: function () { return require('./components/a-main-app-loader.vue').default; },
    load_a_global_header: function () { return require('./components/a-global-header.vue').default; },
    load_a_fin_puck: function () { return require('./components/a-fin-puck.vue').default; },
    load_a_bootstrapper: function () { return require('./components/a-bootstrapper.vue').default; },
    load_a_fingerprint: function () { return require('./components/a-fingerprint.vue').default; },
    load_a_settings_block: function () { return require('./components/a-settings-block.vue').default; },
    load_a_software_update_icon: function () { return require('./components/a-software-update-icon.vue').default; },
    load_a_patreon_button: function () { return require('./components/a-patreon-button.vue').default; },
    load_a_crypto_fund_button: function () { return require('./components/a-crypto-fund-button.vue').default; },
    load_a_boardname: function () { return require('./components/a-boardname.vue').default; },
    load_a_search_icon: function () { return require('./components/a-search-icon.vue').default; },
    load_a_search_header: function () { return require('./components/a-search-header.vue').default; },
    load_a_user_listitem: function () { return require('./components/listitems/a-user-listitem.vue').default; },
    load_a_post_listitem: function () { return require('./components/listitems/a-post-listitem.vue').default; },
    load_a_threadname: function () { return require('./components/a-threadname.vue').default; },
    load_a_link: function () { return require('./components/a-link.vue').default; },
    load_vue_simple_spinner: function () { return require('../../node_modules/vue-simple-spinner'); },
    load_Home: function () { return require('./components/locations/home.vue').default; },
    load_Popular: function () { return require('./components/locations/popular.vue').default; },
    load_New: function () { return require('./components/locations/new.vue').default; },
    load_global_scope: function () { return require('./components/locations/globalscope.vue').default; },
    load_global_root: function () { return require('./components/locations/globalscope/globalroot.vue').default; },
    load_global_subbed: function () { return require('./components/locations/globalscope/subbedroot.vue').default; },
    load_new_board: function () { return require('./components/locations/globalscope/newboard.vue').default; },
    load_board_scope: function () { return require('./components/locations/boardscope.vue').default; },
    load_board_root: function () { return require('./components/locations/boardscope/boardroot.vue').default; },
    load_board_info: function () { return require('./components/locations/boardscope/boardinfo.vue').default; },
    load_mod_activity: function () { return require('./components/locations/boardscope/modactivity.vue').default; },
    load_elections: function () { return require('./components/locations/boardscope/elections.vue').default; },
    load_reports: function () { return require('./components/locations/boardscope/reports.vue').default; },
    load_new_thread: function () { return require('./components/locations/boardscope/newthread.vue').default; },
    load_thread_scope: function () { return require('./components/locations/threadscope.vue').default; },
    load_settings_scope: function () { return require('./components/locations/settingsscope.vue').default; },
    load_settings_root: function () { return require('./components/locations/settingsscope/settingsroot.vue').default; },
    load_defaults: function () { return require('./components/locations/settingsscope/defaults.vue').default; },
    load_shortcuts: function () { return require('./components/locations/settingsscope/shortcuts.vue').default; },
    load_advanced_settings: function () { return require('./components/locations/settingsscope/advancedsettings.vue').default; },
    load_about: function () { return require('./components/locations/settingsscope/about.vue').default; },
    load_membership: function () { return require('./components/locations/settingsscope/membership.vue').default; },
    load_changelog: function () { return require('./components/locations/settingsscope/changelog.vue').default; },
    load_admins_quickstart: function () { return require('./components/locations/settingsscope/adminsquickstart.vue').default; },
    load_intro: function () { return require('./components/locations/settingsscope/intro.vue').default; },
    load_new_user: function () { return require('./components/locations/settingsscope/newuser.vue').default; },
    load_sfw_list: function () { return require('./components/locations/settingsscope/sfwlist.vue').default; },
    load_modship: function () { return require('./components/locations/settingsscope/modship.vue').default; },
    load_name_mint: function () { return require('./components/locations/settingsscope/namemint.vue').default; },
    load_user_scope: function () { return require('./components/locations/userscope.vue').default; },
    load_user_root: function () { return require('./components/locations/userscope/userroot.vue').default; },
    load_user_boards: function () { return require('./components/locations/userscope/userboards.vue').default; },
    load_user_threads: function () { return require('./components/locations/userscope/userthreads.vue').default; },
    load_user_posts: function () { return require('./components/locations/userscope/userposts.vue').default; },
    load_notifications: function () { return require('./components/locations/userscope/notifications.vue').default; },
    load_status: function () { return require('./components/locations/status.vue').default; },
    load_onboard_scope: function () { return require('./components/locations/onboardscope.vue').default; },
    load_onboard_root: function () { return require('./components/locations/onboardscope/onboardroot.vue').default; },
    load_onboard1: function () { return require('./components/locations/onboardscope/onboard1.vue').default; },
    load_onboard2: function () { return require('./components/locations/onboardscope/onboard2.vue').default; },
    load_onboard3: function () { return require('./components/locations/onboardscope/onboard3.vue').default; },
    load_onboard4: function () { return require('./components/locations/onboardscope/onboard4.vue').default; },
    load_onboard5: function () { return require('./components/locations/onboardscope/onboard5.vue').default; },
    load_onboard6: function () { return require('./components/locations/onboardscope/onboard6.vue').default; },
    load_search_scope: function () { return require('./components/locations/searchscope.vue').default; },
    load_search_community: function () { return require('./components/locations/searchscope/communitysearch.vue').default; },
    load_search_content: function () { return require('./components/locations/searchscope/contentsearch.vue').default; },
    load_search_user: function () { return require('./components/locations/searchscope/usersearch.vue').default; },
    load_store: function () { return require('./store').default; },
    load_sync: function () { return require('../../node_modules/vuex-router-sync').sync; },
    load_electron_hunspell: function () { return require('electron-hunspell'); },
    load_path: function () { return require('path'); },
    load_fs: function () { return require('fs'); },
    load_grpc: function () { return require('@grpc/grpc-js'); },
    load_vuexStore: function () { return require('../../store/index').default; },
    protoload_messages: function () { return require('../../../../../protos/clapi/clapi_pb.js'); },
    protoload_services: function () { return require('../../../../../protos/clapi/clapi_grpc_pb'); },
    get_version: function () { return require('electron').remote.app.getVersion(); },
    metrics: function () { return require('../metrics/metrics'); },
    get_main_router: function () { return require('../../renderermain').router; },
});
//# sourceMappingURL=preload.js.map