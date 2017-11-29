const fs = require('fs');

function convertLineBreaksToHtml(str) {
  return str.replace(/\n/g, '<br />');
}

module.exports = {
  insertIntoHtml : (innerFunc, outer, callback) => {
    const placeholder = '[PLACEHOLDER]';
    fs.readFile(outer, (err, outTxt) => {
      if(err) {
        console.error(err);
        process.exit();
      }
      innerFunc((err, inTxt) => {
        if(err) {
          console.error(err);
          process.exit();
        }
        const inEscaped = convertLineBreaksToHtml(inTxt.toString());

        const result = outTxt.toString().replace(placeholder, inEscaped);
        callback(result);
      });
    });
  },
  cleanupPostedData : data => {
    return data.replace(/\+/g, ' ').replace(/%0D%0A/g, '\n') + '\n';
  },
  convertLineBreaksToHtml
}
