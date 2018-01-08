import React from 'react'
import FruitSelect from '../FruitSelect'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types'

const styles = {
  root: {
    height: '500px',
    overflowY: 'auto'
  },
  copy: {
    padding: '10px'
  }
}

const ScrollableSection = ({ classes }) => {
  return (
    <div className={classes.root}>
      <div className={classes.copy}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quam eros,
        tempor faucibus leo nec, malesuada rutrum mi. Nulla in enim mi. Integer
        molestie elit in ornare volutpat. Vivamus nibh augue, interdum id
        gravida vel, mattis mattis urna. Quisque eleifend tincidunt vestibulum.
        Praesent non nunc sed ligula euismod aliquam. Ut neque odio, hendrerit
        in ornare ut, aliquet sit amet arcu. Nulla tempor laoreet erat in
        mattis. Curabitur eu nulla at nunc volutpat aliquet in nec odio. Nam ac
        ipsum euismod, porta ante eu, vestibulum dui.
      </div>
      <div className={classes.copy}>
        Suspendisse luctus elementum quam, in elementum velit tristique quis.
        Cras rhoncus nulla sapien, id ullamcorper sem ultrices vel. Sed magna
        lorem, egestas quis molestie ut, tincidunt nec eros. Pellentesque
        habitant morbi tristique senectus et netus et malesuada fames ac turpis
        egestas. Curabitur placerat magna enim, sit amet lacinia ex feugiat
        porta. Aenean laoreet dapibus erat id ornare. Pellentesque ac sem nisi.
        Etiam eu leo sed turpis ultrices porta quis in est. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit. Nam vel tortor purus.
      </div>
      <div className={classes.copy}>
        Suspendisse luctus elementum quam, in elementum velit tristique quis.
        Cras rhoncus nulla sapien, id ullamcorper sem ultrices vel. Sed magna
        lorem, egestas quis molestie ut, tincidunt nec eros. Pellentesque
        habitant morbi tristique senectus et netus et malesuada fames ac turpis
        egestas. Curabitur placerat magna enim, sit amet lacinia ex feugiat
        porta. Aenean laoreet dapibus erat id ornare. Pellentesque ac sem nisi.
        Etiam eu leo sed turpis ultrices porta quis in est. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit. Nam vel tortor purus.
      </div>
      <div className={classes.copy}>
        Suspendisse luctus elementum quam, in elementum velit tristique quis.
        Cras rhoncus nulla sapien, id ullamcorper sem ultrices vel. Sed magna
        lorem, egestas quis molestie ut, tincidunt nec eros. Pellentesque
        habitant morbi tristique senectus et netus et malesuada fames ac turpis
        egestas. Curabitur placerat magna enim, sit amet lacinia ex feugiat
        porta. Aenean laoreet dapibus erat id ornare. Pellentesque ac sem nisi.
        Etiam eu leo sed turpis ultrices porta quis in est. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit. Nam vel tortor purus.
      </div>
      <div className={classes.copy}>
        Suspendisse luctus elementum quam, in elementum velit tristique quis.
        Cras rhoncus nulla sapien, id ullamcorper sem ultrices vel. Sed magna
        lorem, egestas quis molestie ut, tincidunt nec eros. Pellentesque
        habitant morbi tristique senectus et netus et malesuada fames ac turpis
        egestas. Curabitur placerat magna enim, sit amet lacinia ex feugiat
        porta. Aenean laoreet dapibus erat id ornare. Pellentesque ac sem nisi.
        Etiam eu leo sed turpis ultrices porta quis in est. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit. Nam vel tortor purus.
      </div>
      <FruitSelect />
      <div className={classes.copy}>
        Suspendisse luctus elementum quam, in elementum velit tristique quis.
        Cras rhoncus nulla sapien, id ullamcorper sem ultrices vel. Sed magna
        lorem, egestas quis molestie ut, tincidunt nec eros. Pellentesque
        habitant morbi tristique senectus et netus et malesuada fames ac turpis
        egestas. Curabitur placerat magna enim, sit amet lacinia ex feugiat
        porta. Aenean laoreet dapibus erat id ornare. Pellentesque ac sem nisi.
        Etiam eu leo sed turpis ultrices porta quis in est. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit. Nam vel tortor purus.
      </div>
      <div className={classes.copy}>
        Suspendisse luctus elementum quam, in elementum velit tristique quis.
        Cras rhoncus nulla sapien, id ullamcorper sem ultrices vel. Sed magna
        lorem, egestas quis molestie ut, tincidunt nec eros. Pellentesque
        habitant morbi tristique senectus et netus et malesuada fames ac turpis
        egestas. Curabitur placerat magna enim, sit amet lacinia ex feugiat
        porta. Aenean laoreet dapibus erat id ornare. Pellentesque ac sem nisi.
        Etiam eu leo sed turpis ultrices porta quis in est. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit. Nam vel tortor purus.
      </div>
      <div className={classes.copy}>
        Suspendisse luctus elementum quam, in elementum velit tristique quis.
        Cras rhoncus nulla sapien, id ullamcorper sem ultrices vel. Sed magna
        lorem, egestas quis molestie ut, tincidunt nec eros. Pellentesque
        habitant morbi tristique senectus et netus et malesuada fames ac turpis
        egestas. Curabitur placerat magna enim, sit amet lacinia ex feugiat
        porta. Aenean laoreet dapibus erat id ornare. Pellentesque ac sem nisi.
        Etiam eu leo sed turpis ultrices porta quis in est. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit. Nam vel tortor purus.
      </div>
    </div>
  )
}

ScrollableSection.propTypes = {
  classes: PropTypes.object
}

export default withStyles(styles)(ScrollableSection)
