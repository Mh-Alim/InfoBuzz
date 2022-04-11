import React, { useState,useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from 'react-infinite-scroll-component';


const News = (props)=> {
 

  
  
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  // document.title = `${capitalizeFirstLetter(props.category)}-NewsMonkey`;
  
  
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async()=> {
    props.setProgress(10);

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pagesize=${props.pageSize}`;

    setLoading(true);
    
    let data = await fetch(url);
    props.setProgress(30)
    let parseData = await data.json();
    // console.log(parseData);
    props.setProgress(70)

    setArticles(parseData.articles);
    setTotalResults(parseData.totalResults);
    setLoading(false);
    
    props.setProgress(100);
  }


  const fetchMoreData = async () => {
    
    setPage(page+1);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pagesize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);

    
    setArticles(articles.concat(parseData.articles));
    setTotalResults(parseData.totalResults);
    setLoading(false);
  };


  useEffect(() => {
    updateNews();
  }, [])
  
  const handlePrevClick = async () => {

    setPage(page-1);
    updateNews();
  };

  const handleNextClick = async () => {
    setPage(page+1)
    updateNews();
  };
  
    return (
     <>
        <h1 className="text-center my-10" style={{ margin: "35px 0px" }}>
          NewaMonkey - Top Headlines{capitalizeFirstLetter(props.category)}
        </h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">

          <div className="row my-10">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                    />
                </div>
              );
            })}
          </div>
          </div>
        </InfiniteScroll>
        
      </>
    );
}

News.defaultProps = {
  country: "in",
  pageSize: 5,
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
