const Filters = require("../models/Filters");

exports.createUserPrefrences = async (req, res) => {
  try {
    //grab checkbox arrays from the form (EJS sends arrays)
    let { workType, camera } = req.body;

    //keeps workType as an array
    const workArray = Array.isArray(workType)
    ? workType
    : workType
    ? [workType]
    : [];

    //keeps camera pref always an array
    const camArray = Array.isArray(camera)
    ? camera
    : camera
    ? [camera]
    : [];

    //combines all selected filters into one array
    const selectedFilters = [...workArray, ...camArray];

    console.log('Filters for user are saving.', selectedFilters);

    //deletes existing filters for the user so theres only 1 filter doc per user
    await Filters.deleteMany({ user: req.user.id });

    //save new filters
    await Filters.create({
        user: req.user.id,
        filter: selectedFilters,
    });

    console.log("Saved preferences");

    // redirects user to matching 
    return res.redirect("/match"); // or "/match"
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
};
