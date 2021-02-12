var app = new Vue({
  el: "#app",
  data: {
    apiKey: "4ab0d1d0499ee909a6c7be564ccd102f",
    language: "it",
    flags: ["it", "en"],
    searchField: "",
    results: []
  },
  methods: {
    // ricerca film
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

          result.data.results.forEach((movie) => {
            this.getCast(movie, "movie")
          });

          this.results = this.results.concat(result.data.results);
          this.results.sort((a, b) => b.popularity - a.popularity);

        })
        .catch((error) => console.log(error));
    },
    // ricerca serie
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

          result.data.results.forEach((series) => {
            this.getCast(series, "tv")
          });

          this.results = this.results.concat(result.data.results);
          this.results.sort((a, b) => b.popularity - a.popularity);
        })
        .catch((error) => console.log(error));
    },
    // ricerca film e serie
    search() {
      this.c = 1;
      this.results = [];
      this.searchMovies();
      this.searchSeries();
    },
    // aggiungere il cast
    getCast(element, type) {

      axios
        .get(`https://api.themoviedb.org/3/movie/${element.id}/credits?api_key=${this.apiKey}`)
        .then((result) => {
          const newCast = result.data.cast.slice(0, 5);
          Vue.set(element, "cast", newCast);
          // this.$forceUpdate();
        })
        .catch((error) => {console.log(error)})

    },
    // controllo per ridurre la lunghezza del campo overview
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
