const EventEmitter = require('events');

class DiceEmitter extends EventEmitter {
  constructor() {
    super();
    setInterval(this.roll.bind(this), 800);
  }

  roll() {
    const value = Math.floor(Math.random() * 6) + 1;
    this.emit('roll', value);
    if(value == 6) {
      this.emit('six', value);
    }
  }
}

const dice = new DiceEmitter();

dice.on('roll', value => {
  console.log('Terningerne kastes, og vi fik ', value);
});

dice.on('six', () => {
  console.log('Hurra, det var en sekser!');
});
