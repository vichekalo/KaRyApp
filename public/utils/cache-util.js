const setCachedUser = data => {
    sessionStorage.setItem("user", JSON.stringify(data));
};
 
const getCachedUser = () => {
    const user = sessionStorage.getItem("user")
        ? JSON.parse(sessionStorage.getItem("user"))
        : null;

    return user
};

const resetCachedUser = () => {
    sessionStorage.clear()
}
  
const cache = getCachedUser();