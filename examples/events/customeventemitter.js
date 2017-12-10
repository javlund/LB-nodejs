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

module.exports = DiceEmitter;
