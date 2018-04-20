'use strict';

let config = {
    is_block: false
};
initialize();

/**
 * Get current status and set browser icon.
 */
function initialize() {
    browser.storage.local.get().then((conf) => {
        config = conf;
        toggleJavaScriptListener();
        reloadIcon();
    });
}

function cancelScript() {
    return {cancel: config.is_block};
}
let handler = cancelScript;

/**
 * On Click, toggle JavaScript Enable/Disable.
 */
browser.browserAction.onClicked.addListener(() => {
    config.is_block = !config.is_block;
    browser.storage.local.set(config);
    toggleJavaScriptListener();
    reloadIcon();
});

/**
 * EventListener toggle
 */
function toggleJavaScriptListener() {
    if (!config.is_block) {
        browser.webRequest.onBeforeRequest.removeListener(handler);
    }
    else {
        browser.webRequest.onBeforeRequest.addListener(
            handler,
            {urls: ['<all_urls>'], types:['script']},
            ['blocking']
        );
    }
}

/**
 * Reload toolbar icon.
 */
function reloadIcon() {
    if (config.is_block) {
        browser.browserAction.setIcon({path: 'icons/icon_blocked.svg'});
    }
    else {
        browser.browserAction.setIcon({path: 'icons/icon.svg'});
    }
}