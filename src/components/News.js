import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
   
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
        let url = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=86cbd8598df44d86beaa95196c574b37&pagesize=20";
        let data = await fetch(url);
        let parseData = await data.json();
        console.log(parseData);
        this.setState({articles: parseData.articles, totalResults:  parseData.totalResults})
    }
    handlePrevClick = async ()=>{
        console.log("previous");
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=86cbd8598df44d86beaa95196c574b37&page=${this.state.page-1}&pagesize=20`;
        let data = await fetch(url);
        let parseData = await data.json();
        console.log(parseData);

        this.setState({
            page: this.state.page - 1,
            articles: parseData.articles
        })
    }
    handleNextClick = async ()=>{
        console.log("next");
        if(this.state.page+1> Math.ceil(this.state.totalResults/20)){

        }
        else{

        
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=86cbd8598df44d86beaa95196c574b37&page=${this.state.page+1}&pagesize=20`;
        let data = await fetch(url);
        let parseData = await data.json();
        console.log(parseData);

        this.setState({
            page: this.state.page + 1,
            articles: parseData.articles
        })
    }
    }
    render() {
        return (
            <div className='container my-3'>
                <h1 className='my-10'>NewaMonkey - Top Headlines</h1>
                
                <div className="row">
                    {this.state.articles.map((element)=>{
                        return <div className="col-md-4" key={element.url}>
                        <NewsItem title={element.title} description = {element.description} imageUrl={element.urlToImage} newsUrl={element.url}/>
                    </div>
                    })}
                    <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page<=1} type="button" onClick={this.handlePrevClick} className="btn btn-dark">	&larr; previous</button>
                        <button type="button"  class="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                    </div>
                    
                </div>
                
                
            </div>
        )
    }
}

export default News
