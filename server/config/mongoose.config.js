const mongoose = require('mongoose');
const dbname = "Explorerdb";

mongoose.connect(`mongodb://localhost/${dbname}`)
.then(() => console.log(`Established a connection to the ${dbname} database`))
.catch((err)=>console.log(err));