export default function features(state = [{features: {setting: false}}], action){
  let state_features = state.features
  switch(action.type){
    case 'GET_FEATURES':
      return Object.assign({}, state, {features: action.payload})
    case 'UPDATE_FEATURES':
      let sub_feature = state_features.find(item=>{return item._id === action.payload.article.f_id})
        .subfeatures.find(sub=>{return sub._id===action.payload.article._id})
      sub_feature.name = action.payload.article.name
      sub_feature.description = action.payload.article.description
      return Object.assign({}, state, {features: state_features})
    case 'ADD_SUBFEATURE':
      state_features.find(item=>{return item._id === action.payload.article.f_id}).subfeatures.push(action.payload.article)
      return Object.assign({}, state, {features: state_features})
    case 'CREATE_FEATURE':
      state_features.push(action.payload.feature)
      state_features.setting = false
      return {features: state_features}
    case 'SETTING_FEATURE_NAME':
      state_features.setting = !state.features.setting
      return {features: state_features}
    default:
      return state
  }
}
