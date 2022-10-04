// Dependencies
const mongoose = require('./connection')
const Marvel = require('./marvel')

// Seed Script code
const db = mongoose.connection 

db.on('open', () => {
    const marvelMovies = [
        {actor: 'Tom Holland', heroName: 'Spider-Man', heroAlive: true, movies: 3},
        {actor: 'Chris Evans', heroName: 'Captain America', heroAlive: true, movies: 3},
        {actor: 'Scarlett Johansson', heroName: 'Black Widow', heroAlive: false, movies: 1},
        {actor: 'Robert Downey Jr', heroName: 'Iron-Man', heroAlive: false, movies: 3},
        {actor: 'Chris Hemsworth', heroName: 'Thor', heroAlive: true, movies: 4}
    ]

    Marvel.remove({})
      .then(deletedActors => {
        console.log('.remove returns:', deletedActors)

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