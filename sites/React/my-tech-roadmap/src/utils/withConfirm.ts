export const withConfirm = (fn: (...argss: any[]) => void, message: string) => {
  return (...args: any[]) => {
    const ok = window.confirm(message);
    if (ok) {
      fn(...args);
    }
  }

  // return (
  //   fn(...args);
  // )
}