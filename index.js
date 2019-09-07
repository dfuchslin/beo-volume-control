const denon = require('denon-avr')
const InputEvent = require('input-event')

const avr = new denon(new denon.transports.telnet({ host:  process.env.DENON_HOST, debug: false }))

avr.connect()
avr.on('connect', function() {

  const input = new InputEvent('/dev/input/event1')

  const keyboard = new InputEvent.Keyboard(input);
  keyboard.on('keypress', event => {
    if (event.code === 114) {
      // down
      console.log('volume down')
      avr.setVolumeDown((err, volume) => {
        if (err) {
          console.log(err.toString())
          return
        }
        console.log(`volume is now ${volume}`)
      })
    } else if (event.code === 115) {
      // up
      console.log('volume up')
      avr.setVolumeUp((err, volume) => {
        if (err) {
          console.log(err.toString())
          return
        }
        console.log(`volume is now ${volume}`)
      })
    }
  });

})
