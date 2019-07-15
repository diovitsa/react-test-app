const initialState = { name: '', email: '', password: '' };

export default function addUserForm(state = initialState, action) {
  if (action.type === 'UPDATE_FORM') {
    return { ...state, [action.payload.id]: action.payload.value }
  }

  return state;
}