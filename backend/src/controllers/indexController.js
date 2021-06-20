const baseUrl = require('../services/api');
const axios = require('axios').default;
const rndInt = require('../helpers/randomNumber');


exports.Song = (req, res) => {
  getArtistData()
    .then((artistData) => {
      getRandomSong(artistData)
        .then((randomSong) => {
          getFinalSong(randomSong)
            .then((finalSong) => {
              res.send(finalSong);
            });
        });
    })
    .catch((err) => res.send(err));
};

const getArtistData = async () => {
  let artistId = 0;

  try {
    do {
      artistId = rndInt(300000);
      tempData = await axios.get(`${baseUrl.baseUrl}track.search?s_track_rating=desc&f_has_lyrics=1&page_size=100&f_artist_id=${artistId}&apikey=${baseUrl.apikey}`);
      availableSongs = tempData.data.message.header.available;
    } while (availableSongs == 0);
  } catch (error) {
    return "Falha";
  }

  let artistData = tempData.data.message.body.track_list;

  return {
    artistData: artistData,
    availableSongs: availableSongs
  };
};

const getRandomSong = async (artistData) => {
  let songIds = [];
  for (let i = 0; i < artistData.availableSongs; i++) {
    songIds.push(artistData.artistData[i].track.track_id);
  }

  let finalSong = 0;
  finalSong = songIds[rndInt(songIds.length) - 1];
  return finalSong;
};

const getFinalSong = async (songId) => {
  let finalSong = await axios.get(`${baseUrl.baseUrl}/matcher.lyrics.get?track_id=${songId}&apikey=${baseUrl.apikey}`);

  return finalSong.data.message.body.lyrics.lyrics_body;
};