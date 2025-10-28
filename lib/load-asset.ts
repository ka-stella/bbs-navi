import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";

const htmlAssetMap = {
  "area.html": require("@/assets/html/area.html"),
  "category.html": require("@/assets/html/category.html"),
  // "file3.html": require("@/assets/html/file3.html"),
};

/**
 * アセットからHTMLファイルを読み込む
 * @returns HTMLコンテンツの文字列
 */
export async function loadHTMLFromAssets(
  htmlFileName: keyof typeof htmlAssetMap,
): Promise<string> {
  try {
    console.log("HTMLファイルの読み込みを開始...");

    // アセットからファイルをロード
    const assetModuleId = htmlAssetMap[htmlFileName];

    if (!assetModuleId) {
      throw new Error(`テストHTMLファイルが見つかりません: ${htmlFileName}`);
    }

    const asset = Asset.fromModule(assetModuleId);
    await asset.downloadAsync();

    if (!asset.localUri) {
      throw new Error("アセットのURIが見つかりません");
    }

    console.log("ファイルURI:", asset.localUri);

    let htmlContent: string;

    if (Platform.OS === "web") {
      // Web環境でのファイル読み込み
      htmlContent = await readFileOnWeb(asset);
    } else {
      // ネイティブ環境でのファイル読み込み
      htmlContent = await FileSystem.readAsStringAsync(asset.localUri);
    }

    console.log("HTMLファイルの読み込み成功。文字数:", htmlContent.length);
    return htmlContent;
  } catch (error) {
    console.error("HTMLファイルの読み込みエラー:", error);
    throw new Error(`ファイルの読み込みに失敗しました: ${error}`);
  }
}

/**
 * Web環境でファイルを読み込む
 * @param asset - 読み込むアセット
 * @returns ファイル内容の文字列
 */
async function readFileOnWeb(asset: Asset): Promise<string> {
  // Web環境ではfetchを使用
  try {
    const response = await fetch(asset.uri);
    if (!response.ok) {
      throw new Error(`HTTPエラー: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    console.error("Web環境でのファイル読み込みエラー:", error);
    throw error;
  }
}

/**
 * アセットファイルが存在するかチェックする
 * @returns ファイルが利用可能かどうか
 */
export async function checkHTMLFileExists(): Promise<boolean> {
  try {
    const asset = Asset.fromModule(require("../../assets/test.html"));
    await asset.downloadAsync();
    return !!asset.localUri;
  } catch (error) {
    console.error("ファイル存在チェックエラー:", error);
    return false;
  }
}
