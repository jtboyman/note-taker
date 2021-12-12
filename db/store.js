const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const util = require('util'); //built into node util.Promisify when you create ntoes object strucutre it says make sure new ntoes meet this object strucutre it's a validation thing

const readfileAsync = util.promisify(fs.readFile); //this can be used as the read file method instead
const writefileAsync = util.promisify(fs.writeFile); //they make sure it's formatted right

// methods that deal with notes :)
class Notes {

    read() {
        return readfileAsync("db/db.json", "utf8");
    };

    write(note) {
        return writefileAsync("db/db.json", JSON.stringify(note));
    };

    getNotes() {
        return this.read().then(notes => {
            let notesArray;
            
            try {
                notesArray = [].concat(JSON.parse(notes));
            }
            catch (err) {
                notesArray = [];
            }
            return notesArray;
        });
    };

    addNotes(newNote) {
        
        newNote.id = uuidv4();

        this.getNotes().then(notesArray => {
            notesArray.push(newNote);
            this.write(notesArray);
        });
    };
    
}


module.exports = new Notes(); //it needs to be a function bc we're using it like a function, otherwise makes a constructor