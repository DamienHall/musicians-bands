const { db } = require('./db');
const { Band, Musician, Song } = require('./index');
const seedData = require('./seeds/seeds');

describe('Band, Musician, and Song Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await db.sync({ force: true });
        await seedData();
    });

    test('can create a Band', async () => {
        const testBand = await Band.create({
            name: "Pink Floyd",
            genre: "Rock",
        });
        expect(testBand.name).toBe("Pink Floyd");
    });

    test('can create a Musician', async () => {
        const testMusician = await Musician.create({
            name: "David Gilmour",
            instrument: "Drums",
        });
        expect(testMusician.name).toBe("David Gilmour");
    });

    test('can create a Song', async () => {
        const testSong = await Song.create({
            title: "Comfortably Numb",
            year: 1979,
            length: 381
        });
        expect(testSong.year).toBe(1979);
    });

    test('can update a Band', async () => {
        const [affectedCount] = await Band.update(
            { genre: "Pop" },
            { where: { id: 1 } }
        );
        expect(affectedCount).toBe(1);

        const updatedBand = await Band.findOne({
            where: { name: "The Beatles" },
        });
        expect(updatedBand.genre).toBe("Pop");
    });

    test('can update a Musician', async () => {
        const [affectedCount] = await Musician.update(
            { instrument: "Vocals" },
            { where: { id: 1 } }
        );
        expect(affectedCount).toBe(1);

        const updatedMusician = await Musician.findOne({
            where: { name: "Ringo Star" },
        });
        expect(updatedMusician.instrument).toBe("Vocals");
    });

    test('can update a Song', async () => {
        const songToUpdate = await Song.findByPk(1);
        const [affectedCount] = await Song.update(
            { title: "Let It Be" },
            { where: { id: songToUpdate.id } }
        );
        expect(affectedCount).toBe(1);
    
        const updatedSong = await Song.findByPk(songToUpdate.id);
        expect(updatedSong.title).toBe("Let It Be");
    });

    test('can delete a Band', async () => {
        const trashBandToDelete = await Band.findByPk(1);
        const deleted = await trashBandToDelete.destroy();
        const allBands = await Band.findAll();
        expect(allBands.length).toBe(3);
    });

    test('can delete a Musician', async () => {
        const trashDrummerToDelete = await Musician.findByPk(1);
        const deleted = await trashDrummerToDelete.destroy();
        const allMusicians = await Musician.findAll();
        expect(allMusicians.length).toBe(2);
    });

    test('can delete a Song', async () => {
        const trashSongToDelete = await Song.findByPk(1);
        const deleted = await trashSongToDelete.destroy();
        const allSongs = await Song.findAll();
        expect(allSongs.length).toBe(3);
    });

    test('can increment and decrement showCount', async () => {
        const band = await Band.create({ name: "The Beatles", genre: "Rock", showCount: 0 });
    
        await band.increment('showCount', { by: 1 });
        await band.reload();
        expect(band.showCount).toBe(1);
    
        await band.decrement('showCount', { by: 1 });
        await band.reload();
        expect(band.showCount).toBe(0);
    });    

    test('can display band in a string', async () => {
        const band = await Band.create({ name: "Queen", genre: "Rock" });
        expect(band.toString()).toBe("Band: Queen Genre: Rock Show Count: 0")
    });    

    test('can return a song in minutes', async () => {
        const song = await Song.create({ title: "Test Song", year: 2025, length: 600 });
        expect(song.toMinutes()).toBe(10);
    });    

    test('can return the longest song', async () => {
        const longestSong = await Song.getLongestSong();
        expect(longestSong.title).toBe("Test Song");
    });

    test('can return all of a band\'s musicians', async () => {
        const testBand = await Band.create({ name: "Pink Floyd", genre: "Rock" });
        const musician1 = await Musician.create({ name: "David Gilmour", instrument: "Guitar" });
        const musician2 = await Musician.create({ name: "Nick Mason", instrument: "Drums" });
    
        await testBand.addMusician(musician1);
        await testBand.addMusician(musician2);
    
        const bandWithMusicians = await Band.findByPk(testBand.id, {
            include: Musician
        });
        expect(bandWithMusicians.Musicians.length).toBe(2);
        expect(bandWithMusicians.Musicians[0].name).toBe("David Gilmour");
        expect(bandWithMusicians.Musicians[1].name).toBe("Nick Mason");
    });
});