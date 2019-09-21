const axios = require("axios");

async function getMoviesFromGithub() {
  return await axios.get(process.env.MOVIES);
}

function filterByGenre(movie, genre) {
  return movie.genre.toLowerCase() == genre.toLowerCase();
}

function filterByCountry(movie, country) {
  return movie.country.toLowerCase() == country.toLowerCase();
}
function filterByAvgVote(movie, avgVote) {
  return movie.avg_vote >= Number(avgVote);
}

module.exports = {
  getMovies: async (req, res) => {
    const { genre, country, avg_vote } = req.query;
    let { status, data } = await getMoviesFromGithub();

    if (status != 200) {
      return res.status(status || 500).json({ error: "Unable to get movies" });
    }
    if (genre) {
      data = data.filter(filterByGenre);
    }

    if (country) {
      data = data.filter(filterByCountry);
    }

    if (avg_vote) {
      data = data.filter(filterByAvgVote);
    }
    res.json(data);
  }
};
