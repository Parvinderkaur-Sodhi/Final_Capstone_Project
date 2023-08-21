export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.accessToken) {
       return { Authorization: "Bearer " + user.accessToken };
    
  } else {
    return {};
  }
}

/*export default function authHeader() {
  const userJSON = localStorage.getItem("user");

  if (userJSON) {
    try {
      const user = JSON.parse(userJSON);

      if (user && user.accessToken) {
        return { Authorization: "Bearer " + user.accessToken };
      } else {
        return {};
      }
    } catch (error) {
      // Handle the case where JSON parsing fails
      console.error("Error parsing user JSON:", error);
      return {};
    }
  } else {
    return {};
  }
}*/

