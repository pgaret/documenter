export default function article(state = [], action){
  switch(action.type){
    case 'NEW_ARTICLE':
      return {name: '', description: '', f_id: action.payload.f_id, edit: true, saved: false}
    case 'SET_ARTICLE':
      return {name: action.payload.name, description: action.payload.description, _id: action.payload._id, f_id: action.payload.f_id, edit: false, saved: false}
    case 'EDIT_ARTICLE':
      // console.log(state)
      return {name: state.name, description: state.description, _id: state._id, f_id: state.f_id, edit: true, saved: false}
    case 'SAVE_ARTICLE':
      return {name: action.payload.name, description: action.payload.description, _id: action.payload._id, f_id: state.f_id, edit: true, saved: false}
    case 'FINISH_ARTICLE':
      // console.log(action.payload)
      return {name: action.payload.name, description: action.payload.description, _id: action.payload._id, f_id: state.f_id, edit: false, saved: false}
    default:
      return state
  }
}
