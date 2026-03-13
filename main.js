function generateLottoSet() {
    let numbers = [];
    while (numbers.length < 6) {
        let num = Math.floor(Math.random() * 45) + 1;
        if (!numbers.includes(num)) numbers.push(num);
    }
    return numbers.sort((a, b) => a - b);
}

function generateLotto() {
    let html = "";
    for (let i = 1; i <= 5; i++) {
        const lotto = generateLottoSet();
        const balls = lotto.map(n => `<div class='ball'>${n}</div>`).join('');
        html += `<div class='set'><strong>세트 ${i}:</strong> ${balls}</div>`;
    }
    document.getElementById("result").innerHTML = html;
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
