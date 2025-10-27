import { formatDate } from "@/lib/utils";
import { useSettingsStore } from "@/stores/use-setting-store";
import { Post } from "@/types/post";
import React from "react";
import { View } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";

export type PostPreviewProps = {
  post: Post;
  onPress?: () => void;
};

export const PostPreview: React.FC<PostPreviewProps> = ({ post, onPress }) => {
  const theme = useTheme();
  const { typography } = useSettingsStore();

  const handleAnchorPress = (rep: number) => {
    console.log(rep);
  };

  return (
    <Card
      mode="outlined"
      style={{
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        borderRadius: 0,
        borderColor: theme.colors.outlineVariant,
        backgroundColor: theme.colors.surface,
      }}
      onPress={onPress}
    >
      <Card.Content>
        {/* 投稿ヘッダー */}
        <View style={{ marginBottom: 8 }}>
          <Text
            variant="labelMedium"
            style={{
              color: theme.colors.onSurfaceVariant,
              fontWeight: "600",
              fontSize: typography.metaFontSize,
            }}
          >
            # {post.number}
          </Text>
        </View>

        {/* アンカー */}
        {post.replyTo &&
          post.replyTo.map((rep) => (
            <Text
              key={rep}
              variant="bodyMedium"
              onPress={() => handleAnchorPress(rep)}
              style={{
                color: theme.colors.primary,
                fontSize: typography.bodyFontSize,
                lineHeight: typography.bodyLineHeight,
                paddingLeft: typography.bodyIndent,
              }}
            >
              &gt;&gt;{rep}
            </Text>
          ))}

        {/* 本文 */}
        <Text
          variant="bodyMedium"
          style={{
            color: theme.colors.onSurface,
            fontSize: typography.bodyFontSize,
            lineHeight: typography.bodyLineHeight,
            paddingLeft: typography.bodyIndent,
          }}
        >
          {post.body}
        </Text>

        {/* 投稿フッター */}
        <View style={{ marginTop: 8 }}>
          <Text
            variant="labelMedium"
            style={{
              color: theme.colors.onSurfaceVariant,
              fontWeight: "200",
              fontSize: typography.metaFontSize,
            }}
          >
            {formatDate(post.date)}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};
