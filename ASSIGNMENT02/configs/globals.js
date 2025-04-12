require("dotenv").config();
// Global configurations object contains Application Level variables such as:
// client secrets, passwords, connection strings, and misc flags
const configurations = {
  ConnectionStrings: {
    MongoDB: process.env.CONNECTION_STRING_MONGODB,
  },
  Authentication: {
    GitHub: {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL
    },
  },
  Session: {
    sessionSecret: process.env.SESSION_SECRET,
  },
  
};
module.exports = configurations;