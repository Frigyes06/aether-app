"use strict";
// Services > Tooltips
Object.defineProperty(exports, "__esModule", { value: true });
var Tippy = require('../../../../node_modules/tippy.js');
module.exports = {
    Mount: function () {
        Tippy('[hasTooltip]', {
            animation: 'fade',
            delay: 100,
            duration: [100, 500],
            performance: true,
            // dynamicTitle: true,
            placement: 'top',
            theme: 'dark',
            offset: '0,-1',
            interactiveBorder: 10,
            // arrow: true,
            // arrowType: 'round',
            // size: 'small',
            // createPopperInstanceOnInit: true,
            // inertia: true
        });
    },
    MountInfomark: function () {
        Tippy('[hasInfomark]', {
            animation: 'fade',
            delay: 50,
            duration: [200, 500],
            performance: true,
            // dynamicTitle: true,
            placement: 'bottom',
            theme: 'infomark',
            // size: 'small',
            // inertia: true
            arrow: true,
            arrowType: 'round',
            hideOnClick: true,
            interactive: true,
            allowTitleHTML: true,
            interactiveBorder: 10,
            offset: '0,5',
            // trigger: 'click',
        });
    },
    MountGuidelightTooltip: function () {
        Tippy('[hasGuidelightTooltip]', {
            animation: 'fade',
            delay: 50,
            duration: [200, 500],
            performance: true,
            // dynamicTitle: true,
            placement: 'bottom',
            theme: 'infomark',
            // size: 'small',
            // inertia: true
            arrow: true,
            arrowType: 'round',
            hideOnClick: false,
            interactive: true,
            allowTitleHTML: true,
            interactiveBorder: 10,
            offset: '0,5',
            // trigger: 'click',
        });
    },
    MountMarker: function () {
        Tippy('[hasMarker]', {
            animation: 'fade',
            delay: 500,
            duration: [100, 500],
            performance: true,
            // dynamicTitle: true,
            // placement: 'top',
            theme: 'marker',
            offset: '0,0',
            interactiveBorder: 10,
            // arrow: true,
            // arrowType: 'round',
            // size: 'small',
            // createPopperInstanceOnInit: true,
            // inertia: true
        });
    },
    MountUsernameTooltip: function () {
        Tippy('[hasUsernameTooltip]', {
            animation: 'fade',
            delay: 50,
            duration: [200, 500],
            performance: true,
            // dynamicTitle: true,
            placement: 'bottom',
            theme: 'usernametooltip',
            // size: 'small',
            // inertia: true
            arrow: true,
            arrowType: 'round',
            hideOnClick: true,
            interactive: true,
            allowTitleHTML: true,
            interactiveBorder: 10,
            offset: '0,5',
            // trigger: 'click',
        });
    },
};
//# sourceMappingURL=tooltips.js.map