var app = new Vue({
  el: "#app",
  data: {
    apiKey: "4ab0d1d0499ee909a6c7be564ccd102f",
    language: "it",
    searchField: "",
    movies: [],
    tvSeries: []
  },
  methods: {
    searchMovies() {
      axios
      .get("https://api.themoviedb.org/3/search/movie", {
        params: {
          api_key: this.apiKey,
          language: this.language,
          query: this.searchField
        }
      })
      .then((result) => {
        this.movies = result.data.results;
      })
      .catch((error) => console.log(error));
    },
    searchSeries() {
      axios
      .get("https://api.themoviedb.org/3/search/tv", {
        params: {
          api_key: this.apiKey,
          language: this.language,
          query: this.searchField
        }
      })
      .then((result) => {
        this.tvSeries = result.data.results;
      })
      .catch((error) => console.log(error));
    },
    search() {
      this.searchMovies();
      this.searchSeries();
    },
    lengthControl(text, max) {
      let newText = text.substring(0, max);

      if(newText.length == max && max != 0) {

        let i = 1;

        while(newText[max-i] != " ") {
          i++;
        }

        newText = newText.substring(0, max-i);
        newText += "...";

      }
      return newText;
    }
  }
});
