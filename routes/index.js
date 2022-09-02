const router = require("express").Router();
const apiRoutes = require("./api_routes");

router.use("/api", apiRoutes);

router.use((req, res) => {
  return res.send("Send the correct Route!");
});

module.exports = router;