const puppeteer = require("puppeteer");
const GrabbingService = require("./service");

grabbingEmails = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("http://localhost:3000/users");
    await page.waitFor(1000);

    const grabbing = await page.evaluate(() => {
        const inputs = document.getElementsByClassName("email-input");
        const emails = [...inputs].map(input => input.value);

        return {
            emails
        };
    });

    await browser.close();
    return grabbing;
};

grabbingEmails().then(emails => {
    GrabbingService.addEmails(emails);
});
