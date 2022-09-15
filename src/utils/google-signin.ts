import { google } from "googleapis";
import fs from "fs";

export const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:3000/api/google-oauth-callback"
);

export const generateURL = () => {
  const scopes = [
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/photoslibrary.readonly",
    "https://www.googleapis.com/auth/photoslibrary.sharing",
  ];

  const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: "offline",

    // If you only need one scope you can pass it as a string
    scope: scopes,
  });
  return url;
};

export const saveRefreshToken = (refreshToken: string) => {
  console.log(refreshToken);
  fs.writeFileSync(
    "./galleryInfo.json",
    JSON.stringify({
      refreshToken,
    })
  );
};

export const loadRefreshToken = () => {
  const restoredInfo = JSON.parse(
    fs.readFileSync("./galleryInfo.json", "utf8")
  );
  return restoredInfo.refreshToken;
};

export const getCalendar = () => {
  const refreshToken = loadRefreshToken();
  oauth2Client.setCredentials({ refresh_token: refreshToken });
  return google.calendar({ version: "v3", auth: oauth2Client });
};

export const getGoogleAuth = () => {
  const refreshToken = loadRefreshToken();
  oauth2Client.setCredentials({ refresh_token: refreshToken });
  return oauth2Client;
};
