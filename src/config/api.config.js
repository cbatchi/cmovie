const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "e5913863b171a9c2e4c9ac28ec527f02",
  originalImage: (imagePath) =>
    `https://image.tmdb.org/t/p/original/${imagePath}`,
  w500Image: (imagePath) => `https://image.tmdb.org/t/p/w500/${imagePath}`,
};

export const youtubeUrl = "https://www.youtube.com/embed/";

export default apiConfig;