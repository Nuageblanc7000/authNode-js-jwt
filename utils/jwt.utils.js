const jsonwebtoken = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const jwt = {
  generate: ({ id }) => {
    return new Promise((resolve, reject) => {
      const secret = JWT_SECRET;
      const payload = { id };
      const options = {
        algorithm: "HS256",
        expiresIn: "10d",
      };
      jsonwebtoken.sign(payload, secret, options, (error, token) => {
        if (error) {
          reject(error);
        }
        resolve(token);
      });
    });
  },

  decode: (token) => {
    console.log(token);
    return new Promise((resolve, reject) => {
      const options = {};
      jsonwebtoken.verify(token, JWT_SECRET, options, (error, payload) => {
        if (error) {
          reject(error);
        } else {
          console.log(payload);
          resolve(payload);
        }
      });
    });
  },
};

module.exports = jwt;
