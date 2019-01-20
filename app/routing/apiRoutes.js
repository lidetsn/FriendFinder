/*4. Your `apiRoutes.js` file should contain two routes:
   * A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
   * A POST routes `/api/friends`. This will be used to handle incoming survey results.
   *  This route will also be used to handle the compatibility logic.
   */

var friendData = require("../data/friends");
// ROUTING

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page. display a JSON of all possible friends.
  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });

  // API POST Requests
  app.post("/api/friends", function(req, res) {
            // req.body is available since we're using the body parsing middleware    
               req.body.scores= req.body.scores.map(Number) 
            var totalDifferenceArray=[];
              
           for(var i=0;i<friendData.length;i++){
                var scoreData=friendData[i].scores;
                var sum=0;
                      // console.log(req.body.scores)
                      // console.log(scoreData)
                      // console.log("=============================")
                for(var j=0;j<scoreData.length;j++){
                    sum+= Math.abs(req.body.scores[j]-scoreData[j])
                  }
                 totalDifferenceArray.push(sum);//the index of each sum crosponds the index of friendData
            }    
                      // console.log(totalDifferenceArray)                    
                var index=totalDifferenceArray.indexOf(Math.min(...totalDifferenceArray))     
                res.json(friendData[index]);
                friendData.push(req.body) 
    });
};


