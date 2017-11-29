module.exports = {
  name : 'Jacob',
  weight : 80,
  eat : function(kgs) {
    this.weight += kgs;
  },
  run : function(kms) {
    this.weight -= kms / 5;
  }
}
