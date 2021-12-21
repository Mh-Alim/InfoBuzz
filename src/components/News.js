import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 5
        
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
   
    constructor(){
        super();
        console.log("Hello i am a constructor from News component");
        this.state = {
            articles : [],
            loading: false,
            page: 1
        }
    }
    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=86cbd8598df44d86beaa95196c574b37&pagesize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parseData = await data.json();
        console.log(parseData);
        this.setState({articles: parseData.articles, totalResults:  parseData.totalResults, loading:false})
    }
    handlePrevClick = async ()=>{
        console.log("previous");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=86cbd8598df44d86beaa95196c574b37&page=${this.state.page-1}&pagesize=${this.props.pageSize}`;
        this.setState({
            loading:true
        })
        let data = await fetch(url);
        let parseData = await data.json();
        console.log(parseData);

        this.setState({
            page: this.state.page - 1,
            articles: parseData.articles,
            loading: false
        })
    }
    handleNextClick = async ()=>{
        console.log("next");
        if(!(this.state.page+1> Math.ceil(this.state.totalResults/this.props.pageSize))){

            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=86cbd8598df44d86beaa95196c574b37&page=${this.state.page+1}&pagesize=${this.props.pageSize}`;
            this.setState({
                loading:true
            })
            let data = await fetch(url);
            let parseData = await data.json();
            console.log(parseData);

            this.setState({
                page: this.state.page + 1,
                articles: parseData.articles,
                loading: false
            })
        }
    }
    render() {
        return (
            <div className='container my-3'>
                <h1 className='text-center my-10'style={{margin:'35px 0px'}}>NewaMonkey - Top Headlines</h1>
                {this.state.loading && <Spinner/>}
                <div className="row my-10">
                    {!this.state.loading && this.state.articles.map((element)=>{
                        return <div className="col-md-4" key={element.url}>
                        <NewsItem title={element.title} description = {element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                    </div>
                    })}
                    <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page<=1} type="button" onClick={this.handlePrevClick} className="btn btn-dark">	&larr; previous</button>
                        <button disabled={this.state.page+1> Math.ceil(this.state.totalResults/this.props.pageSize)} type="button"  class="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                    </div>
                    
                </div>
                
                
            </div>
        )
    }
}

export default News
