import React, { Component } from "react";
import Link from "./Link";
import { Query } from "react-apollo";
import { FEED_QUERY } from "./queries";

class LinkList extends Component {
  render() {
    return (
      <div>
        <Query query={FEED_QUERY}>
          {({ loading, data, error }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error</div>;
            
            return data.feed.links.map(link => (
              <Link key={link.id} link={link} />
            ));
            //return "Hello";
          }}
        </Query>
      </div>
    );
  }
}

export default LinkList;
