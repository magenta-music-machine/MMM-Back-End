const axios = require(`axios`);

let cache = {};


async function getMusic (request, response, next) {
  try {
    let key = 'Data';

    let timeToCache = 1000 * 60 * 60 * 24 * 30;
    // let cacheTest = 1000 * 20;
    if (cache[key] && Date.now() - cache[key].timestamp < timeToCache) {
      console.log('It\'s in the cache!');
      res.status(200).send(cache[key].data);

    } else {
      console.log('It\'s not in the cache, so let\'s cache it!');
    let url = `http://api.napster.com/v2.2/tracks/top?apikey=${process.env.MUSIC_API_KEY}&limit=50`;
    let musicObj = await axios.get(url);
    console.log(musicObj.data);
    let selectedCity = musicObj.data.tracks.map(music => new Music(music));
    cache[key] = {
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
    this.isExplicit=music.isExplicit;
    this.id = music.id;

  }
}


module.exports = getMusic;