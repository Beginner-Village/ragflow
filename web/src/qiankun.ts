import { render, rootContainer } from './app';
import authorizationUtil from './utils/authorization-util';

function storeTestToken() {
  // For dev testing only.
  // In a real scenario, the main app would pass the token.
  // This simulates the main app passing a token.
  const token = 'this-is-a-test-token-from-main-app';
  console.log(
    '[ragflow-web] Simulating token injection for development.',
    token,
  );
  authorizationUtil.setAuthorization(`Bearer ${token}`);
}

export async function bootstrap() {
  console.log('[ragflow-web] bootstraped');
}

/**
 * The mount lifecycle will be called every time the sub-application is entered.
 * It usually does some global state injection, such as passing the main application's routing instance,
 * or rendering the application.
 */
export async function mount(props: any) {
  console.log('[ragflow-web] props from main framework', props);

  // Here we receive the token from the main application and store it.
  if (props?.token) {
    console.log(
      '[ragflow-web] Received token from main app, setting authorization.',
    );
    authorizationUtil.setAuthorization(props.token);
  } else if (process.env.NODE_ENV === 'development') {
    // If no token is passed in dev mode, we can set a mock token
    // to facilitate local development and debugging of the sub-application.
    storeTestToken();
  }

  // The official umi/qiankun plugin does not expose the render method by default,
  // but if needed, you might need to call a render function here.
  // We assume Umi handles the rendering automatically after mount.
  render(props);
}

/**
 * The unmount lifecycle will be called every time the sub-application is switched or uninstalled.
 * It usually does some cleanup, such as clearing timers, unbinding events, etc.
 */
export async function unmount(props: any) {
  console.log('[ragflow-web] unmounted');
  const { container } = props;
  const root = (
    container ? container.querySelector('#root') : rootContainer
  ) as any;
  // The unmount method of the React instance is not standard
  // and depends on the specific version and framework wrapper.
  // For React 18, it should be root.unmount().
  if (root && typeof root.unmount === 'function') {
    root.unmount();
  }
}
