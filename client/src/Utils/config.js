export const getToken = () => {
  return localStorage.getItem("adminToken"); // or wherever you store your JWT
};
