import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {



  static defaultProps = {
    country: 'in',
    pageSize: 9
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number
  }

  constructor(props) {  // this runs first, then render method, and then componentDidMount
    super(props);
    console.log('constructor called for news component');
    this.state = {  // we can create/initialise state in the constructor
      articles: [],
      loading: false,
      page: 1,
      pageCount: 0,
      totalResults: 0
    }
  }

  async updateNews() {
    console.log('updateNews called');
    this.setState({
      loading: true
    });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=931671572e914878af3954b3e9b042f8&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    //console.log(parsedData);
    //let parsedData = this.myArticles;
    this.setState({
      articles: parsedData.articles,
      pageCount: Math.ceil(parsedData.totalResults / this.props.pageSize),
      loading: false,
      totalResults: parsedData.totalResults
    });
    document.title = "24x7 News | " + this.props.category;
    //console.log('page: ',this.state.page,parsedData);
  }

  async componentDidMount() {  // this function runs after the render method, this is called only once, and NOT called when the component almost instantly rerenders when a state variable changes
    console.log('componentDidMount called');
    this.updateNews();
  }

  // nextPage = async () => {
  //   this.setState({
  //     page: this.state.page + 1
  //   });
  //   this.updateNews();
  // }

  // previousPage = async () => {
  //   this.setState({
  //     page: this.state.page - 1
  //   });
  //   this.updateNews();
  // }

  fetchMoreData = async () => {
    console.log('fetchMoreDate called');
    console.log('zzzzzz1: ',this.state.page); // here this.state.page = 1
    this.setState({
      page: this.state.page + 1,  
      loading: true
    });
    console.log('zzzzzz2: ',this.state.page); // HERE ALSO, this.state.page = 1, VALUE OF PAGE HAS NOT YET UPDATED, 
    // THATS WHY WE HAVE TO DO {this.state.page+1} in the below url
    
    //this.updateNews();
    // this.setState({
    //   loading: true
    // });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=36187514d6764ee19f2512ac39e828a7&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //console.log('zzzzzz: ',this.state.page);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    //let parsedData = this.myArticles;
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      pageCount: Math.ceil(parsedData.totalResults / this.props.pageSize),
      loading: false,
      totalResults: parsedData.totalResults
    });
    document.title = "24x7 News | " + this.props.category;
    //console.log('page: ',this.state.page,parsedData);
  };

  render() {
    //console.log('page: ',this.state.page);
    console.log('render called, Page: ',this.state.page);
    //console.log(this.state.totalResults);
    return (
      <>
        <h2>Top news headlines for you:</h2>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={this.state.loading && <Spinner />}
        >
          <div className="container">
            <div className='row'>
              {this.state.articles.map((el, index) => {
                return <div className='col md-4' key={index}>
                  <NewsItem title={el.title} description={el.description} imageUrl={el.urlToImage} source={el.source.name} url={el.url} author={el.author ? el.author : 'Unknown'} date={el.publishedAt} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className='container d-flex justify-content-between my-3'>
          <button type="button" disabled={this.state.page === 1} onClick={this.previousPage} className="btn btn-dark">&larr; Previous</button>
          <button type="button" disabled={this.state.page === this.state.pageCount} onClick={this.nextPage} className="btn btn-dark">Next &rarr;</button>
        </div> */}
      </>
    )
  }
}

export default News




