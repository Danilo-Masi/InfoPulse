//Axios
import axios from 'axios';
//API key
const apiKey = import.meta.env.VITE_API_KEY;

//Funzione per ricercare le news piu recenti
export const getTopNews = async () => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}&pageSize=100`
    );
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching top news:', error);
    return [];
  }
};

//Funzione per ricercare le news in base ad una parola chiave
export const getNewsBySearch = async (srcString) => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${srcString}&sortBy=relevancy&apiKey=${apiKey}&pageSize=12`
    );
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news by search:', error);
    return [];
  }
}

//Funzione per ricercare le news in base ad una categoria
export const getNewsByCategory = async (category) => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}&pageSize=100`
    );
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news by catgory:', error);
    return [];
  }
}
