document.addEventListener("DOMContentLoaded", () => {
    // ボタンとテキストエリアの要素を取得
    const sendButton = document.getElementById("send_submit_btn");
    const textArea = document.getElementById("send_text_content");

    // ボタンがクリックされたときの処理
    sendButton.addEventListener("click", () => {
        let sendTextContent = textArea.value; // テキストエリアの内容を変数に格納
        console.log("送信内容:", sendTextContent); // コンソールに表示（確認用）
        
        // ここで変数 `sendTextContent` を使って送信処理を追加できる
    });
});
document.getElementById("uploadBtn").addEventListener("click", async () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput.files.length === 0) {
        alert("ファイルを選択してください");
        return;
    }

    const file = fileInput.files[0]; // 選択されたファイル
    const storageRef = ref(storage, "uploads/" + file.name); // Firebase Storageの参照作成

    try {
        await uploadBytes(storageRef, file); // ファイルをFirebaseにアップロード
        const downloadURL = await getDownloadURL(storageRef); // アップロードしたファイルのURL取得
        console.log("アップロード成功！URL:", downloadURL);
        alert("アップロード成功！\n" + downloadURL);
    } catch (error) {
        console.error("アップロード失敗:", error);
        alert("アップロードに失敗しました");
    }
});
