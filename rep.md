
```mermaid
sequenceDiagram
  Webブラウザ ->> Webサーバ: Webページの取得
  Webサーバ ->> Webブラウザ: HTML, JS, CSS
  Webブラウザ ->> BBSクライアント: 起動
  BBSクライアント ->> BBSサーバ: Post(書き込み)
  BBSサーバ ->> BBSクライアント: 全書き込み数
  BBSクライアント ->> BBSサーバ: Read(読み込み)
  BBSサーバ ->> BBSクライアント: 掲示データ
  BBSクライアント ->> BBSサーバ: Check(新規チェック)
  BBSサーバ ->> BBSクライアント: 全書き込み数
  BBSクライアント ->> BBSサーバ: Edit(編集)
  BBSサーバ ->> BBSクライアント: 編集結果
  BBSクライアント ->> BBSサーバ: Delete(削除)
  BBSサーバ ->> BBSクライアント: 削除
  BBSクライアント ->> BBSサーバ: Like(いいね)
  BBSサーバ ->> BBSクライアント: いいね

```