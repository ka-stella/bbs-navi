import { PostPreview } from "@/components/thread/post-preview";
import { useSettingsStore } from "@/stores/use-setting-store";
import Slider from "@react-native-community/slider";
import { View } from "react-native";
import { List, Switch, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const posts = [
  {
    number: 1,
    body: "こんにちは！新スレ立てました。\n仲良く使ってね！",
    date: new Date("2025-10-27T10:05:00"),
    authorName: "名無しさん",
    authorId: "ID:AbC1234",
    replyTo: [],
    mediaUrls: [],
    scrapedAt: "2025-10-27T10:06:00",
  },
  {
    number: 2,
    body: "スレ立て乙！\n今日の天気どう？",
    date: new Date("2025-10-27T10:06:12"),
    authorName: "名無し太郎",
    authorId: "ID:FgH5678",
    replyTo: [1],
    mediaUrls: [],
  },
];

export default function SettingDetailsScreen(): React.JSX.Element {
  const theme = useTheme();
  const { isDarkMode, typography, setDarkMode, setTypography } =
    useSettingsStore();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* プレビュー */}
      <View>
        <PostPreview post={posts[0]} />
        <PostPreview post={posts[1]} />
      </View>

      {/* ダークモード */}
      <List.Item
        title="ダークモード"
        right={() => <Switch value={isDarkMode} onValueChange={setDarkMode} />}
      />

      {/* 本文文字サイズ */}
      <List.Item
        title={`本文文字サイズ: ${typography.bodyFontSize}`}
        right={() => (
          <Slider
            value={typography.bodyFontSize}
            onValueChange={(value) => setTypography({ bodyFontSize: value })}
            minimumValue={12}
            maximumValue={24}
            step={1}
            style={{ width: 150 }}
          />
        )}
      />

      {/* 行間 */}
      <List.Item
        title={`行間: ${typography.bodyLineHeight}`}
        right={() => (
          <Slider
            value={typography.bodyLineHeight}
            onValueChange={(value) => setTypography({ bodyLineHeight: value })}
            minimumValue={16}
            maximumValue={40}
            step={2}
            style={{ width: 150 }}
          />
        )}
      />

      {/* インデント */}
      <List.Item
        title={`インデント: ${typography.bodyIndent}`}
        right={() => (
          <Slider
            value={typography.bodyIndent}
            onValueChange={(value) => setTypography({ bodyIndent: value })}
            minimumValue={0}
            maximumValue={40}
            step={1}
            style={{ width: 150 }}
          />
        )}
      />
    </SafeAreaView>
  );
}
