const { db, DataTypes, Model } = require('../db');

// TODO - define the Band model
class Band extends Model {};
Band.init(
    {
        name: DataTypes.STRING,
        genre: DataTypes.STRING,
        showCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
    {
        sequelize: db,
        modelName: "Band"
    }
);

Band.prototype.toString = function() {
    return `Band: ${this.name} Genre: ${this.genre} Show Count: ${this.showCount}`;
};

module.exports = {
    Band
};