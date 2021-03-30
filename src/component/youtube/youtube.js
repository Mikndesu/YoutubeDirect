import React from "react";

export default class Youtube extends React.Component {
  constructor(props) {
    super(props);
    this.get_youtube_raw_url = this.get_youtube_raw_url.bind(this);
  }

  state = {
    text: "",
    list: [],
  };

  style = {
    color: "blue",
    background: "#aaccff",
    padding: "0.5em",
    fontWeight: "bolder",
    borderRadius: "0.5em",
  };

  get_youtube_raw_url() {
    let host = "https://www.googleapis.com/youtube/v3/search?";
    let params = "part=snippet&regionCode=jp&key=";
    let url = host + params + this.props.apikey + "&q=" + this.state.text;
    console.log(url);
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
          }
        }
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
          onClick={this.get_youtube_raw_url}
        ></button>
        <div>
          <ul>
            {this.state.list.map((element) => {
              return <li><iframe src={'https://www.youtube.com/embed/'+element} title={element}/></li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
}
