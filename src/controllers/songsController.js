const request = require('request');
const randomNumber = require('../helpers/randonNumber');

const api = {
    apikey: '4f81a3066ca06bac4a95816bb378378b',
    baseUrl: 'https://api.musixmatch.com/ws/1.1'
};


function getSongInfo(cb) {
    let randomId = randomNumber();
    let newUrl = `${api.baseUrl}/track.get?commontrack_id=${randomId}&apikey=${api.apikey}`;
    request.get(newUrl, { json: true }, (err, req, body) => {
        if (err) return cb(err);
        return cb(body);
    });
};

function getLyrics(track_id, cb) {
    let newUrl = `${api.baseUrl}/track.lyrics.get?track_id=${track_id}&apikey=${api.apikey}`;
    request.get(newUrl, { json: true }, (err, req, body) => {
        if (err) return cb(err);
        return cb(body);
    });
};

exports.getSong = (req, res) => {
    getSongInfo((content) => {
        let hasLyrics = content.message.body.track.has_lyrics;
        if (hasLyrics) {
            let track_id = content.message.body.track.track_id;
            getLyrics(track_id, (lyrics) => {
                return res.json({
                    'lyrics': lyrics.message.body.lyrics.lyrics_body,
                    'artist': content.message.body.track.artist_name,
                    'song_name': content.message.body.track.track_name,
                });
            });
        };
    });
};
