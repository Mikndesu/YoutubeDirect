import React from "react";
import Database from "../database/database";

class YoutubeFrame extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <li key={this.props.id}>
        <iframe
          src={"https://www.youtube.com/embed/" + this.props.id}
          title={this.props.id}
        />
      </li>
    );
  }
}

export default class Youtube extends React.Component {
  constructor(props) {
    super(props);
    this.get_youtube_raw_url = this.get_youtube_raw_url.bind(this);
    this.requestYoutubeAPI = this.requestYoutubeAPI.bind(this)
  }

  state = {
    text: "",
    list: [],
    list_raw_url: []
  };

  style = {
    color: "blue",
    background: "#aaccff",
    padding: "0.5em",
    fontWeight: "bolder",
    borderRadius: "0.5em",
  };

  requestYoutubeAPI() {
    let host = "https://www.googleapis.com/youtube/v3/search?";
    let params = "part=snippet&regionCode=jp&key=";
    let url = host + params + this.props.apikey + "&q=" + this.state.text;
    console.log(url);
    let database = new Database();
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        for (const element of data["items"]) {
          if (element["id"]["kind"] !== "youtube#channel") {
            let videoIDs = [...this.state.list];
            videoIDs.push(element["id"]["videoId"]);
            this.setState({
              list: videoIDs,
            });
            database.write(this.props.userID, {
              value: element["id"]["videoId"],
            });
            this.get_youtube_raw_url(element["id"]["videoId"])
          }
        }
      });
    this.state.list_raw_url.forEach(element => {
      console.log(element)
    })
  }

  get_youtube_raw_url(videoId) {
    fetch("/get_movie_raw_url/"+videoId)
      .then((response) => response.json())
      .then((data) => {
        let raw_urls = [...this.state.list_raw_url]
        raw_urls.push(data)
        this.setState({
          list_raw_url: raw_urls
        })
        console.log(data)
      });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          name="atext"
          value={this.state.text}
          onChange={(e) => this.setState({ text: e.target.value })}
        />
        <button
          type="submit"
          id="submitButton"
          style={this.style}
          onClick={this.requestYoutubeAPI}
        ></button>
        <div>
          <ul>
            {this.state.list.map((element) => {
              return (
                <YoutubeFrame id={element}/>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
