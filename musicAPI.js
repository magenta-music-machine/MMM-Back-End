const axios = require(`axios`);

let cache = {};



async function getMusic (request, response, next) {
  try {

    let timeToCache = 1000 * 60 * 60 * 24 * 30;
    // let cacheTest = 1000 * 20;
    if (cache && Date.now() - cache.timestamp < timeToCache) {
      console.log('It\'s in the cache!');
      response.status(200).send(cache.data);


    } else {
      console.log('It\'s not in the cache, so let\'s cache it!');
    let url = `http://api.napster.com/v2.2/tracks/top?apikey=${process.env.MUSIC_API_KEY}&limit=100`;
    let musicObj = await axios.get(url);
    let selectedCity = musicObj.data.tracks.map(music => new Music(music));
    cache = {
      data: selectedCity,
      timestamp: Date.now(),
    };

    response.status(200).send(selectedCity);
  }
  } catch(err) {
    next(err);
  }
};


class Music {
  constructor(music) {
    this.title = music.name;
    this.artistName = music.artistName;
    this.previewURL = music.previewURL;
    this.id = music.id;
    this.isExplicit = music.isExplicit;
    this.albumId = music.albumId;
    this.albumName = music.albumName;
  }
}


module.exports = getMusic;