router.get("/", function(req, res) {
  res.status(200).send("Cwitter Homepage");
});

module.exports = router;
