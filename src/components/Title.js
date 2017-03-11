import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {linkArticle} from '../actions/index.js'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import './components.css'

class Title extends Component {
  constructor(props){
    super(props)
    this.state = {team: [], projects: [], features: []}
    this.linkArticle = this.linkArticle.bind(this)
  }

  parseName(name){
    return name.replace(/\s/g, "").toLowerCase()
  }

  linkArticle(feature){
    debugger
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.team.people.length !== this.state.team.length){
      this.state.team = []
      for (let i = 0; i < nextProps.team.people.length; i++){
        this.state.team.push(<MenuItem key={1+(.1*(i+1))}>{nextProps.team.people[i].first+" "+nextProps.team.people[i].last}</MenuItem>)
      }
    }
    if (nextProps.projects.projects.length !== this.state.projects.length){
      this.state.projects = []
      for (let i = 0; i < nextProps.projects.projects.length; i++){
        this.state.projects.push(<MenuItem key={2+(.1*(i+1))}>{nextProps.projects.projects[i].name}</MenuItem>)
      }
    }
    if (nextProps.features.features.length !== this.state.features.length){
      this.state.features = []
      for (let i = 0; i < nextProps.features.features.length; i++){
        let link = this.parseName('/features/'+nextProps.features.features[i].name)
        this.state.features.push(<MenuItem onClick={()=>{this.linkArticle(nextProps.features.features[i])}} key={2+(.1*(i+1))}>{nextProps.features.features[i].name}</MenuItem>)
      }
    }
  }

  render(){
    return (
      <Navbar bsStyle={null} className='navbar--title'>
        <Navbar.Header>
          <Navbar.Brand>
            <h1>Your Logo Here</h1>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    )
  }
}

const mapStateToProps = state => {
  return {team: state.people, projects: state.projects, features: state.features}
}

const mapDispatchToProps = dispatch => {
  return {
    linkArticle: (article) => {
      dispatch(linkArticle(article))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Title)
