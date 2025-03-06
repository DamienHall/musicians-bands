const { Band } = require('./models/Band')
const { Musician } = require('./models/Musician')
const { Song } = require("./models/Song")
// Define associations here

// one to many association
Band.hasMany(Musician);
Musician.belongsTo(Band);

// many to many association
Band.belongsToMany(Song, { through: "BandSongs"});
Song.belongsToMany(Band, { through: "BandSongs"});

module.exports = {
    Band,
    Musician,
    Song
};
