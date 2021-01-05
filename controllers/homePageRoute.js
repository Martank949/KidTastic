const router = require("express").Router();
const { Child, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  res.render("homeland", {
    loggedIn: req.session.logged_in
  });
});

router.get("/signUp", async (req, res) => {
  res.render("signup", {
    loggedIn: req.session.logged_in
  });
});
// router.get("/homepage", withAuth, async (req, res) => {
//   res.render("homepage", {
//     loggedIn: req.session.loggedIn,
//   })
// })

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Child }],
    });

    const user = userData.get({ plain: true });

    res.render("homepage", {
      ...user,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/watch", withAuth, async (req, res) => {
  res.render("watch", {
    loggedIn: req.session.logged_in,
  });
});


// router.get("/:id", withAuth, async (req, res) => {
//   try {
//     // Get all children and JOIN with user data
//     console.log("User ID passed in: " + req.params.id);
//     console.log("Req passed in: " + req);
//     console.log("Res passed in: " + res);
//     const childData = await Child.findAll({
//       include: [
//         {
//           model: User,
//         },
//       ],
//       where: { userId: req.params.id },
//     });
//     console.log("After reading +", childData);
//     // Serialize data so the template can read it
//     const children = childData.map((child) => child.get({ plain: true }));

//     // Pass serialized data and session flag into template
//     res.render("homepage", {
//       children,
//       loggedIn: req.session.logged_in,
//     });
//   } catch (err) {
//     console.log("Error message", err);
//     res.status(500).json(err);
//   }
// });


module.exports = router;


