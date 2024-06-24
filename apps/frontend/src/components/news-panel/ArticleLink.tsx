import React, { FC } from 'react';
import { MockNewsArticle } from '../../mock/news';

type ArticleLinkProps = {
  article: MockNewsArticle;
};

const ArticleLink: FC<ArticleLinkProps> = ({ article }) => {
  return (
    <div className="flex flex-col p-5 hover:text-red-500 cursor-pointer duration-300">
      <div className="truncate">{article.title}</div>
      <p className="text-right">{article.date}</p>
    </div>
  );
};

export default ArticleLink;
