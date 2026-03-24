const URL = "https://teachablemachine.withgoogle.com/models/LafRxp6tR/"; // 사용자가 제공한 URL로 변경됨

let model, labelContainer, maxPredictions;

async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    document.getElementById('loading').style.display = 'block';
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    document.getElementById('loading').style.display = 'none';
}

function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const output = document.getElementById('image-preview');
        output.src = reader.result;
        output.style.display = 'block';
        document.getElementById('predict-btn').style.display = 'inline-block';
        document.getElementById('label-container').innerHTML = "";
    }
    reader.readAsDataURL(event.target.files[0]);
}

async function predict() {
    if (!model) {
        await init();
    }
    const image = document.getElementById("image-preview");
    const prediction = await model.predict(image);
    
    labelContainer = document.getElementById("label-container");
    labelContainer.innerHTML = "";

    // 결과 정렬 (가장 높은 확률 순)
    prediction.sort((a, b) => b.probability - a.probability);

    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + (prediction[i].probability * 100).toFixed(0) + "%";
        const div = document.createElement("div");
        div.className = "result-item";
        div.innerHTML = classPrediction;
        labelContainer.appendChild(div);
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleText(newTheme);
}

function updateToggleText(theme) {
    const btn = document.getElementById('theme-toggle');
    if (btn) {
        btn.textContent = theme === 'dark' ? '☀️ 라이트 모드' : '🌙 다크 모드';
    }
}

// 초기 테마 설정
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateToggleText(savedTheme);
});
