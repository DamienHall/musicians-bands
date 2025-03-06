const { db, DataTypes, Model } = require('../db');

// TODO - define the Song model
class Song extends Model {};
Song.init(
    {
        title: DataTypes.STRING,
        year: DataTypes.INTEGER,
        length: DataTypes.INTEGER,
    },
    {
        sequelize: db,
        modelName: "Song"
    }
);

Song.prototype.toMinutes = function() {
    return this.length / 60;
}

Song.getLongestSong = async function() {
    const longestSong = await Song.findOne({
        order: [['length', 'DESC']],
    });
    return longestSong;
};

module.exports = {
    Song
};