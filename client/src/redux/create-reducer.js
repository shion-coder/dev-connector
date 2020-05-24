export const createReducer = (initialState, reducer) => (state = initialState, { type, payload }) => {
  return Object.prototype.hasOwnProperty.call(reducer, type)
    ? typeof reducer[type] === 'function'
      ? reducer[type](state, payload)
      : reducer[type]
    : state;
};
