import React, { Component } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Offsidebar from './Offsidebar';
import Footer from './Footer';

class Base extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 0,
    };
  }

  render() {
    return (
      <div className="wrapper">
        <Header changeProps={() => {this.setState({key: Math.random()})}}/>
        <Sidebar _userconfig={{...this.props}}/>
        <Offsidebar/>
        <section className="section-container" key={this.state.key}>
          {this.props.children}
        </section>
        <Footer/>
      </div>
    )
  }
}

export default Base;
