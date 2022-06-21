import EventEmetter from 'events'


class Logger extends EventEmetter {
    log(){
        console.log('message from log');
        this.emit('event1')
    }

}

export default Logger;