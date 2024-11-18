# webpro_06
## このプログラムについて
今回作成したプログラムは，ユーザー側が入力した情報をサーバ側がそれに応じて応答し，入力回数や正誤を記録するというプログラムである．
- **数合わせゲーム**:1~5のうちいずれか一つを入力し，その数字がコンピュータと一致したかを判定するゲームである．
- **ポケモンタイプ相性判定**:ほのおタイプ，みずタイプ，くさタイプのうち一つ選び，選んだタイプがコンピュータが出したタイプと相性がいいかを判断するプログラムである．
- **パスワード正誤判定**:パスワードを入力し，そのパスワードが一致しているかを判断するプログラムである．
## ファイル一覧
ファイル名|説明
-|-
app5.js|プログラム本体
public/suji.html|数合わせゲームの開始画面
views/suji.ejs|数合わせゲームの更新後の画面
public/type.html|ポケモンタイプ相性判定の開始画面
views/type.ejs|ポケモンタイプ相性判定の更新後の画面
public/password.html|パスワード入力画面
views/password.ejs|パスワード入力後の画面

## 起動方法
###　数合わせゲームの起動方法
1. app5.jsにコードを記入する．
1. ターミナルで以下のようなコードを入力して，サーバを起動する．
```
node app5.js
```
3. その結果，いかの以下のメッセージが返される．
```
Example app listening on port 8080!
```
4. Webブラウザでlocalhost:8080/public/suji.htmlにアクセスする
1. 1から5のうち一つ数字を入力する

###　ポケモンタイプ相性判定の起動方法
1. app5.jsにコードを記入する．
1. ターミナルで以下のようなコードを入力して，サーバを起動する．
```
node app5.js
```
3. その結果，いかの以下のメッセージが返される．
```
Example app listening on port 8080!
```
4. Webブラウザでlocalhost:8080/public/type.htmlにアクセスする
1. ほのおタイプ，くさタイプ，みずタイプのうち一つ入力する

###　パスワード入力画面の起動方法
1. app5.jsにコードを記入する．
1. ターミナルで以下のようなコードを入力して，サーバを起動する．
```
node app5.js
```
3. その結果，いかの以下のメッセージが返される．
```
Example app listening on port 8080!
```
4. Webブラウザでlocalhost:8080/public/password.htmlにアクセスする
1. パスワードを入力する

## プログラムの機能
### 数合わせゲームの機能
```mermaid
flowchart TD;

start["開始"];
end1["終了"]
if{"1~5の数字が一致するか"}
itti["一致と表示"]
huitti["不一致と表示"]
total["totalに1追加"]

start --> if
if -->|yes| itti
itti --> total
if -->|no| huitti
huitti --> total
total --> end1
```

### ポケモンタイプ相性診断の機能
```mermaid
flowchart TD;

start["開始"];
end1["終了"]
if{"ポケモンのタイプの相性がいいか"}
batugun["効果抜群!と表示"]
imahitotu["効果いまひとつ と表示"]
no["何もなし と表示"]
total["totalに1追加"]

start --> if
if -->|良い| batugun
batugun --> total
if -->|悪い| imahitotu
imahitotu --> total
if --> |どちらでもない|no
no --> total
total --> end1
```

### パスワード正誤判定の機能
