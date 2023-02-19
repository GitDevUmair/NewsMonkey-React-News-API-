import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinnerr from "./Spinnerr";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?category=${props.category}&country=${props.country}&apikey=41ea95849e024993bae4e00ec7ece127&page=${page}&pagesize=${props.pageSize}`;
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };
  useEffect(() => {
    document.title = `${capitalize(props.category)} - NewsMonkey`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?category=${
      props.category
    }&country=${props.country}&apikey=41ea95849e024993bae4e00ec7ece127&page=${
      page + 1
    }&pagesize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };
  //const handlePrevious = async () => {
  //   setPage(
  //      page - 1,
  //   )
  //   updateNews();
  // };
  // const handleNext = async () => {
  //   setPage(
  //    page + 1,
  //   )
  //   updateNews();
  // };

  return (
    <>
      <h1
        className="text-center"
        style={{ margin: "35px 0px", marginTop: "90px" }}
      >
        Top {capitalize(props.category)} Headlines for today
      </h1>
      {loading && <Spinnerr />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinnerr />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : " "}
                    description={
                      element.description ? element.description : " "
                    }
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://free4kwallpapers.com/uploads/originals/2020/01/22/just-a-very-random-forest-in-the-uk-oc-wallpaper.jpg"
                    }
                    newsUrl={element.url}
                    author={element.author ? element.author : "Anonymous"}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>

      {/* <Container className="d-flex justify-content-between my-2">
          <Button
            variant="dark"
            disabled={page <= 1}
            onClick={handlePrevious}
          >
            &larr; Previous
          </Button>
          <Button
            variant="dark"
            onClick={handleNext}
            disabled={
              page + 1 >
              Math.ceil(totalResults / props.pageSize)
            }
          >
            Next &rarr;
          </Button>
        </Container> */}
    </>
  );
};
News.defaultProps = {
  country: "us",
  category: "general",
  pageSize: 10,
};
News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pageSize: PropTypes.number,
};
export default News;
