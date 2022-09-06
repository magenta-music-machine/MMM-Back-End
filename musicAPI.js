const axios = require(`axios`);



let getMusic =  async (request, response, next) => {
  try {
    let title = request.query.title;
    let url = `http://api.napster.com/v2.2/tracks/top?apikey=${process.env.MUSIC_API_KEY}&limit=50`;
    let musicObj = await axios.get(url);
    console.log(musicObj.data);
    let selectedCity = musicObj.data.results.map( => new Music(music));
    response.status(200).send(selectedCity);
  } catch(err) {
    next(err);
  }
};


class Music {
  constructor(music) {
    this.title = movie.title;
    this.overview = movie.overview;
    this.img = movie.poster_path ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path : '';
    this.id = movie.id;
  }
}


module.exports = getMusic;