import EventEmetter from "events";

const eventInstance=new EventEmetter();

eventInstance.on('event1',function(arg){
    console.log('event1 called',arg);
})

eventInstance.emit('event1',{id:1,message:"salam"})