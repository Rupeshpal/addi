const fs = require('fs');

function logReqRes(filename) {
  return (req, res, next) => {
    fs.appendFile(
      filename,
      `\n${Date.now()}: ${req.ip} ${req.method}: ${req.path}\n`,
      (err) => {
        if (err) {
          console.error('Error logging request:', err);
        }
        next();
      }
    );
  };
}

module.exports = logReqRes;
