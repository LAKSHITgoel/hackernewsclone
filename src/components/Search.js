import React, { Component } from "react";
import { withApollo } from "react-apollo";
import Link from "./Link";
import { FEED_SEARCH_QUERY } from "./queries";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      links: []
    };
  }

  search = async () => {
    const { filter } = this.state;
    const results = await this.props.client.query({
      query: FEED_SEARCH_QUERY,
      variables: { filter }
    });
    const links = results.data.feed.links;
    this.setState({ links });
    //soon
  };

  render() {
    return (
      <div>
        <div>
          Seacrh
          <input
            type="text"
            onChange={e => this.setState({ filter: e.target.value })}
          />
          <button onClick={this.search}>Go</button>
          <br />
          {this.state.links.map((link, index) => (
            <Link key={link.id} link={link} index={index} />
          ))}
        </div>
      </div>
    );
  }
}

export default withApollo(Search);
