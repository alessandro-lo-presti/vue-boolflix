var app = new Vue({
  el: "#app",
  data: {
    apiKey: "4ab0d1d0499ee909a6c7be564ccd102f",
    language: "it",
    flags: ["it", "en"],
    searchField: "",
    results: [],
    numGenres: [],
    genres: [],
    maxDescriptionLength: 300,
    filter: "all"
  },
  created() {
    // generi film
    axios
      .get(" https://api.themoviedb.org/3/genre/movie/list?api_key=4ab0d1d0499ee909a6c7be564ccd102f&language=en-US")
      .then((result) => {
        result.data.genres.forEach((e) => {
          if(!this.numGenres.includes(e.id)) {
            this.numGenres.push(e.id);
            this.genres.push(e.name);
          }
        });
      })
      .catch((error) => console.log(error));

      // generi serie
      axios
        .get(" https://api.themoviedb.org/3/genre/tv/list?api_key=4ab0d1d0499ee909a6c7be564ccd102f&language=en-US")
        .then((result) => {
          result.data.genres.forEach((e) => {
            if(!this.numGenres.includes(e.id)) {
              this.numGenres.push(e.id);
              this.genres.push(e.name);
            }
          });
        })
        .catch((error) => console.log(error));

        // ricerca automatica per riempire la pagina
        this.searchMovies("a");
        this.searchSeries("a");
  },
  methods: {
    // ricerca film
    searchMovies(search) {
      axios
        .get("https://api.themoviedb.org/3/search/movie", {
          params: {
            api_key: this.apiKey,
            language: this.language,
            query: search
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
    searchSeries(search) {

      axios
        .get("https://api.themoviedb.org/3/search/tv", {
          params: {
            api_key: this.apiKey,
            language: this.language,
            query: search
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
      let search = this.searchField;
      this.c = 1;
      this.results = [];
      this.searchMovies(search);
      this.searchSeries(search);
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
    //ottiene il genre
    getGenre(value, index) {
      let r
      (this.numGenres.includes(value)) ? r = this.genres[index] : r = "";
      return r;
    },
    // controllo per ridurre la lunghezza del campo overview
    lengthControl(text) {
      let newText = text.substring(0, this.maxDescriptionLength);

      if(newText.length == this.maxDescriptionLength && this.maxDescriptionLength != 0) {

        let i = 1;

        while(newText[this.maxDescriptionLength-i] != " ") {
          i++;
        }

        newText = newText.substring(0, this.maxDescriptionLength-i);
        newText += "...";

      }
      return newText;
    }
  }
});
