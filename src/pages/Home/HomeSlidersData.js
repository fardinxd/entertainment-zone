export const heroSliderUrl = `${process.env.REACT_APP_SEARCH_URL}movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=nxt&page=1`;

export const contentListSliderData = [
  {
    id: 1,
    url: `${process.env.REACT_APP_TRENDING_URL}api_key=${process.env.REACT_APP_API_KEY}&page=1`,
    path: "/trending",
    heading: "Trending",
  },

  {
    id: 2,
    url: `${process.env.REACT_APP_MOVIES_URL}api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2`,
    path: "/movies",
    heading: "Movies",
  },

  {
    id: 3,
    url: `${process.env.REACT_APP_SERIES_URL}api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2`,
    path: "/series",
    heading: "TV Series",
  },
];
