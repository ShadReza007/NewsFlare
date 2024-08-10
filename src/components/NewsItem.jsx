import React from 'react';
import LazyLoad from 'react-lazyload';
import placeholderImage from '../assets/stock-vector-breaking-news-template-with-d-red-and-blue-badge-breaking-news-text-on-dark-blue-with-earth-and-1928997539.jpg';

const NewsItem = ({ title, description, src, url, realProbability, fakeProbability }) => {
  return (
    <div className="card bg-dark text-light mb-3 d-inline-block my-3 mx-3 px-2 py-2" style={{ maxWidth: "345px",minHeight:"550px", width: "100%", height: "100%" }}>
      <LazyLoad height={200} offset={100}>
        <img
          src={src ? src : placeholderImage}
          style={{ height: "200px", objectFit: "cover" }}
          className="card-img-top"
          alt="..."
        />
      </LazyLoad>
      <div className="card-body d-flex flex-column justify-content-between pt-4" style={{ minHeight: "278px" }}>
        <h5 className="card-title pb-2">{title.slice(0, 50)}</h5>
        <p>
          <span className="badge bg-success">
            Real Probability: {realProbability !== undefined ? (realProbability * 100).toFixed(2) + '%' : 'N/A'}
          </span>
          <br />
          <span className="badge bg-danger">
            Fake Probability: {fakeProbability !== undefined ? (fakeProbability * 100).toFixed(2) + '%' : 'N/A'}
          </span>
        </p>
        <p className="card-text">{description ? description.slice(0, 100)+"..." : "No Description of this event"}</p>

        <a href={url} className="btn btn-primary">Read More</a>
      </div>
    </div>
  );
};

export default NewsItem;
