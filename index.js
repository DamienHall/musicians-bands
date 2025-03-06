const { Band } = require('./models/Band')
const { Musician } = require('./models/Musician')
const { Song } = require("./models/Song")
// Define associations here

// one to many association
Band.hasMany(Musician);
Musician.hasOne(Band);

// many to many association
Band.hasMany(Song);
Song.hasMany(Band);

module.exports = {
    Band,
    Musician,
    Song
};
