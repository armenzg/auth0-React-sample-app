import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorPanel from '@mozilla-frontend-infra/components/ErrorPanel';
import Spinner from '../Spinner';

// eslint-disable-next-line react/prefer-stateless-function
export default class Loading extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.shape({}).isRequired,
    pastDelay: PropTypes.bool.isRequired,
    timedOut: PropTypes.bool.isRequired,
  };

  render() {
    const {
      isLoading, timedOut, pastDelay, error,
    } = this.props;

    if (isLoading) {
      if (timedOut) {
        return (
          <div>A timeout occurred while loading the associated component.</div>
        );
      }

      return pastDelay ? <Spinner /> : null;
    }

    if (error) {
      return <ErrorPanel error={error} />;
    }

    return null;
  }
}
