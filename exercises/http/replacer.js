const fs = require('fs');

module.exports = {
  insertIntoHtml : (innerFunc, outer, cb) => {
    const placeholder = '[PLACEHOLDER]';
    const that = this;
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
        const inEscaped = that.convertLineBreaksToHtml(inTxt.toString());

        const result = outTxt.toString().replace(placeholder, inEscaped);
        cb(result);
      });
    });
  },
  convertLineBreaksToHtml : str => {
    return str.replace(/\n/g, '<br />');
  },
  cleanupPostedData : data => {
    return data.replace(/\+/g, ' ').replace(/%0D%0A/g, '\n') + '\n';
  }
}
