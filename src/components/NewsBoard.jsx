import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

const NewsBoard = ({ category, search }) => {
  const [articles, setArticles] = useState([]);
  const [originalCategory, setOriginalCategory] = useState(category);

  useEffect(() => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${import.meta.env.VITE_API_KEY}`;

    // Determine whether to include category or search term in the API query
    if (search) {
      url += `&q=${search}`;
    } else {
      url += `&category=${originalCategory}`;
    }

    fetch(url)
      .then(response => response.json())
      .then(data => setArticles(data.articles))
      .catch(error => {
        console.error('Error fetching data:', error);
        setArticles([]);
      });
  }, [originalCategory, search]);

  useEffect(() => {
    // Update originalCategory when category prop changes
    setOriginalCategory(category);
  }, [category]);

  return (
    <div>
      <h2 className="text-center mt-4">
        Latest <span className="badge bg-danger">News</span>
      </h2>
      {articles.length === 0 ? (
        <p className="text-center mt-4">No Result Found</p>
      ) : (
        articles.map((news, index) => (
          <NewsItem
            key={index}
            title={news.title}
            description={news.description}
            src={news.urlToImage}
            url={news.url}
          />
        ))
      )}
    </div>
  );
};

export default NewsBoard;
