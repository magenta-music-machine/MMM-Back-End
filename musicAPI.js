const axios = require(`axios`);



let getMusic =  async (request, response, next) => {
  try {
    let url = `http://api.napster.com/v2.2/tracks/top?apikey=${process.env.MUSIC_API_KEY}&limit=50`;
    let musicObj = await axios.get(url);
    console.log(musicObj.data);
    let selectedCity = musicObj.data.results.map(music => new Music(music));
    response.status(200).send(selectedCity);
  } catch(err) {
    next(err);
  }
};


class Music {
  constructor(music) {
    this.title = music.name;
    this.artist = music.artist.name;
    this.song = music.sample
    this.id = music.id;
  }
}


module.exports = getMusic;