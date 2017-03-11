export default function sidebar(state = [], action){
  let new_article = {}
  switch(action.type){
    case 'SET_SIDEBAR':
      return {sidebar: action.payload}
    default:
      return state
  }
}
