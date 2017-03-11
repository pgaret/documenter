export default function features(state = [{setting: false}], action){
  let state_features = state.features
  let new_state = state
  switch(action.type){
    case 'GET_FEATURES':
      state_features = state[0]
      state_features.features = action.payload
      return Object.assign({}, state[0], state_features)
    case 'UPDATE_FEATURES':
      let sub_feature = state_features.find(item=>{return item._id === action.payload.article.f_id})
        .subfeatures.find(sub=>{return sub._id===action.payload.article._id})
      sub_feature.name = action.payload.article.name
      sub_feature.description = action.payload.article.description
      return {features: state_features}
    case 'ADD_SUBFEATURE':
      state_features = state.features
      if (state_features.find(item=>{return item._id === action.payload.f_id})){
        let index = state_features.find(item=>{return item._id === action.payload.f_id}).subfeatures.indexOf(state_features.find(item=>{return item._id === action.payload.f_id}).subfeatures.find(item=>{return item._id === action.payload._id}))
        if (index !== -1){
          state_features.find(item=>{return item._id === action.payload.f_id}).subfeatures.splice(index, 1)
        }
        state_features.find(item=>{return item._id === action.payload.f_id}).subfeatures.push(action.payload)
      }
      console.log(action.payload)
      console.log(state_features)
      return {features: state_features}
    case 'CREATE_FEATURE':
      state_features = state.features
      state_features.push(action.payload)
      state_features.setting = false
      return {features: state_features}
    case 'SETTING_FEATURE_NAME':
      state_features = state.features
      state_features.setting = !state.features.setting
      return {features: state_features}
    default:
      return state
  }
}
