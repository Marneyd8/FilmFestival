import React from 'react';
import { newsArticles } from '../../mock/news';
import ArticleLink from './ArticleLink';
import { Link } from 'react-router-dom';

const NewsPanel = () => {
  // There should be useArticles... Hook
  return (
    <div className="flex flex-col">
      <div>
        {newsArticles.slice(0, 4).map((article) => (
          <ArticleLink article={article} />
        ))}
      </div>
      <Link
        to="/news"
        className="text-right mx-5 text-red-500 hover:text-red-700 duration-500"
      >
        See more...
      </Link>
    </div>
  );
};

export default NewsPanel;
