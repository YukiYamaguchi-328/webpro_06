"use strict";

let number = 0;
const bbs = document.querySelector('#bbs');
document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;

    const params = {  // URL Encode
        method: "POST",
        body: 'name=' + name + '&message=' + message,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    const url = "/post";
    fetch(url, params)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then((response) => {
            console.log(response);
            document.querySelector('#message').value = "";
        });
});

// 投稿確認・取得処理
document.querySelector('#check').addEventListener('click', () => {
    const params = {  // URL Encode
        method: "POST",
        body: '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    const url = "/check";
    fetch(url, params)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then((response) => {
            let value = response.number;
            console.log(value);

            if (number !== value) {
                const params = {
                    method: "POST",
                    body: 'start=' + number,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };

                const url = "/read";
                fetch(url, params)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Error');
                        }
                        return response.json();
                    })
                    .then((response) => {
                        number += response.messages.length;
                        for (let [index, mes] of response.messages.entries()) {  // indexも一緒に渡す
                            console.log(mes);

                            let cover = document.createElement('div');
                            cover.className = 'cover';

                            let name_area = document.createElement('span');
                            name_area.className = 'name';
                            name_area.innerText = mes.name;

                            let mes_area = document.createElement('span');
                            mes_area.className = 'mes';
                            mes_area.innerText = mes.message;

                            // いいねボタンを追加
                            let like_button = document.createElement('button');
                            like_button.innerText = `いいね (${mes.likes || 0})`;
                            like_button.onclick = () => {
                                // すでにいいねが押されているか確認
                                if (like_button.disabled) {
                                    return; // ボタンが無効化されている場合、何もしない
                                }

                                const params = {
                                    method: "POST",
                                    body: 'index=' + index,  // indexを直接渡す
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                };
                                fetch('/like', params)
                                    .then((response) => {
                                        if (!response.ok) {
                                            throw new Error('Error');
                                        }
                                        return response.json();
                                    })
                                    .then((response) => {
                                        if (response.success) {
                                            like_button.innerText = `いいね (${response.likes})`;  // いいね数を更新
                                            like_button.disabled = true;  // ボタンを無効化
                                        } else {
                                            console.log(response.message);
                                        }
                                    });
                            };

                            // メッセージ編集ボタンを追加
                            let edit_button = document.createElement('button');
                            edit_button.innerText = '編集';
                            edit_button.onclick = () => {
                                const new_message = prompt("メッセージを編集:", mes.message);
                                if (new_message) {
                                    const params = {
                                        method: "POST",
                                        body: 'index=' + index + '&message=' + new_message,
                                        headers: {
                                            'Content-Type': 'application/x-www-form-urlencoded'
                                        }
                                    };
                                    fetch('/edit', params)
                                        .then((response) => {
                                            if (!response.ok) {
                                                throw new Error('Error');
                                            }
                                            return response.json();
                                        })
                                        .then((response) => {
                                            if (response.success) {
                                                mes_area.innerText = new_message;  // 更新されたメッセージを表示
                                            } else {
                                                console.log(response.message);
                                            }
                                        });
                                }
                            };

                            // 削除ボタンを追加
                            let delete_button = document.createElement('button');
                            delete_button.innerText = '削除';
                            delete_button.onclick = () => {
                                const params = {
                                    method: "POST",
                                    body: 'index=' + index,  // indexを直接渡す
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                };
                                fetch('/delete', params)
                                    .then((response) => {
                                        if (!response.ok) {
                                            throw new Error('Error');
                                        }
                                        return response.json();
                                    })
                                    .then((response) => {
                                        if (response.success) {
                                            cover.remove();  // 削除したメッセージを画面から削除
                                        } else {
                                            console.log(response.message);
                                        }
                                    });
                            };

                            cover.appendChild(name_area);
                            cover.appendChild(mes_area);
                            cover.appendChild(like_button);  // いいねボタンを追加
                            cover.appendChild(edit_button);  // 編集ボタンを追加
                            cover.appendChild(delete_button);  // 削除ボタンを追加

                            bbs.appendChild(cover);
                        }
                    });
            }
        });
});