"use strict";
/*
This is the main entry point to the client app. See app.vue for the start logic, and globally-applicable css.
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// Electron IPC setup before doing anything else
var ipcRenderer = window.electronAPI.load_ipcRenderer();
window.electronAPI.RegisterIPC();
// ^ Heads up, there are some IPC events registered in this renderermain, too.
// const unhandled = require('../../node_modules/electron-unhandled')
// unhandled()
var clapiserver = window.electronAPI.load_clapiserver();
var feapiconsumer = window.electronAPI.load_feapiconsumer();
var globalMethods = window.electronAPI.load_globalMethods();
var clientAPIServerPort = clapiserver.StartClientAPIServer();
console.log('attempting to call get frontend ready');
ipcRenderer
    .invoke('GetFrontendReady')
    .then(function (resp) {
    console.log('frontend ready response received');
    console.log(resp);
})
    .catch(function (err) {
    console.log('fe ready promise rejected.');
    console.log(err);
});
/*----------  Call mainmain to ask software update state  ----------*/
ipcRenderer.send('AskNewUpdateReady');
console.log('renderer client api server port: ', clientAPIServerPort);
ipcRenderer
    .invoke('SetClientAPIServerPort', clientAPIServerPort)
    .then(function (feDaemonStarted) {
    if (!feDaemonStarted) {
        // It's an Electron refresh, not a cold start.
        feapiconsumer.Initialise();
    }
})
    .catch(function (err) {
    console.log('this is the promise error:');
    console.log(err);
});
/*----------  Vue + its plugins  ----------*/
var isDev = window.electronAPI.load_isDev();
var Vue = window.electronAPI.load_Vue();
// var Vue = require('../../node_modules/vue/dist/vue.js') // Development
var VueRouter = window.electronAPI.load_VueRouter();
Vue.use(VueRouter);
// Register icons for our own use.
var Icon = window.electronAPI.load_Icon();
Vue.component('icon', Icon);
// Register the click-outside component
var ClickOutside = window.electronAPI.load_ClickOutside();
Vue.use(ClickOutside);
/*----------  Third party dependencies  ----------*/
var Mousetrap = window.electronAPI.load_Mousetrap();
//const Spinner = window.electronAPI.load_Spinner()
/*----------  Components  ----------*/
// Global component declarations - do it here once.
Vue.component('a-app', window.electronAPI.load_a_app());
Vue.component('a-header', window.electronAPI.load_a_header());
Vue.component('a-header-icon', window.electronAPI.load_a_header_icon());
Vue.component('a-sidebar', window.electronAPI.load_a_sidebar());
Vue.component('a-boardheader', window.electronAPI.load_a_boardheader());
Vue.component('a-tabs', window.electronAPI.load_a_tabs());
Vue.component('a-thread-listitem', window.electronAPI.load_a_thread_listitem());
Vue.component('a-vote-action', window.electronAPI.load_a_vote_action());
Vue.component('a-thread-header-entity', window.electronAPI.load_a_thread_header_entity());
Vue.component('a-post', window.electronAPI.load_a_post());
Vue.component('a-side-header', window.electronAPI.load_a_side_header());
Vue.component('a-breadcrumbs', window.electronAPI.load_a_breadcrumbs());
Vue.component('a-username', window.electronAPI.load_a_username());
Vue.component('a-timestamp', window.electronAPI.load_a_timestamp());
Vue.component('a-globalscopeheader', window.electronAPI.load_a_globalscopeheader());
Vue.component('a-board-listitem', window.electronAPI.load_a_board_listitem());
Vue.component('a-hashimage', window.electronAPI.load_a_hashimage());
Vue.component('a-no-content', window.electronAPI.load_a_no_content());
Vue.component('a-markdown', window.electronAPI.load_a_markdown());
Vue.component('a-avatar-block', window.electronAPI.load_a_avatar_block());
Vue.component('a-composer', window.electronAPI.load_a_composer());
Vue.component('a-ballot', window.electronAPI.load_a_ballot());
Vue.component('a-progress-bar', window.electronAPI.load_a_progress_bar());
Vue.component('a-inflight-info', window.electronAPI.load_a_inflight_info());
Vue.component('a-info-marker', window.electronAPI.load_a_info_marker());
Vue.component('a-spinner', window.electronAPI.load_a_spinner());
Vue.component('a-notfound', window.electronAPI.load_a_notfound());
Vue.component('a-guidelight', window.electronAPI.load_a_guidelight());
Vue.component('a-home-header', window.electronAPI.load_a_home_header());
Vue.component('a-popular-header', window.electronAPI.load_a_popular_header());
Vue.component('a-new-header', window.electronAPI.load_a_new_header());
Vue.component('a-notifications-icon', window.electronAPI.load_a_notifications_icon());
Vue.component('a-sfwlist-icon', window.electronAPI.load_a_sfwlist_icon());
Vue.component('a-notification-entity', window.electronAPI.load_a_notification_entity());
Vue.component('a-main-app-loader', window.electronAPI.load_a_main_app_loader());
Vue.component('a-global-header', window.electronAPI.load_a_global_header());
Vue.component('a-fin-puck', window.electronAPI.load_a_fin_puck());
Vue.component('a-bootstrapper', window.electronAPI.load_a_bootstrapper());
Vue.component('a-fingerprint', window.electronAPI.load_a_fingerprint());
Vue.component('a-settings-block', window.electronAPI.load_a_settings_block());
Vue.component('a-software-update-icon', window.electronAPI.load_a_software_update_icon());
Vue.component('a-patreon-button', window.electronAPI.load_a_patreon_button());
Vue.component('a-crypto-fund-button', window.electronAPI.load_a_crypto_fund_button());
Vue.component('a-boardname', window.electronAPI.load_a_boardname());
Vue.component('a-search-icon', window.electronAPI.load_a_search_icon());
Vue.component('a-search-header', window.electronAPI.load_a_search_header());
Vue.component('a-user-listitem', window.electronAPI.load_a_user_listitem());
Vue.component('a-post-listitem', window.electronAPI.load_a_post_listitem());
Vue.component('a-threadname', window.electronAPI.load_a_threadname());
Vue.component('a-link', window.electronAPI.load_a_link());
/*----------  Third party components  ----------*/
Vue.component('vue-simple-spinner', window.electronAPI.load_vue_simple_spinner());
/*----------  Places  ----------*/
var Home = window.electronAPI.load_home();
var Popular = window.electronAPI.load_popular();
var New = window.electronAPI.load_new();
/*----------  Global scope (whole network, i.e. list of boards)  ----------*/
var GlobalScope = window.electronAPI.load_global_scope();
var GlobalRoot = window.electronAPI.load_global_root();
var GlobalSubbed = window.electronAPI.load_global_subbed();
/*----------  Board scope (board entity + list of threads)  ----------*/
var NewBoard = window.electronAPI.load_new_board();
var BoardScope = window.electronAPI.load_board_scope();
var BoardRoot = window.electronAPI.load_board_root();
var BoardInfo = window.electronAPI.load_board_info();
var ModActivity = window.electronAPI.load_mod_activity();
var Elections = window.electronAPI.load_elections();
var Reports = window.electronAPI.load_reports();
/*----------  Thread scope (thread entity + list of posts)  ----------*/
var NewThread = window.electronAPI.load_new_thread();
var ThreadScope = window.electronAPI.load_thread_scope();
/*----------  Settings scope  ----------*/
var SettingsScope = window.electronAPI.load_settings_scope();
var SettingsRoot = window.electronAPI.load_settings_root();
var Defaults = window.electronAPI.load_defaults();
var Shortcuts = window.electronAPI.load_shortcuts();
var AdvancedSettings = window.electronAPI.load_advanced_settings();
var About = window.electronAPI.load_about();
var Membership = window.electronAPI.load_membership();
var Changelog = window.electronAPI.load_changelog();
var AdminsQuickstart = window.electronAPI.load_admins_quickstart();
var Intro = window.electronAPI.load_intro();
var NewUser = window.electronAPI.load_new_user();
var SFWList = window.electronAPI.load_sfw_list();
var Modship = window.electronAPI.load_modship();
var Namemint = window.electronAPI.load_name_mint();
/*----------  User scope  ----------*/
var UserScope = window.electronAPI.load_user_scope();
var UserRoot = window.electronAPI.load_user_root();
var UserBoards = window.electronAPI.load_user_boards();
var UserThreads = window.electronAPI.load_user_threads();
var UserPosts = window.electronAPI.load_user_posts();
var Notifications = window.electronAPI.load_notifications();
/*----------  Status scope  ----------*/
var Status = window.electronAPI.load_status();
/*----------  Onboarding scope  ----------*/
var OnboardScope = window.electronAPI.load_onboard_scope();
var OnboardRoot = window.electronAPI.load_onboard_root();
var Onboard1 = window.electronAPI.load_onboard1();
var Onboard2 = window.electronAPI.load_onboard2();
var Onboard3 = window.electronAPI.load_onboard3();
var Onboard4 = window.electronAPI.load_onboard4();
var Onboard5 = window.electronAPI.load_onboard5();
var Onboard6 = window.electronAPI.load_onboard6();
/*----------  Search scope (search communities, content, users)  ----------*/
var SearchScope = window.electronAPI.load_search_scope();
var SearchCommunity = window.electronAPI.load_search_community();
var SearchContent = window.electronAPI.load_search_content();
var SearchUser = window.electronAPI.load_search_user();
/*----------  Routes  ----------*/
var routes = [
    { path: '/', component: Home, name: 'Home' },
    { path: '/popular', component: Popular, name: 'Popular' },
    { path: '/new', component: New, name: 'New' },
    {
        path: '/globalscope',
        component: GlobalScope,
        children: [
            { path: '', component: GlobalRoot, name: 'Global' },
            {
                path: '/globalscope/subbed',
                component: GlobalSubbed,
                name: 'Global>Subbed',
            },
            {
                path: '/globalscope/newboard',
                component: NewBoard,
                name: 'Global>NewBoard',
            },
        ],
    },
    {
        path: '/searchscope',
        component: SearchScope,
        children: [
            { path: '', component: SearchCommunity, name: 'Search' },
            // ^ SearchCommunity is the root page
            {
                path: '/searchscope/content',
                component: SearchContent,
                name: 'Search>Content',
            },
            {
                path: '/searchscope/user',
                component: SearchUser,
                name: 'Search>People',
            },
        ],
    },
    {
        path: '/board/:boardfp',
        component: BoardScope,
        children: [
            { path: '', component: BoardRoot, name: 'Board' },
            {
                path: '/board/:boardfp/new',
                component: BoardRoot,
                name: 'Board>ThreadsNewList',
            },
            {
                path: '/board/:boardfp/info',
                component: BoardInfo,
                name: 'Board>BoardInfo',
            },
            {
                path: '/board/:boardfp/modactivity',
                component: ModActivity,
                name: 'Board>ModActivity',
            },
            {
                path: '/board/:boardfp/elections',
                component: Elections,
                name: 'Board>Elections',
            },
            {
                path: '/board/:boardfp/newthread',
                component: NewThread,
                name: 'Board>NewThread',
            },
            {
                path: '/board/:boardfp/reports',
                component: Reports,
                name: 'Board>Reports',
            },
        ],
    },
    {
        path: '/board/:boardfp/thread/:threadfp',
        component: ThreadScope,
        name: 'Thread',
        props: function (route) {
            var highlightSelectors = [];
            if (!globalMethods.IsUndefined(route.query.highlightSelectors) &&
                route.query.highlightSelectors.length > 0) {
                highlightSelectors = JSON.parse(route.query.highlightSelectors);
            }
            return {
                route_focusSelector: route.query.focusSelector,
                route_parentSelector: route.query.parentSelector,
                route_highlightSelectors: highlightSelectors,
            };
        },
    },
    {
        path: '/settings',
        component: SettingsScope,
        children: [
            { path: '', component: SettingsRoot, name: 'Settings' },
            {
                path: '/settings/defaults',
                component: Defaults,
                name: 'Settings>Defaults',
            },
            {
                path: '/settings/shortcuts',
                component: Shortcuts,
                name: 'Settings>Shortcuts',
            },
            {
                path: '/settings/advanced',
                component: AdvancedSettings,
                name: 'Settings>Advanced',
            },
            /*This is a little weird, these things are in settings scope but they're not in a settings path. That's because they exist in a router link that is in the settings structure. If you move this outside and try to use it, it uses the router link outside settings, which is the main main-block router link, which means the settings frame box won't be rendered. So this is not an oversight. */
            { path: '/intro', component: Intro, name: 'Intro' },
            { path: '/about', component: About, name: 'About' },
            { path: '/membership', component: Membership, name: 'Membership' },
            { path: '/changelog', component: Changelog, name: 'Changelog' },
            {
                path: '/adminsquickstart',
                component: AdminsQuickstart,
                name: 'AdminsQuickstart',
            },
            { path: '/newuser', component: NewUser, name: 'NewUser' },
            { path: '/sfwlist', component: SFWList, name: 'SFWList' },
            { path: '/modship', component: Modship, name: 'Modship' },
            { path: '/namemint', component: Namemint, name: 'Namemint' },
        ],
    },
    {
        path: '/user/:userfp',
        component: UserScope,
        children: [
            { path: '', component: UserRoot, name: 'User' },
            {
                path: '/user/:userfp/boards',
                component: UserBoards,
                name: 'User>Boards',
            },
            {
                path: '/user/:userfp/threads',
                component: UserThreads,
                name: 'User>Threads',
            },
            { path: '/user/:userfp/posts', component: UserPosts, name: 'User>Posts' },
            {
                path: '/user/:userfp/notifications',
                component: Notifications,
                name: 'User>Notifications',
            },
            { path: '*', redirect: '/user/:userfp' },
        ],
    },
    { path: '/status', component: Status, name: 'Status' },
    {
        path: '/onboard',
        components: { default: '', onboarding: OnboardScope },
        children: [
            { path: '', component: OnboardRoot, name: 'OnboardRoot' },
            { path: '/onboard/1', component: Onboard1, name: 'Onboard1' },
            { path: '/onboard/2', component: Onboard2, name: 'Onboard2' },
            { path: '/onboard/3', component: Onboard3, name: 'Onboard3' },
            { path: '/onboard/4', component: Onboard4, name: 'Onboard4' },
            { path: '/onboard/5', component: Onboard5, name: 'Onboard5' },
            { path: '/onboard/6', component: Onboard6, name: 'Onboard6' },
            { path: '*', redirect: '/onboard' },
        ],
    },
    { path: '*', redirect: '/' },
];
// { path: '/user/:userfp/posts', component: UserPosts, name: 'User>Posts', },
// { path: '/user/:userfp/threads', component: UserThreads, name: 'User>Threads', },
/*----------  Plumbing  ----------*/
var router = new VueRouter({
    scrollBehavior: function () {
        // Always return to top while navigating.
        return { x: 0, y: 0 };
    },
    // ^ This does not work because we are using a fixed container and scroll inside it. Attempting to do it like this attempts to scroll the main container, which does not scroll. There is no way to specify which container needs to be scrolled, so we need to implement our own scroll behaviour.
    routes: routes,
    // mode: 'history'
});
// This keeps track of history, so we can appropriately disable back / forward buttons as needed.
// router.afterEach(HistoryWriter)
var Store = window.electronAPI.load_store();
router.beforeEach(function (to, _a, next) {
    if (Store.state.onboardCompleteStatusArrived &&
        !Store.state.onboardCompleteStatus) {
        // Onboard is not complete. return to appropriate locations
        // Community version
        if (to.path.startsWith('/onboard')) {
            next();
            return;
        }
        else {
            next('/onboard');
            return;
        }
    }
    // Onboard complete. No restrictions.
    next();
});
new Vue({
    el: '#app',
    template: '<a-app></a-app>',
    router: router,
    store: Store,
    mounted: function () {
        ipcRenderer.invoke('SetRendererReady', true);
    },
});
var Sync = window.electronAPI.load_sync();
Sync(Store, router);
/*
^ It adds a route module into the store, which contains the state representing the current route:
store.state.route.path   // current path (string)
store.state.route.params // current params (object)
store.state.route.query  // current query (object)
*/
// Disable events that are meaningless in this context.
// Drag start is being able to click and drag a link inside the app to outside of it. Since the app is a local one, that link will just be a local file, and it won't be useful to anybody.
document.addEventListener('dragstart', function (event) {
    event.preventDefault();
});
// Dragover is the event that gets fired when a dragged item is on a droppable target, every few hundred milliseconds. We have no drop targets.
document.addEventListener('dragover', function (event) {
    event.preventDefault();
});
// Cancelling drop prevents anything from being dropped into the container. This can be a mild security risk, if someone can convince you (or somehow automate dropping inside the app container), it can make the container ping a web address. This also assumes the container has the dropped remote address whitelisted, though, so it's a long shot. Still, defence in depth is preferable.
document.addEventListener('drop', function (event) {
    event.preventDefault();
});
/*----------  Some basic keyboard shortcuts  ----------*/
Mousetrap.bind('mod+,', function () {
    history.back();
    // if (event.target.nodeName.toLowerCase() !== 'textarea' && event.target.nodeName.toLowerCase() !== 'input' && event.target.contentEditable !== 'true') {
    //   history.back()
    // }
});
Mousetrap.bind('mod+.', function () {
    history.forward();
    // if (event.target.nodeName.toLowerCase() !== 'textarea' && event.target.nodeName.toLowerCase() !== 'input' && event.target.contentEditable !== 'true') {
    //   history.forward()
    // }
});
Mousetrap.bind('mod+/', function () {
    router.push('/user/' + Store.state.localUser.fingerprint + '/notifications');
});
/*----------  IPC maps  ----------*/
/*
These are here instead of eipc/eipc-renderer because they do require access to things that are instantiated here, such as router, and there is no way to get to them without importing the main. Importing main is not an option. So these should be here until I split the router into its own service file that is imported separately. That way, eipc import from there, and not from main.
*/
window.electronAPI.RouteTo(function (route) {
    router.push(route);
    return;
});
window.electronAPI.FullscreenState(function (isFullscreen) {
    Store.state.appIsFullscreen = isFullscreen;
});
window.electronAPI.NewUpdateReady(function (newUpdateReady) {
    Store.state.newUpdateReady = newUpdateReady;
});
/*----------  Exports  ----------*/
module.exports = { router: router };
/*========================================
=            Spell checker             =
========================================*/
// const HunspellAsm = require('hunspell-asm')
var ElectronHunspell = window.electronAPI.load_electron_hunspell();
var path = window.electronAPI.load_path();
var fs = window.electronAPI.load_fs();
ElectronHunspell.enableLogger(console);
var init = function () { return __awaiter(void 0, void 0, void 0, function () {
    var browserWindowProvider, dic, aff, attached;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                browserWindowProvider = new ElectronHunspell.SpellCheckerProvider();
                window.browserWindowProvider = browserWindowProvider;
                return [4 /*yield*/, browserWindowProvider.initialize({
                        // environment: HunspellAsm.ENVIRONMENT.NODE,
                        locateBinary: function (file) {
                            if (file.endsWith('.wasm')) {
                                return 'node_modules/hunspell-asm/dist/cjs/lib/hunspell.wasm';
                            }
                            return file;
                        },
                    })];
            case 1:
                _a.sent();
                dic = new ArrayBuffer(0);
                aff = new ArrayBuffer(0);
                if (!isDev) {
                    dic = fs.readFileSync(path.join(__dirname, '../app/dicts/en-US.dic'));
                    aff = fs.readFileSync(path.join(__dirname, '../app/dicts/en-US.aff'));
                }
                else {
                    dic = fs.readFileSync('src/app/ext_dep/dicts/en-US.dic');
                    aff = fs.readFileSync('src/app/ext_dep/dicts/en-US.aff');
                }
                return [4 /*yield*/, browserWindowProvider.loadDictionary('en', new Uint8Array(dic), new Uint8Array(aff))];
            case 2:
                _a.sent();
                return [4 /*yield*/, ElectronHunspell.attachSpellCheckProvider(browserWindowProvider)];
            case 3:
                attached = _a.sent();
                return [4 /*yield*/, attached.switchLanguage('en')];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
init();
/*=====  End of Spell checker   ======*/
//# sourceMappingURL=renderermain.js.map