// Dependencies
const mongoose = require('./connection')
const Marvel = require('./marvel')

// Seed Script code
const db = mongoose.connection 

db.on('open', () => {
    const marvelMovies = [
        {character: 'Peter Parker', heroName: 'Spider-Man', heroAlive: true, movies: 3},
        {character: 'Steve Rogers', heroName: 'Captain America', heroAlive: true, movies: 3},
        {character: 'Natasha Romanoff', heroName: 'Black Widow', heroAlive: false, movies: 1},
        {character: 'Tony Stark', heroName: 'Iron-Man', heroAlive: false, movies: 3},
        {character: 'Thor Odinson', heroName: 'Thor', heroAlive: true, movies: 4}
    ]

    Marvel.remove({})
      .then(deletedCharacters => {
        console.log('.remove returns:', deletedCharacters)

        Marvel.create(marvelMovies)
        .then(data => {
            console.log('Newly created characters:', data)
            db.close()
        })
        .catch(error => {
            console.log(error)
            db.close()
        })
      })
     .catch(error => {
        console.log(error)
        db.close()
     })
})