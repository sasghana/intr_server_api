'use strict'

export default (app) => {

  require('./login.routes').default(app)
  require('./comment.routes').default(app)
  require('./filepublication.routes').default(app)
  require('./follower.routes').default(app)
  require('./like.routes').default(app)
  require('./publication.routes').default(app)
  require('./user.routes').default(app)
  require('./group.routes').default(app)
  require('./notifications.routes').default(app)

}