const setCachedUser = data => {
    localStorage.setItem("user", JSON.stringify(data));
};
 
const getCachedUser = () => {
    const user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null;
    return user
};

const resetCachedUser = () => {
    localStorage.clear()
}
const cache = getCachedUser();