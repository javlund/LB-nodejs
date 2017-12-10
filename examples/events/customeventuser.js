const DiceEmitter = require('./customeventemitter');

const dice = new DiceEmitter();

dice.on('roll', value => {
  console.log('Terningerne kastes, og vi fik ', value);
});

dice.on('six', () => {
  console.log('Hurra, det var en sekser!');
});
