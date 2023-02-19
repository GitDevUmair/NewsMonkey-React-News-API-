import React from "react";
import Card from "react-bootstrap/Card";

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;

  return (
    <div className="my-3">
      <Card>
        <span
          className="badge  bg-danger"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0",
          }}
        >
          {source}
          <span className="visually-hidden">unread messages</span>
        </span>

        <Card.Img variant="top" src={imageUrl} />
        <Card.Body>
          <Card.Title>
            {title.length > 52 ? title.slice(0, 52) + "..." : title}{" "}
          </Card.Title>
          <Card.Text>
            {description.length > 76
              ? description.slice(0, 76) + "..."
              : description.length}
          </Card.Text>
          <a className="btn btn-sm btn-dark" href={newsUrl} target="_blank">
            Read More
          </a>
          <p className="card-text my-1">
            <small className="text-muted">
              By {author} Last updated {new Date(date).toGMTString()}
            </small>
          </p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NewsItem;
