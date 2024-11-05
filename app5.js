const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win ) || 0;
  let total = Number( req.query.total ) || 0;
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 今はダミーで人間の勝ちにしておく
  //let judgement = '勝ち';
  //win += 1;
  //total += 1;
  if ((hand === 'グー' && cpu === 'チョキ') ||
      (hand === 'チョキ' && cpu === 'パー') ||
      (hand === 'パー' && cpu === 'グー')) {
    judgement = '勝ち';
    win += 1; // 勝った場合は勝ち数を増やす
  } else if (hand === cpu) {
    judgement = 'あいこ'; // あいこの場合
  } else {
    judgement = '負け'; // 負けの場合
  }
  total += 1;

  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/suji", (req, res) => {
  let suji = req.query.suji;
  let itti = Number( req.query.itti ) || 0;
  let huitti = Number( req.query.huitti ) || 0;
  let total = Number( req.query.total ) || 0;
  console.log( {suji, itti, huitti, total
  });
  const num = Math.floor( Math.random() * 10 + 1 );
  let cpu = '';
  if( num==1 ) cpu = '0';
  else if( num==2 ) cpu = '1';
  else if( num==3 ) cpu = '2';
  else if( num==4 ) cpu = '3';
  else if( num==5 ) cpu = '4';
  else if( num==6 ) cpu = '5';
  else if( num==7 ) cpu = '6';
  else if( num==8 ) cpu = '7';
  else if( num==9 ) cpu = '8';
  else cpu = '9';
  
  if (suji === cpu) {
    judgement = '一致！';
    itti += 1; // 一致した場合増やす
  } else {
    judgement = '不一致'; // 不一致の場合
    huitti += 1;
  }
  total += 1;

  const display = {
    your: suji,
    cpu: cpu,
    judgement: judgement,
    itti: itti,
    huitti: huitti,
    total: total
  }
  res.render( 'janken', display );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
