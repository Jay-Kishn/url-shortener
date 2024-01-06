const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
      console.log("authenticated");
      next(); // User is authenticated, proceed to the next middleware or route handler
    } else {
      
      res.status(401).send('Unauthorized');
    }
  };
  
export default isAuthenticated;