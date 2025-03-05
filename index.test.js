const { db } = require('./db');
const { Band, Musician, Song } = require('./index')

describe('Band, Musician, and Song Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await db.sync({ force: true });
    });

    test('can create a Band', async () => {
        const testBand = await Band.create({
            name: "The Beatles",
            genre: "Classic Rock",
        });
        expect(testBand.name).toBe("The Beatles");
    });

    test('can create a Musician', async () => {
        const testMusician = await Musician.create({
            name: "Ringo Star",
            instrument: "Drums",
        });
        expect(testMusician.name).toBe("Ringo Star");
    });

    test('can create a Song', async () => {
        const testSong = await Song.create({
            title: "Let It Be",
            year: 1970,
            length: 5000
        });
        expect(testSong.year).toBe(1970);
    });

    test('can update a Band', async () => {
        const [affectedCount] = await Band.update(
            { genre: "Bad" },
            { where: { name: "The Beatles" } }
        );
        expect(affectedCount).toBe(1);

        const updatedBand = await Band.findOne({
            where: { name: "The Beatles" },
        });
        expect(updatedBand.genre).toBe("Bad");
    });

    test('can update a Musician', async () => {
        const [affectedCount] = await Musician.update(
            { instrument: "Vocals" },
            { where: { name: "Ringo Star" } }
        );
        expect(affectedCount).toBe(1);

        const updatedMusician = await Musician.findOne({
            where: { name: "Ringo Star" },
        });
        expect(updatedMusician.instrument).toBe("Vocals");
    });

    test('can update a Song', async () => {
        const [affectedCount] = await Song.update(
            { title: "Here Comes The Sun" },
            { where: { title: "Let It Be" } }
        );
        expect(affectedCount).toBe(1);

        const updatedSong = await Song.findOne({
            where: { title: "Here Comes The Sun" },
        });
        expect(updatedSong.title).toBe("Here Comes The Sun");
    });

    test('can delete a Band', async () => {
        const trashBandToDelete = await Band.findByPk(1);
        const deleted = await trashBandToDelete.destroy();
        const allBands = await Band.findAll();
        expect(allBands.length).toBe(0);
    });

    test('can delete a Musician', async () => {
        const trashDrummerToDelete = await Musician.findByPk(1);
        const deleted = await trashDrummerToDelete.destroy();
        const allMusicians = await Musician.findAll();
        expect(allMusicians.length).toBe(0);
    });

    test('can delete a Song', async () => {
        const trashSongToDelete = await Song.findByPk(1);
        const deleted = await trashSongToDelete.destroy();
        const allSongs = await Song.findAll();
        expect(allSongs.length).toBe(0);
    });
})