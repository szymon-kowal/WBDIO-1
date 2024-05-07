import { expect } from '@wdio/globals';
import IndexPage from '../../page-objects/pages/index.page.js';

const indexPage = new IndexPage();

describe('pastebin New Paste', () => {
    beforeEach(async () => {
        await indexPage.open();
        await indexPage.removePopups(2000);
    });

    it('should add text to text field', async () => {
        const inputStr = 'Hello from WebDriver';
        await indexPage.textArea.setValue(inputStr);
        expect(await indexPage.textArea.getValue()).toEqual(inputStr);
    });

    it('should open modal with expiration time selection after click on paste expiration span', async () => {
        await indexPage.expirationSpan.click();
        expect(indexPage.expirationSpanPopup).toBeDisplayed();
    });

    it('should select and display 10 min on paste expiration span', async () => {
        const expirationSpan = await indexPage.expirationSpan;
        await expirationSpan.click();

        const option = await indexPage.chooseOption('10M');
        await option.click();

        const selectedOptionText = await indexPage.expirationSpan.getText();

        expect(selectedOptionText).toEqual('10 Minutes');
    });

    it('should input title expiration', async () => {
        const titleInputField = indexPage.titleInputField;
        (await titleInputField).setValue('helloweb');
        expect(titleInputField).toHaveText(expect.stringContaining('helloweb'));
    });

    it('inputs data specified in task', async () => {
        const inputStr = 'Hello from WebDriver';
        const textArea = await indexPage.textArea;
        await textArea.setValue(inputStr);

        await indexPage.expirationSpan.click();

        await indexPage.chooseOption('10M').click();

        await indexPage.titleInputField.setValue('helloweb');

        await indexPage.submitBtn.click();

        // Waiting to see data displayed on new page
        // await browser.waitUntil(async () => {
        //     browser.pause(5000);
        // });
    });
});
