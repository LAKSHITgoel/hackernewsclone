import React, { Component } from "react";
import { POST_MUTATION } from "./queries";
import { graphql } from "react-apollo";
import { withRouter } from "react-router-dom";

class CreateLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      url: ""
    };
  }

  onSubmit = e => {
    e.preventDefault();
    const { mutate } = this.props;
    mutate({
      variables: {
        description: this.state.description,
        url: this.state.url
      }
    }).then(res => {
      console.log(res);
      this.props.history.push("/");
    });
    this.setState({ description: "", url: "" });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="flex flex-column mt3">
            <input
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.onChange}
              className="mb2"
              placeholder="A description for the link"
            />
            <input
              type="text"
              name="url"
              value={this.state.url}
              onChange={this.onChange}
              className="mb2"
              placeholder="A URL for the link"
            />
          </div>
          <button type="submit" onClick={this.onSubmit}>
            Create
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(graphql(POST_MUTATION)(CreateLink));
