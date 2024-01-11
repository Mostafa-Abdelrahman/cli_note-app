const fs = require('fs');
const chalk = require('chalk');

const addNote= (title,body)=>{
    const notes= loadNote();
    const duplicate=notes.filter((note)=>{
        return note.title ===title
    })
    if(duplicate.length>0) {
        console.log(chalk.blue('already added,change title for new note'))
        return}
    notes.push({
        title:title,
        body:body
    })
    const notesJson=JSON.stringify(notes);
    fs.writeFileSync('./data.json',notesJson);
    console.log(chalk.green('done'));
}

const listNote=()=>{
    const notes=loadNote();
    if(!notes.length >0){
        console.log(chalk.red(`you don't have any notes`))
        return 
    }
    console.log(chalk.blue('your notes'));
    notes.forEach((note)=>{
    console.log(`${note.title}: ${note.body}`)
    }
    )
}

const loadNote=()=>{
    try{
        const dataBuffer=fs.readFileSync('./data.json')
        const dataJson=dataBuffer.toString();
        const data =JSON.parse(dataJson);
        return data;
    }
    catch(e){
        return [];
        }
}

const removeNote=(title)=>{
    const notes=loadNote();
    if(!notes.length>0){
        console.log(chalk.red(`you don't have any notes to delete`))
    }else{
        const newNote=notes.filter((note)=>note.title!==title)
        if(notes.length>newNote){
            const newNoteJson=JSON.stringify(newNote);
            fs.writeFileSync('./data.json', newNoteJson);
            console.log(chalk.green('deleted'));
        }else{
            console.log(chalk.red(`not exist already`))
        }
        
    }
}
const getNote=(title)=>{
    const notes=loadNote();
    if(!notes.length>0){
        console.log(chalk.red(`you don't have any notes to find`))
    }else{
        const note=notes.find((note)=> note.title===title)
        if(note)
            console.log(note.body);
        else
            console.log(chalk.red('not found'));
    }
    
}
module.exports={
    addNote,
    listNote,
    removeNote,
    getNote
}