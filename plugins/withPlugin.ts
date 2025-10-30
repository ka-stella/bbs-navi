import { ConfigPlugin } from "expo/config-plugins";
import withAndroidTransparentNavigation from "./withAndroidTransparentNavigation";
// import withAndroidPlugin from './withAndroidPlugin';
// import withIosPlugin from './withIosPlugin';

const withPlugin: ConfigPlugin = (config) => {
  // Apply Android modifications first
  return withAndroidTransparentNavigation(config);
  // Then apply iOS modifications and return
  // return withIosPlugin(config);
};

export default withPlugin;
