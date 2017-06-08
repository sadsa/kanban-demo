export default {
  get(k) {
    try {
      return JSON.parse(localStorage.getItem(k));
    } 
    catch(e) {
      return null;
    }
  },
  set(k, v) {
    if (!localStorage) { return; }
    localStorage.setItem(k, JSON.stringify(v));
  }
}