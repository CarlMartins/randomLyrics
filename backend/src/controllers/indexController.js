const baseUrl = require('../services/api');
const axios = require('axios').default;
const rndInt = require('../helpers/randomNumber');


exports.Song = (req, res) => {
  let finalData = {};

  getArtistData()
    .then((artistData) => {
      return getRandomSongId(artistData);
    })
    .then((songData) => {
      finalData.song_data = songData;
      return getFinalSong(songData.song_id);
    })
    .then((finalSong) => {
      finalData.song_data.lyrics = finalSong.lyrics;
      res.send(finalData);
    })
    .catch((err) => res.send(err));
};

const getArtistData = async () => {
  let artistId = 0;
  let availableSongs = 0;

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
    artist_data: artistData,
    available_songs: availableSongs
  };
};

const getRandomSongId = async (artistData) => {
  let songIds = [];
  for (let i = 0; i < artistData.available_songs; i++) {
    songIds.push([artistData.artist_data[i].track.track_id, artistData.artist_data[i].track.track_name]);
  }

  let finalSong = songIds[rndInt(songIds.length) - 1];
  let artist_name = artistData.artist_data[0].track.artist_name;

  return {
    song_id: finalSong[0],
    song_name: finalSong[1],
    artist_name: artist_name
  };
};

const getFinalSong = async (songId) => {

  let finalSong = await axios.get(`${baseUrl.baseUrl}/matcher.lyrics.get?track_id=${songId}&apikey=${baseUrl.apikey}`);
  let lyrics = finalSong.data.message.body.lyrics.lyrics_body;

  return {
    lyrics: lyrics
  };
};