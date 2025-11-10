

export const counterMiddleware = (store) => (next) => (action) => {
  const prev = store.getState().counter.value

  console.log('Action:', action.type, 'Prev:', prev);

  if (action.type === 'counter/reset' && prev > 20) {
    alert('Too big to reset!');
    return;
  }

  const result = next(action);

  console.log('Next:', store.getState().counter.value);

  return result;
}
