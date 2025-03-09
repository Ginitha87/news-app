import React, { useState, useEffect, useCallback } from "react";
import "./DisplayNewsList.css";
import Skeleton from "../Skeleton/Skeleton";
import { NewsListProps } from "./DisplayNewsTypes";
import { READ_MORE } from "../../constants/appConstants";

const DisplayNewsList: React.FC<NewsListProps> = ({
  articles,
  articlesPerPage = 50,
}) => {
  const [currentArticles, setCurrentArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreArticles, setHasMoreArticles] = useState(true);

  // Function to load more articles when the user scrolls
  const loadMoreArticles = useCallback(() => {
    if (isLoading || currentArticles.length >= articles.length) return;

    setIsLoading(true);

    const newArticles = articles.slice(
      currentArticles.length,
      currentArticles.length + articlesPerPage
    );
    setCurrentArticles((prevArticles) => [...prevArticles, ...newArticles]);

    // Check if we have loaded all articles
    if (currentArticles.length + articlesPerPage >= articles.length) {
      setHasMoreArticles(false); // No more articles to load
    }

    setIsLoading(false);
  }, [currentArticles, articles, isLoading, articlesPerPage]);

  // Handle scroll event to detect when the user reaches the bottom of the page
  const handleScroll = () => {
    const scrollPosition =
      window.innerHeight + document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const threshold = 100; // Use a threshold value (e.g., 100px)

    // Check if the user is near the bottom of the page
    if (scrollPosition + threshold >= scrollHeight && hasMoreArticles) {
      loadMoreArticles();
    }
  };

  // Initialize first set of articles when the component mounts
  useEffect(() => {
    if (articles && articles.length > 0) {
      setCurrentArticles(articles.slice(0, articlesPerPage));
    }
  }, [articles]);

  // Scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <div className="news-list">
        {currentArticles.length > 0 ? (
          currentArticles.map((article, index) => (
            <div key={index} className="news-item">
              <div>
                <h2>{article.title}</h2>
                <p>{article.author}</p>
                <p>{article.description}</p>
                {article.url && (
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {READ_MORE}
                  </a>
                )}
              </div>
              <div>
                {article.imageUrl && (
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="article-image"
                  />
                )}
              </div>
            </div>
          ))
        ) : (
          <>
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} skeletonLength={2} />
            ))}
          </>
        )}
      </div>

      {isLoading && (
        <div className="loading">
          {isLoading ? <div className="spinner"></div> : ""}
        </div>
      )}
    </>
  );
};

export default DisplayNewsList;
