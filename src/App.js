import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component';


const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};

class App extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    items: [],
    size: 20,
    totalCount: 1,
    hasMore: true
  };

  componentDidMount() {
    this.fetchMoreData();
  }

  fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    // setTimeout(() => {
    //   this.setState({
    //     items: this.state.items.concat(Array.from({ length: 20 }))
    //   });
    // }, 1500);
    if (this.state.items.length < this.state.totalCount) {
      axios.get(`http://97593801.ngrok.io/getData?start=${this.state.items.length}&limit=${this.state.size}`).then((response) => {
        console.log('response', response);
        this.setState({
          items: this.state.items.concat(response.data.data),
          totalCount: response.data.totalCount,
          hasMore: true
        });
      }).catch((error) => {
        console.log('response', error);
      });
    } else {
      this.setState({
      hasMore: false
    }) }
  };

  render() {
    console.log('this.state.hasMore',this.state.hasMore);
    return (
      <InfiniteScroll
        dataLength={this.state.items.length}
        next={this.fetchMoreData}
        hasMore={this.state.hasMore}
        loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {this.state.items.map((i, index) => (
          <div style={style} key={index}>
            {/* div - #{index} */}
            {i["serialNo"]}
          </div>
        ))}
      </InfiniteScroll>
    );
  }
}

export default App;
