import EventEmetter from "events";

const eventInstance=new EventEmetter();

eventInstance.on('event1',function(){
    console.log('event1 called');
})

eventInstance.emit('event1')