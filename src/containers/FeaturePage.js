import React, {Component} from 'react'
import Article from '../components/Article'
import FeatureSubfeatures from '../components/FeatureSubfeatures'

class FeaturePage extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div>
        <Article />
        <FeatureSubfeatures />
      </div>
    )
  }
}

export default FeaturePage
