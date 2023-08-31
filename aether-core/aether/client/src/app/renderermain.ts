/*
This is the main entry point to the client app. See app.vue for the start logic, and globally-applicable css.
*/

/*----------  Electron and our non-GUI services  ----------*/
/*
  Main thing to realise is that there are two processes on the electron side, the main and the renderer. Main is basically a node process, and renderer is basically very similar to script that linked via the <script> tag of a frame that the node has surfaced, which means it has much fewer privileges (though still has access to Node APIs).

  As a result, we start the frontend binary from the main side, but we establish the client gRPC server on the renderer side when it is time to connect to that server, since the data frontend provides needs to be delivered to the renderer, not the main process.
*/

export {}

// Electron IPC setup before doing anything else
const ipcRenderer = window.electronAPI.load_ipcRenderer()
window.electronAPI.RegisterIPC()
// ^ Heads up, there are some IPC events registered in this renderermain, too.

// const unhandled = require('../../node_modules/electron-unhandled')
// unhandled()
const clapiserver = window.electronAPI.load_clapiserver()
const feapiconsumer = window.electronAPI.load_feapiconsumer()
const globalMethods = window.electronAPI.load_globalMethods()

const clientAPIServerPort: number = clapiserver.StartClientAPIServer()

console.log('attempting to call get frontend ready')
ipcRenderer
  .invoke('GetFrontendReady')
  .then(function (resp: any) {
    console.log('frontend ready response received')
    console.log(resp)
  })
  .catch((err: any) => {
    console.log('fe ready promise rejected.')
    console.log(err)
  })

/*----------  Call mainmain to ask software update state  ----------*/

ipcRenderer.send('AskNewUpdateReady')

console.log('renderer client api server port: ', clientAPIServerPort)
ipcRenderer
  .invoke('SetClientAPIServerPort', clientAPIServerPort)
  .then(function (feDaemonStarted: boolean) {
    if (!feDaemonStarted) {
      // It's an Electron refresh, not a cold start.
      feapiconsumer.Initialise()
    }
  })
  .catch((err: any) => {
    console.log('this is the promise error:')
    console.log(err)
  })

/*----------  Vue + its plugins  ----------*/
const isDev = window.electronAPI.load_isDev()
var Vue = window.electronAPI.load_Vue()

// var Vue = require('../../node_modules/vue/dist/vue.js') // Development
const VueRouter = window.electronAPI.load_VueRouter()

Vue.use(VueRouter)

// Register icons for our own use.
const Icon = window.electronAPI.load_Icon()
Vue.component('icon', Icon)

// Register the click-outside component
var ClickOutside = window.electronAPI.load_ClickOutside()
Vue.use(ClickOutside)

/*----------  Third party dependencies  ----------*/

const Mousetrap = window.electronAPI.load_Mousetrap()
//const Spinner = window.electronAPI.load_Spinner()

/*----------  Components  ----------*/

// Global component declarations - do it here once.
Vue.component('a-app', window.electronAPI.load_a_app())
Vue.component('a-header', window.electronAPI.load_a_header())
Vue.component('a-header-icon', window.electronAPI.load_a_header_icon())
Vue.component('a-sidebar', window.electronAPI.load_a_sidebar())
Vue.component('a-boardheader', window.electronAPI.load_a_boardheader())
Vue.component('a-tabs', window.electronAPI.load_a_tabs())
Vue.component('a-thread-listitem', window.electronAPI.load_a_thread_listitem())
Vue.component('a-vote-action', window.electronAPI.load_a_vote_action())
Vue.component('a-thread-header-entity', window.electronAPI.load_a_thread_header_entity())
Vue.component('a-post', window.electronAPI.load_a_post())
Vue.component('a-side-header', window.electronAPI.load_a_side_header())
Vue.component('a-breadcrumbs', window.electronAPI.load_a_breadcrumbs())
Vue.component('a-username', window.electronAPI.load_a_username())
Vue.component('a-timestamp', window.electronAPI.load_a_timestamp())
Vue.component('a-globalscopeheader', window.electronAPI.load_a_globalscopeheader())
Vue.component('a-board-listitem', window.electronAPI.load_a_board_listitem())
Vue.component('a-hashimage', window.electronAPI.load_a_hashimage())
Vue.component('a-no-content', window.electronAPI.load_a_no_content())
Vue.component('a-markdown', window.electronAPI.load_a_markdown())
Vue.component('a-avatar-block', window.electronAPI.load_a_avatar_block())
Vue.component('a-composer', window.electronAPI.load_a_composer())
Vue.component('a-ballot', window.electronAPI.load_a_ballot())
Vue.component('a-progress-bar', window.electronAPI.load_a_progress_bar())
Vue.component('a-inflight-info', window.electronAPI.load_a_inflight_info())
Vue.component('a-info-marker', window.electronAPI.load_a_info_marker())
Vue.component('a-spinner', window.electronAPI.load_a_spinner())
Vue.component('a-notfound', window.electronAPI.load_a_notfound())
Vue.component('a-guidelight', window.electronAPI.load_a_guidelight())
Vue.component('a-home-header', window.electronAPI.load_a_home_header())
Vue.component('a-popular-header', window.electronAPI.load_a_popular_header())
Vue.component('a-new-header', window.electronAPI.load_a_new_header())
Vue.component('a-notifications-icon', window.electronAPI.load_a_notifications_icon())
Vue.component('a-sfwlist-icon', window.electronAPI.load_a_sfwlist_icon())
Vue.component('a-notification-entity', window.electronAPI.load_a_notification_entity())
Vue.component('a-main-app-loader', window.electronAPI.load_a_main_app_loader())
Vue.component('a-global-header', window.electronAPI.load_a_global_header())
Vue.component('a-fin-puck', window.electronAPI.load_a_fin_puck())
Vue.component('a-bootstrapper', window.electronAPI.load_a_bootstrapper())
Vue.component('a-fingerprint', window.electronAPI.load_a_fingerprint())
Vue.component('a-settings-block', window.electronAPI.load_a_settings_block())
Vue.component('a-software-update-icon', window.electronAPI.load_a_software_update_icon())
Vue.component('a-patreon-button', window.electronAPI.load_a_patreon_button())
Vue.component('a-crypto-fund-button', window.electronAPI.load_a_crypto_fund_button())
Vue.component('a-boardname', window.electronAPI.load_a_boardname())
Vue.component('a-search-icon', window.electronAPI.load_a_search_icon())
Vue.component('a-search-header', window.electronAPI.load_a_search_header())
Vue.component('a-user-listitem', window.electronAPI.load_a_user_listitem())
Vue.component('a-post-listitem', window.electronAPI.load_a_post_listitem())
Vue.component('a-threadname', window.electronAPI.load_a_threadname())
Vue.component('a-link', window.electronAPI.load_a_link())

/*----------  Third party components  ----------*/

Vue.component('vue-simple-spinner', window.electronAPI.load_vue_simple_spinner())

/*----------  Places  ----------*/

const Home = window.electronAPI.load_home()
const Popular = window.electronAPI.load_popular()
const New = window.electronAPI.load_new()

/*----------  Global scope (whole network, i.e. list of boards)  ----------*/
const GlobalScope = window.electronAPI.load_global_scope()
const GlobalRoot = window.electronAPI.load_global_root()
const GlobalSubbed = window.electronAPI.load_global_subbed()

/*----------  Board scope (board entity + list of threads)  ----------*/
const NewBoard = window.electronAPI.load_new_board()
const BoardScope = window.electronAPI.load_board_scope()
const BoardRoot = window.electronAPI.load_board_root()
const BoardInfo = window.electronAPI.load_board_info()
const ModActivity = window.electronAPI.load_mod_activity()  
const Elections = window.electronAPI.load_elections()
const Reports = window.electronAPI.load_reports()

/*----------  Thread scope (thread entity + list of posts)  ----------*/
const NewThread = window.electronAPI.load_new_thread()
const ThreadScope = window.electronAPI.load_thread_scope()

/*----------  Settings scope  ----------*/
const SettingsScope = window.electronAPI.load_settings_scope()
const SettingsRoot = window.electronAPI.load_settings_root()
const Defaults = window.electronAPI.load_defaults()
const Shortcuts = window.electronAPI.load_shortcuts()  
const AdvancedSettings = window.electronAPI.load_advanced_settings()  
const About = window.electronAPI.load_about()
const Membership = window.electronAPI.load_membership()
const Changelog = window.electronAPI.load_changelog()
const AdminsQuickstart = window.electronAPI.load_admins_quickstart()
const Intro = window.electronAPI.load_intro()
const NewUser = window.electronAPI.load_new_user()
const SFWList = window.electronAPI.load_sfw_list()
const Modship = window.electronAPI.load_modship()
const Namemint = window.electronAPI.load_name_mint()
  

/*----------  User scope  ----------*/
const UserScope = window.electronAPI.load_user_scope()
const UserRoot = window.electronAPI.load_user_root()  
const UserBoards = window.electronAPI.load_user_boards()  
const UserThreads = window.electronAPI.load_user_threads()
const UserPosts = window.electronAPI.load_user_posts()
const Notifications = window.electronAPI.load_notifications()

/*----------  Status scope  ----------*/
const Status = window.electronAPI.load_status()

/*----------  Onboarding scope  ----------*/

const OnboardScope = window.electronAPI.load_onboard_scope()
const OnboardRoot = window.electronAPI.load_onboard_root()
const Onboard1 = window.electronAPI.load_onboard1() 
const Onboard2 = window.electronAPI.load_onboard2()
const Onboard3 = window.electronAPI.load_onboard3()
const Onboard4 = window.electronAPI.load_onboard4()
const Onboard5 = window.electronAPI.load_onboard5()
const Onboard6 = window.electronAPI.load_onboard6()

/*----------  Search scope (search communities, content, users)  ----------*/
const SearchScope = window.electronAPI.load_search_scope()
const SearchCommunity = window.electronAPI.load_search_community()
const SearchContent = window.electronAPI.load_search_content()
const SearchUser = window.electronAPI.load_search_user()
  
/*----------  Routes  ----------*/

const routes = [
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
    props: function (route: any) {
      let highlightSelectors: any = []
      if (
        !globalMethods.IsUndefined(route.query.highlightSelectors) &&
        route.query.highlightSelectors.length > 0
      ) {
        highlightSelectors = JSON.parse(route.query.highlightSelectors)
      }
      return {
        route_focusSelector: route.query.focusSelector,
        route_parentSelector: route.query.parentSelector,
        route_highlightSelectors: highlightSelectors,
      }
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
]

// { path: '/user/:userfp/posts', component: UserPosts, name: 'User>Posts', },
// { path: '/user/:userfp/threads', component: UserThreads, name: 'User>Threads', },

/*----------  Plumbing  ----------*/

const router = new VueRouter({
  scrollBehavior() {
    // Always return to top while navigating.
    return { x: 0, y: 0 }
  },
  // ^ This does not work because we are using a fixed container and scroll inside it. Attempting to do it like this attempts to scroll the main container, which does not scroll. There is no way to specify which container needs to be scrolled, so we need to implement our own scroll behaviour.
  routes: routes,
  // mode: 'history'
})

// This keeps track of history, so we can appropriately disable back / forward buttons as needed.
// router.afterEach(HistoryWriter)

const Store = window.electronAPI.load_store()

router.beforeEach(function (to: any, {}, next: any) {
  if (
    Store.state.onboardCompleteStatusArrived &&
    !Store.state.onboardCompleteStatus
  ) {
    // Onboard is not complete. return to appropriate locations
    // Community version
    if (to.path.startsWith('/onboard')) {
      next()
      return
    } else {
      next('/onboard')
      return
    }
  }
  // Onboard complete. No restrictions.
  next()
})

new Vue({
  el: '#app',
  template: '<a-app></a-app>',
  router: router,
  store: Store,
  mounted(this: any) {
    ipcRenderer.invoke('SetRendererReady', true)
  },
})

let Sync = window.electronAPI.load_sync()
Sync(Store, router)
/*
^ It adds a route module into the store, which contains the state representing the current route:
store.state.route.path   // current path (string)
store.state.route.params // current params (object)
store.state.route.query  // current query (object)
*/

// Disable events that are meaningless in this context.

// Drag start is being able to click and drag a link inside the app to outside of it. Since the app is a local one, that link will just be a local file, and it won't be useful to anybody.
document.addEventListener('dragstart', function (event: any) {
  event.preventDefault()
})

// Dragover is the event that gets fired when a dragged item is on a droppable target, every few hundred milliseconds. We have no drop targets.
document.addEventListener('dragover', function (event: any) {
  event.preventDefault()
})

// Cancelling drop prevents anything from being dropped into the container. This can be a mild security risk, if someone can convince you (or somehow automate dropping inside the app container), it can make the container ping a web address. This also assumes the container has the dropped remote address whitelisted, though, so it's a long shot. Still, defence in depth is preferable.
document.addEventListener('drop', function (event: any) {
  event.preventDefault()
})

/*----------  Some basic keyboard shortcuts  ----------*/

Mousetrap.bind('mod+,', function () {
  history.back()
  // if (event.target.nodeName.toLowerCase() !== 'textarea' && event.target.nodeName.toLowerCase() !== 'input' && event.target.contentEditable !== 'true') {
  //   history.back()
  // }
})

Mousetrap.bind('mod+.', function () {
  history.forward()
  // if (event.target.nodeName.toLowerCase() !== 'textarea' && event.target.nodeName.toLowerCase() !== 'input' && event.target.contentEditable !== 'true') {
  //   history.forward()
  // }
})

Mousetrap.bind('mod+/', function () {
  router.push('/user/' + Store.state.localUser.fingerprint + '/notifications')
})

/*----------  IPC maps  ----------*/

/*
These are here instead of eipc/eipc-renderer because they do require access to things that are instantiated here, such as router, and there is no way to get to them without importing the main. Importing main is not an option. So these should be here until I split the router into its own service file that is imported separately. That way, eipc import from there, and not from main.
*/
window.electronAPI.RouteTo(function (route: string) {
  router.push(route)
  return
})

window.electronAPI.FullscreenState(function (isFullscreen: boolean) {
  Store.state.appIsFullscreen = isFullscreen
})

window.electronAPI.NewUpdateReady(function (newUpdateReady: boolean) {
  Store.state.newUpdateReady = newUpdateReady
})

/*----------  Exports  ----------*/

module.exports = { router: router }

/*========================================
=            Spell checker             =
========================================*/
// const HunspellAsm = require('hunspell-asm')
const ElectronHunspell = window.electronAPI.load_electron_hunspell()
const path = window.electronAPI.load_path()
const fs = window.electronAPI.load_fs()

ElectronHunspell.enableLogger(console)

const init = async () => {
  const browserWindowProvider = new ElectronHunspell.SpellCheckerProvider()
  ;(window as any).browserWindowProvider = browserWindowProvider
  await browserWindowProvider.initialize({
    // environment: HunspellAsm.ENVIRONMENT.NODE,
    locateBinary: function (file: any) {
      if (file.endsWith('.wasm')) {
        return 'node_modules/hunspell-asm/dist/cjs/lib/hunspell.wasm'
      }
      return file
    },
  })
  let dic = new ArrayBuffer(0)
  let aff = new ArrayBuffer(0)
  if (!isDev) {
    dic = fs.readFileSync(path.join(__dirname, '../app/dicts/en-US.dic'))
    aff = fs.readFileSync(path.join(__dirname, '../app/dicts/en-US.aff'))
  } else {
    dic = fs.readFileSync('src/app/ext_dep/dicts/en-US.dic')
    aff = fs.readFileSync('src/app/ext_dep/dicts/en-US.aff')
  }
  await browserWindowProvider.loadDictionary(
    'en',
    new Uint8Array(dic),
    new Uint8Array(aff)
  )
  const attached = await ElectronHunspell.attachSpellCheckProvider(
    browserWindowProvider
  )
  await attached.switchLanguage('en')
}
init()
/*=====  End of Spell checker   ======*/
