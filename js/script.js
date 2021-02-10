var app = new Vue({
  el: "#app",
  data: {
    apiKey: "4ab0d1d0499ee909a6c7be564ccd102f",
    language: "it",
    search: "",
    movies: []
  },
  methods: {
    searchMovies() {
      axios
      .get("https://api.themoviedb.org/3/search/movie", {
        params: {
          api_key: this.apiKey,
          language: this.language,
          query: this.search
        }
      })
      .then((result) => {
        this.movies = result.data.results;
      })
      .catch((error) => console.log(error));
    }
  }
});
