import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


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
    //console.log('constructor called for news component');
    this.state = {  // we can create/initialise state in the constructor
      articles: [],
      loading: false,
      page: 1,
      pageCount: 0
    }
  }

  async updateNews() {
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
    });
    document.title="24x7 News | "+this.props.category;
  }

  async componentDidMount() {  // this function runs after the render method, this is called only once, and NOT called when the component almost instantly rerenders when a state variable changes
    //console.log('cdm');
    this.updateNews();
  }

  nextPage = async () => {
    this.setState({
      page: this.state.page + 1
    });
    this.updateNews();
  }

  previousPage = async () => {
    this.setState({
      page: this.state.page - 1
    });
    this.updateNews();
  }


  render() {
    //console.log('page: ',this.state.page);
    return (
      <div className='container my-3'>
        <h2>Top news headlines for you:</h2>
        {this.state.loading && <Spinner />}
        <div className='row'>
          {!this.state.loading && this.state.articles.map((el) => {
            return <div className='col md-4' key={el.url}>
              <NewsItem title={el.title} description={el.description} imageUrl={el.urlToImage} source={el.source.name} url={el.url} author={el.author ? el.author : 'Unknown'} date={el.publishedAt} />
            </div>
          })}
        </div>
        <div className='container d-flex justify-content-between my-3'>
          <button type="button" disabled={this.state.page === 1} onClick={this.previousPage} className="btn btn-dark">&larr; Previous</button>
          <button type="button" disabled={this.state.page === this.state.pageCount} onClick={this.nextPage} className="btn btn-dark">Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News




