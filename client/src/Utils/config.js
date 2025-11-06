export const getToken = () => {
  return localStorage.getItem("token"); // or wherever you store your JWT
};
