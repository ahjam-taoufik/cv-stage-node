
import Logger from './Logger.js'

const logger=new Logger()

logger.on('event1',function(){
    console.log('event1 called');
})

logger.log()

