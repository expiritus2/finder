const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
  app.get("/api/personal-area", requireLogin, (req, res) => {
        res.send({object: ["List fo objects"]});
  });
};