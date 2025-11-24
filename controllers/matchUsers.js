const Filters = require("../models/Filters");
const User = require("../models/User");

exports.findMatch = (req, res) => {

  // get current user's filters
  Filters.findOne({ user: req.user.id })
    .lean()
    .then((currentUserFilters) => {
      if (!currentUserFilters) {
        return res.send("Please set your filters first.");
      }

      const myFilters = currentUserFilters.filter;

      //extracts the user's camera preference ( on or off)
      const myCameraPref = myFilters.includes("on") ? "on" : "off";

      // find all valid matching users
      return Filters.find({
        user: { $ne: req.user.id },    // not the same user
        filter:{ $in: [myCameraPref] }           // share same camera preference
        // filter: { $in: myFilters }   // at least one shared filter, I want to include this one but not enough users at the moment, so i won't narrow it down as much 
      })
        .lean()
        .then((candidates) => {
          if (!candidates.length) {
            return res.send("No matches found with your camera preference.");
          }

          // chooses a random candidate
          const randomCandidate =
            candidates[Math.floor(Math.random() * candidates.length)];

          // fetch matched user's profile
          return User.findById(randomCandidate.user)
            .lean()
            .then((matchUser) => {
              // render the match page
              if (myCameraPref === "on") {
                return res.render("videoChat", {
                    partner: matchUser,
                    myCameraPref,
                 });
                } else {
                return res.render("textChat", {
                    partner: matchUser,
                    myCameraPref,
             });
              }
            });
        });
    })
    .catch((err) => {
      console.error("Match error:", err);
      res.status(500).send("Error finding a match.");
    });
};
