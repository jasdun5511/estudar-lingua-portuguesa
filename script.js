document.addEventListener("DOMContentLoaded", () => {
    const wordListContainer = document.getElementById("word-list");

    // 1. 获取 JSON 数据
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            renderWords(data);
        })
        .catch(error => {
            console.error("加载 JSON 数据失败:", error);
            wordListContainer.innerHTML = "<p style='padding:20px'>数据加载失败，请确保使用本地服务器(Live Server)运行代码。</p>";
        });

    // 2. 渲染单词列表
    function renderWords(words) {
        words.forEach((item) => {
            const wordEl = document.createElement("div");
            wordEl.className = "word-item";
            
            wordEl.innerHTML = `
                <div class="word-main">
                    <span class="word-text">${item.word}</span>
                    <span class="word-phonetic">${item.phonetic}</span>
                </div>
                <div class="word-details">
                    <div class="meaning-left">
                        <span class="word-pos">${item.pos}</span>
                        <span class="word-translation">${item.meaning}</span>
                    </div>
                    <div class="action-right">
                        <span>☆</span>
                        <span>≣</span>
                    </div>
                </div>
            `;

            // 3. 绑定点击事件：手风琴展开效果
            wordEl.addEventListener("click", function() {
                const isActive = this.classList.contains("active");
                
                // 移除所有其他项的 active 状态 (手风琴效果)
                document.querySelectorAll(".word-item").forEach(el => {
                    el.classList.remove("active");
                });

                // 如果当前项未被激活，则激活它
                if (!isActive) {
                    this.classList.add("active");
                }
            });

            wordListContainer.appendChild(wordEl);
        });
    }
});
