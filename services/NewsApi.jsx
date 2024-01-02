//Axios
import axios from 'axios';
//API key
const apiKey = import.meta.env.VITE_API_KEY;

export const getTopNews = async () => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}&pageSize=16`
    );
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching top news:', error);
    console.log( "API KEY: " + key);
    return [];
  }
};

export const getNewsBySearch = async (srcString) => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${srcString}&apiKey=${apiKey}&pageSize=16`
    );
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching top news:', error);
    return [];
  }
}
