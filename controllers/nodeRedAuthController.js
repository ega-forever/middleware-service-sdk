const NodeRedUserModel = require('../models/nodeRedUserModel'),
  when = require('when'),
  bcrypt = require('bcryptjs');

let settings = {};

module.exports = {
  type: 'credentials',
  init: (globalSettings) => {
    settings = globalSettings;
    console.log(settings);
    process.exit(0);
    return when.resolve();

  },
  users: function (username) {
    return when.resolve((async () => {

      let user = await NodeRedUserModel.model.findOne({username: username, isActive: true});

      return user ?
        {username: user.username, permissions: user.permissions} : null;
    })());
  },
  authenticate: function (username, password) {
    return when.resolve((async () => {
      let user = await NodeRedUserModel.model.findOne({username: username, isActive: true});
      return user && bcrypt.compare(password, user.password) ?
        {username: user.username, permissions: user.permissions} : null;

    })());
  },
  default: function () {
    return when.resolve({anonymous: false});
  }
};
