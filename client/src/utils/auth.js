export const getUserInfo = () => {
  const data = localStorage.getItem("flowergun_user");
  return data ? JSON.parse(data) : null;
};

export const saveUserInfo = (user) => {
  localStorage.setItem("flowergun_user", JSON.stringify(user));
};

export const logoutUser = () => {
  localStorage.removeItem("flowergun_user");
};
