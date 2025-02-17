require('dotenv').config();
const mongoose = require('mongoose')

// if (process.argv.length<3) {
//   console.log('give password as argument')
//   process.exit(1)
// }

// const password = process.argv[2]

const url = process.env.MONGODB_URI

if (!url) {
  console.error("MONGODB_URI is not set in the environment variables");
  process.exit(1);
}

mongoose.set('strictQuery',false)

mongoose.connect(url)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Connection error:", err));
  

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})


const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'Callback-functions suck',
  important: true,
})

// Note.find({}).then(result => {
//     result.forEach(note => {
//       console.log(note)
//     })
//     mongoose.connection.close()
//   })

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})