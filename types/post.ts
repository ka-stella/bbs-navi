export interface Thread {
  id: string;
  title: string;
  Posts: Post[];
  url: string;
  previousThreadUrl?: string | null;
  nextThreadUrl?: string | null;
  scrapedAt?: string;
}

export interface Post {
  number: number; //レス番号
  body: string; // 投稿文
  date: Date; // 投稿時間
  authorName: string; // 表示名
  authorId?: string | null; //投稿者ID => 「ID:k3D8A2p0 の発言を見る」機能
  trip?: string | null; //トリップ => なりすまし防止の証。固定ハンドル追跡

  replyTo?: number[];

  mediaUrls?: string[]; //添付画像や動画リンク
  good?: number | null;
  bad?: number | null;

  scrapedAt?: string;
}
