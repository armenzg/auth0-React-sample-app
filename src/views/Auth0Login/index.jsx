import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ErrorPanel from '@mozilla-frontend-infra/components/ErrorPanel';
import { webAuth, userSessionFromAuthResult } from '../../auth/auth0';

export default class Auth0Login extends PureComponent {
  static propTypes = {
    history: PropTypes.shape({}).isRequired,
    setUserSession: PropTypes.func.isRequired,
  };

  state = {};

  // eslint-disable-next-line consistent-return
  componentDidMount() {
    const { history, setUserSession } = this.props;

    if (!window.location.hash) {
      return webAuth.authorize();
    }

    // for silent renewal, auth0-js opens this page in an iframe, and expects
    // a postMessage back, and that's it.
    if (window !== window.top) {
      window.parent.postMessage(window.location.hash, window.origin);

      return null;
    }

    webAuth.parseHash(
      { hash: window.location.hash },
      // eslint-disable-next-line consistent-return
      (loginError, authResult) => {
        if (loginError) {
          return this.setState({ loginError });
        }

        setUserSession(userSessionFromAuthResult(authResult));

        if (window.opener) {
          window.close();
        } else {
          history.push('/');
        }
      },
    );
  }

  render() {
    const { loginError } = this.state;
    if (loginError) {
      return <ErrorPanel error={loginError} />;
    }

    if (window.location.hash) {
      return <p>Logging in..</p>;
    }
    return <p>Redirecting..</p>;
  }
}
