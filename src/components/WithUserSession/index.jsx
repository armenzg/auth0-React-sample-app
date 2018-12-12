import { PureComponent } from 'react';
import { func, shape } from 'prop-types';

export default class WithUserSession extends PureComponent {
  static contextTypes = {
    authController: shape({}).isRequired,
  };

  static propTypes = {
    children: func.isRequired,
  };

  componentDidMount() {
    const { authController } = this.context;

    authController.on('user-session-changed', this.handleUserSessionChanged);
  }

  componentWillUnmount() {
    const { authController } = this.context;
    authController.off(
      'user-session-changed',
      this.handleUserSessionChanged,
    );
  }

  handleUserSessionChanged = () => {
    this.forceUpdate();
  };

  render() {
    const { children } = this.props;
    const { authController } = this.context;
    // note: an update to the userSession will cause a forceUpdate
    const userSession = authController.getUserSession();

    return children(userSession);
  }
}
