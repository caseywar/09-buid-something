const pool = require('../utils/pool');

module.exports = class Setlist {
    id;
    track;
    artist;
    timesPlayed;

    constructor(row) {
        this.id = row.id;
        this.track = row.track;
        this.artist = row.artist;
        this.timesPlayed = row.times_played;
    }

    static async insert({ track, artist, timesPlayed }) {
        const { rows } = await pool.query(
            `INSERT INTO setlists (track, artist, times_played) VALUES ($1, $2, $3) RETURNING *`, [track, artist, timesPlayed]
        );
        return new Setlist(rows[0])
    }

    static async find() {
        const { rows } = await pool.query(`SELECT * FROM setlists`);

        return rows.map((row) => new Setlist(row));
    }
}