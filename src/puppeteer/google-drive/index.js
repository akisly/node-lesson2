const readline = require("readline");
const fs = require("fs");
const { google } = require("googleapis");

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/drive"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = __dirname + "/token.json";

/**
 * Create an OAuth2 client with the given credentials.
 * @return {object} Credentials for google drive.
 */
async function readCredentials() {
    try {
        const content = fs.readFileSync(__dirname + "/credentials.json");
        return JSON.parse(content);
    } catch (err) {
        return console.error(err);
    }
}

/**
 * Create an OAuth2 client with the given credentials.
 * @param {object} credentials Credentials for google drive.
 * @return {google.auth.OAuth2} oAuth2Client The OAuth2 client.
 */
async function authorize(credentials) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0]
    );

    try {
        const token = fs.readFileSync(TOKEN_PATH);
        oAuth2Client.setCredentials(JSON.parse(token));
        return oAuth2Client;
    } catch (err) {
        return await getAccessToken(oAuth2Client);
    }
}

/**
 * Get and store new token after prompting for user authorization.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 */
async function getAccessToken(oAuth2Client) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES
    });
    console.log("Authorize this app by visiting this url:", authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const code = await new Promise(resolve => {
        rl.question("Enter the code from that page here: ", code => {
            rl.close();
            resolve(code);
        });
    });
    oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error("Error retrieving access token", err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
            if (err) return console.error(err);
            console.log("Token stored to", TOKEN_PATH);
        });
        return oAuth2Client;
    });
}

/**
 * Upload file to your google drive account.
 * @param {google.auth.OAuth2} auth The OAuth2 client to get token for.
 * @param {String} filePath Path to upload file.
 * @return {object} Upload file on google drive.
 */
async function uploadFile(auth, filePath) {
    const drive = google.drive({ version: "v3", auth });
    const time = new Date().toLocaleTimeString("it-IT");
    const date = new Date().toLocaleDateString("it-IT");

    let file = await drive.files.create({
        requestBody: {
            name: `users_${date}_${time}.png`,
            mimeType: "image/png"
        },
        media: {
            mimeType: "image/png",
            body: fs.createReadStream(filePath)
        }
    });

    await drive.permissions.create({
        fileId: file.data.id,
        resource: {
            role: "reader",
            type: "anyone",
            allowFileDiscovery: true
        }
    });

    file = await drive.files.get({
        fileId: file.data.id,
        fields: "*"
    });

    return file;
}

module.exports = {
    readCredentials,
    authorize,
    uploadFile
};
