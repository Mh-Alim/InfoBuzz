import React from 'react'

const NewsItem =(props)=> {

        let {title,description,imageUrl,newsUrl,author,date,source} = props;
        return (
           <>
            <div className="card ">
                
                
                <div className="card-body">
                    <div style={{display:"flex",justifyContent:"flex-end",position:"absolute",right:"0",}}>

                    <span className="badge rounded-pill bg-danger">
                        {source}
                        <span className="visually-hidden"></span>
                    </span>
                    </div>
                <img src={!imageUrl?"https://i.ytimg.com/vi/pInNREGUQkI/maxresdefault.jpg":imageUrl} className="card-img-top" alt="..."/>
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} target = "_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
                </div>
                
                </div>
            </>
        )
    
}

export default NewsItem
