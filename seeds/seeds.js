const { Band } = require('../models/Band');
const { Musician } = require('../models/Musician');
const { Song } = require("../models/Song");

const seedData = async () => {
  await Band.bulkCreate([
      { name: "The Beatles", genre: "Rock", showCount: 100 },
      { name: "Queen", genre: "Rock", showCount: 120 },
      { name: "Adele", genre: "Pop", showCount: 50 }
  ]);

  await Musician.bulkCreate([
      { name: "Ringo Star", instrument: "Drums" },
      { name: "Freddie Mercury", instrument: "Vocals" }
  ]);

  await Song.bulkCreate([
      { title: "Hey Jude", year: 1973, length: 420 },
      { title: "Bohemian Rhapsody", year: 1975,  length: 354 },
      { title: "Someone Like You", year: 2011, length: 285 }
  ]);
};

module.exports = seedData;