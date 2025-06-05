// MBTI测试数据
const questions = [
    {
        id: 1,
        dimension: 'EI',
        question: '早上走进教室/办公室，你更可能：',
        optionA: { text: '立刻和大家打招呼，聊聊今天的计划 ✨', value: 'E' },
        optionB: { text: '找个角落坐下，先整理思路 📝', value: 'I' }
    },
    {
        id: 2,
        dimension: 'EI',
        question: '周末突然没安排，你会：',
        optionA: { text: '呼朋唤友去逛街拍照 📸', value: 'E' },
        optionB: { text: '窝在家里追剧或做手帐 🏠', value: 'I' }
    },
    {
        id: 3,
        dimension: 'SN',
        question: '打开新手账本，你先画：',
        optionA: { text: '当季热卖奶茶贴纸、实物素材 🧋', value: 'S' },
        optionB: { text: '星空/行星/未来幻想图案 🌌', value: 'N' }
    },
    {
        id: 4,
        dimension: 'SN',
        question: '计划一次旅行，你更看重：',
        optionA: { text: '行程细节 & 时间表 📋', value: 'S' },
        optionB: { text: '旅途中未知的惊喜 🎁', value: 'N' }
    },
    {
        id: 5,
        dimension: 'TF',
        question: '好友向你倾诉失恋，你首先：',
        optionA: { text: '分析原因、给出解决方案 🤔', value: 'T' },
        optionB: { text: '共情安慰、先陪她吃甜品 🍰', value: 'F' }
    },
    {
        id: 6,
        dimension: 'TF',
        question: '选购生日礼物时，你更：',
        optionA: { text: '列清单比较CP值 📊', value: 'T' },
        optionB: { text: '挑她看见会尖叫的可爱物 💕', value: 'F' }
    },
    {
        id: 7,
        dimension: 'JP',
        question: '作业/报告截止还有3天，你：',
        optionA: { text: '立刻分配任务，今晚做完 ⏰', value: 'J' },
        optionB: { text: '先放松，灵感来时再冲刺 💡', value: 'P' }
    },
    {
        id: 8,
        dimension: 'JP',
        question: '收到朋友临时邀约，你：',
        optionA: { text: '看看计划表，若冲突就拒绝 📅', value: 'J' },
        optionB: { text: '说走就走，计划可以改 🚀', value: 'P' }
    }
];

// MBTI结果数据
const mbtiResults = {
    'ENFP': {
        title: '热情的探险家',
        emoji: '🦊',
        description: '小狐狸举彩旗',
        baseFortune: 4,
        love: '桃花旺，主动出击会有惊喜',
        work: '灵感爆棚，注意定下关键目标',
        luckyColor: '蜜桃粉',
        luckyItem: '贴纸本',
        tip: '灵感爆棚的一天，记得把想法落实到行动上哦！'
    },
    'ENFJ': {
        title: '温暖的引导者',
        emoji: '🌻',
        description: '向日葵拥抱阳光',
        baseFortune: 4,
        love: '魅力四射，容易成为焦点',
        work: '团队合作顺利，发挥领导力',
        luckyColor: '阳光橙',
        luckyItem: '香薰蜡烛',
        tip: '你的温暖会感染身边的人，今天特别适合帮助他人！'
    },
    'ENTP': {
        title: '机智的辩论家',
        emoji: '🎭',
        description: '小猴子玩魔方',
        baseFortune: 4,
        love: '口才出众，聊天很有趣',
        work: '创意无限，适合头脑风暴',
        luckyColor: '活力绿',
        luckyItem: '笔记本',
        tip: '今天的你思维特别活跃，记得把好点子记录下来！'
    },
    'ENTJ': {
        title: '天生的领袖',
        emoji: '👑',
        description: '小狮子戴皇冠',
        baseFortune: 5,
        love: '自信迷人，容易吸引仰慕者',
        work: '执行力强，目标明确',
        luckyColor: '皇室紫',
        luckyItem: '计划本',
        tip: '今天特别适合制定长远计划，你的决断力会带来成功！'
    },
    'INFP': {
        title: '理想主义的梦想家',
        emoji: '🦄',
        description: '独角兽在彩虹下',
        baseFortune: 3,
        love: '内心丰富，等待懂你的人',
        work: '创作灵感丰富，适合艺术创作',
        luckyColor: '薰衣草紫',
        luckyItem: '日记本',
        tip: '今天适合独处思考，让内心的声音指引你前进的方向。'
    },
    'INFJ': {
        title: '神秘的预言家',
        emoji: '🔮',
        description: '小猫咪看水晶球',
        baseFortune: 4,
        love: '直觉敏锐，能感知对方心意',
        work: '洞察力强，适合深度思考',
        luckyColor: '神秘蓝',
        luckyItem: '水晶',
        tip: '相信你的直觉，今天它会为你指明正确的道路！'
    },
    'INTP': {
        title: '逻辑学家',
        emoji: '🧠',
        description: '小博士做实验',
        baseFortune: 3,
        love: '理性分析，需要时间了解',
        work: '逻辑清晰，适合解决复杂问题',
        luckyColor: '智慧蓝',
        luckyItem: '魔方',
        tip: '今天的你思维特别清晰，适合处理需要深度思考的事情。'
    },
    'INTJ': {
        title: '建筑师',
        emoji: '🦉',
        description: '猫头鹰戴眼镜',
        baseFortune: 4,
        love: '标准较高，寻找灵魂伴侣',
        work: '远景规划顺利，执行力强',
        luckyColor: '深紫',
        luckyItem: '速写本',
        tip: '远景规划顺利，晚上早点休息，为明天的挑战做准备！'
    },
    'ESFP': {
        title: '活力四射的表演者',
        emoji: '🐰',
        description: '小兔子蹦向烟花',
        baseFortune: 5,
        love: '魅力无限，桃花朵朵开',
        work: '人际关系佳，团队氛围好',
        luckyColor: '柠檬黄',
        luckyItem: '戒指',
        tip: '派对焦点就是你，尽情闪耀吧！今天特别适合社交活动。'
    },
    'ESFJ': {
        title: '贴心的守护者',
        emoji: '🐨',
        description: '考拉妈妈抱宝宝',
        baseFortune: 4,
        love: '体贴入微，容易获得好感',
        work: '团队协调能力强，受人信赖',
        luckyColor: '温柔粉',
        luckyItem: '毛绒玩具',
        tip: '你的贴心会让身边的人感到温暖，记得也要照顾好自己哦！'
    },
    'ESTP': {
        title: '冒险家',
        emoji: '🏄‍♀️',
        description: '小海豚冲浪',
        baseFortune: 4,
        love: '行动派，勇敢表达感情',
        work: '应变能力强，适合挑战',
        luckyColor: '海洋蓝',
        luckyItem: '运动手环',
        tip: '今天适合尝试新事物，你的勇气会带来意想不到的收获！'
    },
    'ESTJ': {
        title: '执行官',
        emoji: '🐝',
        description: '勤劳小蜜蜂',
        baseFortune: 4,
        love: '责任感强，值得信赖',
        work: '组织能力强，效率很高',
        luckyColor: '稳重棕',
        luckyItem: '效率手册',
        tip: '今天的执行力特别强，适合处理重要的工作和决策！'
    },
    'ISFP': {
        title: '艺术家',
        emoji: '🎨',
        description: '小鹿画彩虹',
        baseFortune: 3,
        love: '温柔敏感，需要理解和包容',
        work: '创意丰富，适合艺术创作',
        luckyColor: '森林绿',
        luckyItem: '画笔',
        tip: '今天的创作灵感特别丰富，不妨尝试用艺术表达内心感受。'
    },
    'ISFJ': {
        title: '守护者',
        emoji: '🐻',
        description: '小熊抱热水袋',
        baseFortune: 3,
        love: '默默付出，需要被珍惜',
        work: '细心负责，值得信赖',
        luckyColor: '奶油白',
        luckyItem: '热水袋',
        tip: '关心他人前也要照顾自己哦，你的温柔值得被温柔以待！'
    },
    'ISTP': {
        title: '手工艺人',
        emoji: '🔧',
        description: '小浣熊修东西',
        baseFortune: 3,
        love: '实用主义，用行动表达爱',
        work: '动手能力强，解决问题高手',
        luckyColor: '机械银',
        luckyItem: '多功能工具',
        tip: '今天适合动手解决实际问题，你的技能会派上大用场！'
    },
    'ISTJ': {
        title: '物流师',
        emoji: '🐘',
        description: '大象记事本',
        baseFortune: 4,
        love: '稳重可靠，是很好的伴侣',
        work: '条理清晰，按部就班完成任务',
        luckyColor: '稳重灰',
        luckyItem: '备忘录',
        tip: '今天特别适合整理和规划，你的条理性会带来高效率！'
    }
};

// 游戏状态
let currentQuestion = 0;
let answers = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
let lastChoice = '';

// DOM元素
const welcomePage = document.getElementById('welcome-page');
const questionPage = document.getElementById('question-page');
const resultPage = document.getElementById('result-page');
const startBtn = document.getElementById('start-btn');
const progressBar = document.getElementById('progress');
const currentQElement = document.getElementById('current-q');
const questionText = document.getElementById('question-text');
const optionA = document.getElementById('option-a');
const optionB = document.getElementById('option-b');
const shareModal = document.getElementById('share-modal');
const closeModal = document.querySelector('.close');
const shareBtn = document.getElementById('share-btn');
const restartBtn = document.getElementById('restart-btn');
const downloadBtn = document.getElementById('download-btn');

// 初始化游戏
function initGame() {
    currentQuestion = 0;
    answers = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    lastChoice = '';
    showWelcomePage();
}

// 显示欢迎页
function showWelcomePage() {
    welcomePage.classList.add('active');
    questionPage.classList.remove('active');
    resultPage.classList.remove('active');
}

// 显示问题页
function showQuestionPage() {
    welcomePage.classList.remove('active');
    questionPage.classList.add('active');
    resultPage.classList.remove('active');
    loadQuestion();
}

// 显示结果页
function showResultPage() {
    welcomePage.classList.remove('active');
    questionPage.classList.remove('active');
    resultPage.classList.add('active');
    calculateAndShowResult();
}

// 加载问题
function loadQuestion() {
    if (currentQuestion >= questions.length) {
        showResultPage();
        return;
    }

    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    
    progressBar.style.width = `${progress}%`;
    currentQElement.textContent = currentQuestion + 1;
    questionText.textContent = question.question;
    optionA.textContent = question.optionA.text;
    optionB.textContent = question.optionB.text;
    
    // 重置按钮状态
    optionA.style.transform = 'translateY(0)';
    optionB.style.transform = 'translateY(0)';
}

// 选择答案
function selectAnswer(choice) {
    const question = questions[currentQuestion];
    const selectedValue = choice === 'A' ? question.optionA.value : question.optionB.value;
    
    answers[selectedValue]++;
    lastChoice = selectedValue;
    
    // 添加选择动画
    const selectedBtn = choice === 'A' ? optionA : optionB;
    selectedBtn.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        selectedBtn.style.transform = 'scale(1)';
        currentQuestion++;
        loadQuestion();
    }, 200);
}

// 计算MBTI类型
function calculateMBTI() {
    let mbtiType = '';
    
    // E vs I
    if (answers.E > answers.I) {
        mbtiType += 'E';
    } else if (answers.I > answers.E) {
        mbtiType += 'I';
    } else {
        // 平分时根据最后选择倾向
        mbtiType += (lastChoice === 'E' || Math.random() > 0.5) ? 'E' : 'I';
    }
    
    // S vs N
    if (answers.S > answers.N) {
        mbtiType += 'S';
    } else if (answers.N > answers.S) {
        mbtiType += 'N';
    } else {
        mbtiType += (lastChoice === 'S' || Math.random() > 0.5) ? 'S' : 'N';
    }
    
    // T vs F
    if (answers.T > answers.F) {
        mbtiType += 'T';
    } else if (answers.F > answers.T) {
        mbtiType += 'F';
    } else {
        mbtiType += (lastChoice === 'T' || Math.random() > 0.5) ? 'T' : 'F';
    }
    
    // J vs P
    if (answers.J > answers.P) {
        mbtiType += 'J';
    } else if (answers.P > answers.J) {
        mbtiType += 'P';
    } else {
        mbtiType += (lastChoice === 'J' || Math.random() > 0.5) ? 'J' : 'P';
    }
    
    return mbtiType;
}

// 生成星级显示
function generateStars(rating) {
    const fullStar = '★';
    const emptyStar = '☆';
    return fullStar.repeat(rating) + emptyStar.repeat(5 - rating);
}

// 计算并显示结果
function calculateAndShowResult() {
    const mbtiType = calculateMBTI();
    const result = mbtiResults[mbtiType];
    
    // 添加随机波动
    const fortuneVariation = Math.floor(Math.random() * 3) - 1; // -1, 0, 1
    const finalFortune = Math.max(1, Math.min(5, result.baseFortune + fortuneVariation));
    
    // 显示结果
    document.getElementById('mbti-type').textContent = mbtiType;
    document.getElementById('mbti-title').textContent = result.title;
    document.getElementById('character-emoji').textContent = result.emoji;
    document.getElementById('fortune-stars').textContent = generateStars(finalFortune);
    document.getElementById('love-fortune').textContent = result.love;
    document.getElementById('work-fortune').textContent = result.work;
    document.getElementById('lucky-color').textContent = result.luckyColor;
    document.getElementById('lucky-item').textContent = result.luckyItem;
    document.getElementById('daily-tip').textContent = result.tip;
    
    // 添加幸运数字
    const luckyNumber = Math.floor(Math.random() * 99) + 1;
    document.getElementById('daily-tip').textContent += ` 今日幸运数字：${luckyNumber}`;
}

// 生成分享图片内容
function generateShareContent() {
    const mbtiType = document.getElementById('mbti-type').textContent;
    const mbtiTitle = document.getElementById('mbti-title').textContent;
    const emoji = document.getElementById('character-emoji').textContent;
    const stars = document.getElementById('fortune-stars').textContent;
    
    return `
        <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #ffeef8, #f0e6ff); border-radius: 15px;">
            <h2 style="color: #ff6b9d; margin-bottom: 15px;">我的今日占卜结果</h2>
            <div style="font-size: 3rem; margin: 15px 0;">${emoji}</div>
            <div style="font-size: 2rem; font-weight: bold; color: #9b59b6; margin: 10px 0;">${mbtiType}</div>
            <div style="font-size: 1.2rem; color: #666; margin: 10px 0;">${mbtiTitle}</div>
            <div style="font-size: 1.5rem; margin: 15px 0;">${stars}</div>
            <div style="font-size: 0.9rem; color: #999; margin-top: 20px;">快来测测你的今日运势吧！</div>
        </div>
    `;
}

// 事件监听器
startBtn.addEventListener('click', showQuestionPage);
optionA.addEventListener('click', () => selectAnswer('A'));
optionB.addEventListener('click', () => selectAnswer('B'));
restartBtn.addEventListener('click', initGame);

shareBtn.addEventListener('click', () => {
    const shareContent = generateShareContent();
    document.getElementById('share-image').innerHTML = shareContent;
    shareModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    shareModal.style.display = 'none';
});

downloadBtn.addEventListener('click', () => {
    alert('分享功能需要后端支持，这里仅为演示。实际项目中可以使用html2canvas生成图片。');
});

// 点击模态框外部关闭
window.addEventListener('click', (event) => {
    if (event.target === shareModal) {
        shareModal.style.display = 'none';
    }
});

// 初始化游戏
initGame();