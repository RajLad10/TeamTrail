export const getLocal = key => {
  return JSON.parse(localStorage.getItem(key));
};
export const setLocal = (key, value) => {
  localStorage.setItem(key, value);
};
export const removeLocal = key => {
  localStorage.removeItem(key);
};
export const clearLocal = () => {
  localStorage.clear();
};

export const get = key => {
  return JSON.parse(localStorage.getItem(key));
};

export const set = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const remove = key => {
  localStorage.removeItem(key);
};

export const clear = () => {
  ["site_id", "redirect_url"].forEach(key => {
    remove(key);
  });
};
