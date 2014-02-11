/*
 * GET userlist page.
 */

exports.userlist = function(db) {
  return function(req, res) {
    db.collection('userlist').find().toArray(function (err, items) {
      res.json(items);
    })
  }
};

/*
 * POST to adduser.
 */

exports.adduser = function(db) {
  return function(req, res) {
    db.collection('userlist').insert(req.body, function(err, result){
      res.send(
        (err === null) ? { msg: '' } : { msg: err }
      );
    });
  }
};

/*
 * PUT to moduser
 */

exports.moduser = function(db) {
  return function(req, res) {
    var userToUpdate = req.params.id;
    db.collection('userlist').updateById(db.collection('userlist').id(userToUpdate), {$set: req.body}, function(err, result) {
      res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
  }
};

/*
 * DELETE to deleteuser.
 */

exports.deleteuser = function(db) {
  return function(req, res) {
    var userToDelete = req.params.id;
    db.collection('userlist').remove({ '_id' : db.collection('userlist').id(userToDelete)}, function(err, result) {
      res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
  }
};
