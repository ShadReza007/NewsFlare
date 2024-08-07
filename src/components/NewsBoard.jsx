import React, { useEffect, useState } from "react";
import axios from 'axios';
import NewsItem from "./NewsItem";

const NewsBoard = ({ category, search }) => {
  const [articles, setArticles] = useState([]);
  const [originalCategory, setOriginalCategory] = useState(category);

  useEffect(() => {
    let url = `https://gnews.io/api/v4/top-headlines?apikey=fb2c1ce2ccb0c657ae9c6703a606a6c9&country=in`;

    // Determine whether to include category or search term in the API query
    if (search) {
      url += `&q=${search}`;
    } else if (originalCategory) {
      url += `&category=${originalCategory}`;
    }

    fetch(url)
      .then(response => response.json())
      .then(async (data) => {
        const articlesWithProbabilities = await Promise.all(data.articles.map(async (article) => {
          try {
            const options = {
              method: 'GET',
              url: 'https://ai-detection2.p.rapidapi.com/',
              params: {
                text: article.title
              },
              headers: {
                'x-rapidapi-key': '596d785178msh1dac51d942852bcp1064e0jsnaf7469adf3ee',
                'x-rapidapi-host': 'ai-detection2.p.rapidapi.com'
              }
            };
            const response = await axios.request(options);
            return {
              ...article,
              realProbability: response.data.real_probability,
              fakeProbability: response.data.fake_probability
            };
          } catch (error) {
            console.error('Error detecting content:', error);
            return article; // Return article without probabilities if error occurs
          }
        }));

        setArticles(articlesWithProbabilities);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setArticles([]);
      });
  }, [originalCategory, search]);

  useEffect(() => {
    // Update originalCategory when category prop changes
    setOriginalCategory(category);
  }, [category]);

  // Determine the header text based on whether a category is provided
  const headerText = category ? `${category.charAt(0).toUpperCase() + category.slice(1)} ` : 'Latest News';

  return (
    <div>
      <h2 className="text-center mt-4">
        {headerText} <span className="badge bg-danger">News</span>
      </h2>
      {articles.length === 0 ? (
        <p className="text-center mt-4">No Result Found</p>
      ) : (
        articles.map((news, index) => (
          <NewsItem
            key={index}
            title={news.title}
            description={news.description}
            src={news.image}
            url={news.url}
            realProbability={news.realProbability}
            fakeProbability={news.fakeProbability}
          />
        ))
      )}
    </div>
  );
};

export default NewsBoard;
