import { ConfigPlugin, withAndroidStyles } from "@expo/config-plugins";

/**
 * Android のナビゲーションバーを透過化する Config Plugin
 * Android 14〜16 の edge-to-edge 環境で白バーが出る問題を解消する
 */
const withAndroidTransparentNavigation: ConfigPlugin = (config) => {
  return withAndroidStyles(config, (config) => {
    const styles = config.modResults;

    // "AppTheme" を探す
    const appThemeStyle = styles?.resources?.style?.find(
      (style: any) => style.$.name === "AppTheme",
    );

    if (appThemeStyle && appThemeStyle.item) {
      const alreadySet = appThemeStyle.item.find(
        (item: any) => item.$.name === "android:windowTranslucentNavigation",
      );

      if (!alreadySet) {
        appThemeStyle.item.push({
          $: { name: "android:windowTranslucentNavigation" },
          _: "true",
        });
      }
    }

    return config;
  });
};

export default withAndroidTransparentNavigation;
