import React, { Fragment } from 'react';
import { Router } from '@reach/router';

import Bike from './bike';
import Bikes from './bikes';

export default function Pages() {
  return (
    <Fragment>
        <Router primary={false} component={Fragment}>
          <Bikes path="/" />
          <Bike path="/:id" />
        </Router>
    </Fragment>
  );
}
