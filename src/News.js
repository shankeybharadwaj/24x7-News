import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {

  myArticles = {
    "status": "ok",
    "totalResults": 3,
    "articles": [
      {
        "source": { "id": "cnn", "name": "CNN" },
        "author": "Kevin Liptak and Arlette Saenz, CNN",
        "title": "Bidens visit site of devastating Uvalde school shooting - CNN",
        "description": "President Joe Biden on Sunday faces the grimly familiar task of comforting families after another mass shooting, this time at an elementary school in Texas, as a weary nation grapples with an endless spate of gun violence.",
        "url": "https://www.cnn.com/2022/05/29/politics/joe-biden-uvalde-texas-visit/index.html",
        "urlToImage": "https://cdn.cnn.com/cnnnext/dam/assets/220529124327-05-biden-uvalde-texas-0529-super-tease.jpg",
        "publishedAt": "2022-05-29T18:05:00Z",
        "content": "(CNN)President Joe Biden on Sunday faces the grimly familiar task of comforting families after another mass shooting, this time at an elementary school in Texas, as a weary nation grapples with an en… [+5977 chars]"
      },
      {
        "source": { "id": "cnn", "name": "CNN" },
        "author": "Ray Sanchez, CNN",
        "title": "'We're in trouble.' 80 minutes of horror at Robb Elementary School - CNN",
        "description": "Two days before the end of the academic year the students of Robb Elementary School wore their Sunday best for a celebration. Within hours, they would cross paths with a high school dropout who one week earlier had legally purchased two AR-15 style rifles for…",
        "url": "https://www.cnn.com/2022/05/29/us/uvalde-texas-elementary-school-shooting-week/index.html",
        "urlToImage": "https://cdn.cnn.com/cnnnext/dam/assets/220527195351-uvalde-robb-elementary-school-052722-super-tease.jpg",
        "publishedAt": "2022-05-29T14:27:00Z",
        "content": "This account of events surrounding the massacre at Robb Elementary School in Uvalde, Texas, is based on official statements, interviews with parents, witnesses, law enforcement and local officials, a… [+14387 chars]"
      },
      {
        "source": { "id": null, "name": "YouTube" },
        "author": null,
        "title": "Texas officials had contradictory accounts of Uvalde school shooting | USA TODAY - USA TODAY",
        "description": "Texas officials, including Governor Greg Abbott, offered contradictory narratives over two days after the school shooting in Uvalde that left 19 students and...",
        "url": "https://www.youtube.com/watch?v=M2DNXZlGqjo",
        "urlToImage": "https://i.ytimg.com/vi/M2DNXZlGqjo/hqdefault.jpg",
        "publishedAt": "2022-05-28T17:05:35Z",
        "content": null
      }
    ]
  }
  

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




