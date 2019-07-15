export const updateUserForm = (updatedInput) => dispatch => {
  dispatch({ type: 'UPDATE_FORM', payload: updatedInput })
};