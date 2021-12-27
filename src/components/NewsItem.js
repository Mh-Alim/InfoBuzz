import React, { Component } from 'react'

export class NewsItem extends Component {
    constructor(){
        super();
        console.log("Hello i am a constructor from NewsItem");
    }
 
    render() {
        let {title,description,imageUrl,newsUrl,author,date,source} = this.props;
        return (
           
            <div className="card">
                <img src={!imageUrl?"https://i.ytimg.com/vi/pInNREGUQkI/maxresdefault.jpg":imageUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{zIndex:'1',left:'90%'}}>
                        {source}
                        <span className="visually-hidden"></span>
                    </span>
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} target = "_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
                </div>
                
                </div>
           
        )
    }
}

export default NewsItem
