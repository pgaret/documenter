import React, { Component } from 'react';
import {connect} from 'react-redux'
import Article from '../components/Article'
import EditArticle from '../components/EditArticle'
import Title from '../components/Title'
import Sidebar from './Sidebar'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {edit: false, new: false}
  }

  componentWillReceiveProps(nextProps){
  }

  render() {
    return (
      <div>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css" />
        <Title />
        <Sidebar />
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {article: state.article}
}

export default connect(mapStateToProps, {})(App)
