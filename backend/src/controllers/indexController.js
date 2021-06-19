const baseUrl = require('../services/api');
const axios = require('axios').default;


exports.Song = (req, res) => {
  getSongData()
    .then((value) => {
      res.send(value);
    })
    .catch((err) => res.send(err));
};

const getSongData = async () => {
  let songData = {};
  try {
    do {
      let artistId = rndInt();
      songData = await axios.get(`${baseUrl.baseUrl}track.search?s_track_rating=desc&f_has_lyrics=1&page_size=100&f_artist_id=${artistId}&apikey=${baseUrl.apikey}`);
      console.log(songData.data.message.header.available);
    } while (songData.data.message.header.available == 0);
  } catch (error) {
    return "Falha";
  }
  return songData.data;
};

function rndInt() {
  let result = Math.floor(Math.random() * 300000) + 1;
  return result;
};