const puppeteer = require("puppeteer");
const ScreenshotService = require("./service");
const GoogleDrive = require("../google-drive/index");

const FILEPATH = __dirname + "/users.png";

makeScreen = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("http://localhost:3000/users");
    await page.setViewport({ width: 1000, height: 500 });
    await page.screenshot({ path: FILEPATH });
    await browser.close();
};

makeScreen().then(async () => {
    const credentials = await GoogleDrive.readCredentials();
    const oAuth2Client = await GoogleDrive.authorize(credentials);
    const file = await GoogleDrive.uploadFile(oAuth2Client, FILEPATH);
    await ScreenshotService.addLink({ webViewLink: file.data.webViewLink });
});
