import DefaultPage from '../default.page.js';
import { browser, $ } from '@wdio/globals';

export default class IndexPage extends DefaultPage {
    async open() {
        await super.open('https://pastebin.com/');
    }
    get textArea() {
        return $('.form-group #postform-text');
    }

    get expirationSpan() {
        return $('#select2-postform-expiration-container[role="textbox"]');
    }

    get expirationSpanPopup() {
        return $('#select2-postform-expiration-results');
    }

    chooseOption(optionNameStr) {
        return $(`li[id$="${optionNameStr}"]`);
    }

    get titleInputField() {
        return $('#postform-name');
    }

    get submitBtn() {
        return $('.btn.-big');
    }
    async removePopups(pauseTime) {
        // Close modal pop-up about cookies
        (await $('.css-47sehv')).click();
        // Close advertising banner displayed on bottom of page
        await browser.pause(pauseTime);
        (await $('#hideSlideBanner')).click();
    }
}
