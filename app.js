const yargs =require('yargs')
const notes = require('./notes');
yargs.version('1.0.0')


//add 
yargs.command({
    command:'add',
    describe:'add a new note',
    builder:{
        title:{
            describe:'note title',
            demandOption:true,
            type:'string'
        },
        body:{
            describe:'note contents',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title,argv.body);
    }
})
//remove
yargs.command({
    command:'remove',
    describe:'remove a note',
    builder:{
        title:{
            describe:'note title',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title)
    }
})
//get all
yargs.command({
    command:'ls',
    describe:'list all note',
    handler(){
        notes.listNote();
    }
})
//read 
yargs.command({
    command:'read',
    describe:'read a note',
    builder:{
        title:{
            describe:'note title',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        notes.getNote(argv.title);
    }
})

yargs.parse();