import { PureComponent } from 'react';
import { func, shape } from 'prop-types';
import { camelCase } from 'change-case';
import * as taskcluster from 'taskcluster-client-web';

export default class WithClients extends PureComponent {
  static contextTypes = {
    authController: shape({}).isRequired,
  };

  static propTypes = {
    children: func.isRequired,
  };

  componentDidMount() {
    const { authController } = this.context;

    authController.on('user-session-changed', this.handleUserSessionChanged);
    this.handleUserSessionChanged(authController.getUserSession());
  }

  componentWillUnmount() {
    const { authController } = this.context;
    authController.off(
      'user-session-changed',
      this.handleUserSessionChanged,
    );
  }

  getClients() {
    const { children, ...clients } = this.props;
    const { authController } = this.context;
    const userSession = authController.getUserSession();
    const clientArgs = userSession ? userSession.clientArgs : null;

    return Object.entries(clients).reduce(
      (reduction, [key, value]) => ({
        ...reduction,
        [camelCase(key)]:
          value === true
            ? new taskcluster[key]({
              rootUrl: process.env.TASKCLUSTER_ROOT_URL,
              ...clientArgs,
            })
            : new taskcluster[key]({
              rootUrl: process.env.TASKCLUSTER_ROOT_URL,
              ...clientArgs,
              ...value,
            }),
      }),
      {},
    );
  }

  handleUserSessionChanged = () => {
    this.forceUpdate();
  };

  render() {
    const { children } = this.props;
    // note: an update to the userSession will cause a forceUpdate
    return children(this.getClients());
  }
}