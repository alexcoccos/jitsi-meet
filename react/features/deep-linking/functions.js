/* global interfaceConfig */

import { URI_PROTOCOL_PATTERN } from '../base/util';
import { Platform } from '../base/react';

import {
    DeepLinkingDesktopPage,
    DeepLinkingMobilePage,
    NoMobileApp
} from './components';
import { _shouldShowDeepLinkingDesktopPage }
    from './shouldShowDeepLinkingDesktopPage';

/**
 * Generates a deep linking URL based on the current window URL.
 *
 * @returns {string} - The generated URL.
 */
export function generateDeepLinkingURL() {
    // If the user installed the app while this Component was displayed
    // (e.g. the user clicked the Download the App button), then we would
    // like to open the current URL in the mobile app. The only way to do it
    // appears to be a link with an app-specific scheme, not a Universal
    // Link.
    const appScheme = interfaceConfig.APP_SCHEME || 'org.jitsi.meet';

    // Replace the protocol part with the app scheme.

    return window.location.href.replace(
            new RegExp(`^${URI_PROTOCOL_PATTERN}`), `${appScheme}:`);
}

/**
 * Resolves with the component that should be displayed if the deep linking page
 * should be shown and with <tt>undefined</tt> otherwise.
 *
 * @param {Object} state - Object containing current redux state.
 * @returns {Promise<Component>}
 */
export function getDeepLinkingPage(state) {
    const { room } = state['features/base/conference'];

    // Show only if we are about to join a conference.
    if (!room) {
        return Promise.resolve();
    }

    const OS = Platform.OS;
    const isUsingMobileBrowser = OS === 'android' || OS === 'ios';

    if (isUsingMobileBrowser) { // mobile
        const mobileAppPromo
            = typeof interfaceConfig === 'object'
                && interfaceConfig.MOBILE_APP_PROMO;

        return Promise.resolve(
            typeof mobileAppPromo === 'undefined' || Boolean(mobileAppPromo)
                ? DeepLinkingMobilePage : NoMobileApp);
    }

    // desktop
    const { launchInWeb } = state['features/deep-linking'];

    if (launchInWeb) {
        return Promise.resolve();
    }

    return _shouldShowDeepLinkingDesktopPage().then(
        // eslint-disable-next-line no-confusing-arrow
        show => show ? DeepLinkingDesktopPage : undefined);
}

/**
 * Opens the desktop app.
 *
 * @returns {void}
 */
export function openDesktopApp() {
    window.location.href = generateDeepLinkingURL();
}
