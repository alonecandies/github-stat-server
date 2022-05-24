const Stat = require("../models/stat.model");

exports.getTotalStat = (req, res) => {
  const authToken = req.body.authToken;
  const org = req.body.org;
  Stat.getTotalStat(authToken, org, (err, stat) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving stat.",
      });
    } else {
      res.status(200).send(stat);
    }
  });
};
