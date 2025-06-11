/**
 * Dynamic Fortune Engine
 * 动态运势计算引擎
 * 
 * 提供基于时间驱动的多维度运势计算功能
 */

class FortuneEngine {
    constructor() {
        this.dailyVariation = 0.8; // 日变化幅度
        this.weeklyTrend = 0.3; // 周趋势影响
        this.personalCycle = 28; // 个人运势周期（天）
        this.maxFortuneScore = 5; // 最大运势分数
        this.minFortuneScore = 1; // 最小运势分数
    }

    /**
     * 计算动态运势
     * @param {string} mbtiType - MBTI类型
     * @param {Date} date - 计算日期
     * @param {Object} baseFortuneMap - 基础运势配置
     * @returns {Object} 动态运势数据
     */
    calculateDynamicFortune(mbtiType, date = new Date(), baseFortuneMap = {}) {
        const baseFortune = baseFortuneMap[mbtiType]?.baseFortune || 3;
        const dateHash = this.generateDateHash(date, mbtiType);
        
        // 多维度运势计算
        const dailyModifier = this.getDailyModifier(dateHash);
        const weeklyModifier = this.getWeeklyModifier(date);
        const personalModifier = this.getPersonalCycleModifier(date, mbtiType);
        
        const overallScore = this.normalizeFortuneScore(
            baseFortune, 
            dailyModifier, 
            weeklyModifier, 
            personalModifier
        );

        // 计算各维度运势
        const dimensions = this.calculateDimensionFortunes(
            mbtiType, 
            dateHash, 
            baseFortune
        );

        return {
            overall: {
                score: overallScore,
                level: this.getFortuneLevel(overallScore),
                trend: this.getFortunetTrend(dateHash)
            },
            dimensions: dimensions,
            metadata: {
                calculationMethod: 'dynamic',
                dateHash: dateHash,
                modifiers: {
                    daily: dailyModifier,
                    weekly: weeklyModifier,
                    personal: personalModifier
                }
            }
        };
    }

    /**
     * 生成基于日期和MBTI类型的哈希值
     * @param {Date} date - 日期
     * @param {string} mbtiType - MBTI类型
     * @returns {number} 哈希值
     */
    generateDateHash(date, mbtiType) {
        const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD
        const combined = dateStr + mbtiType;
        let hash = 0;
        
        for (let i = 0; i < combined.length; i++) {
            const char = combined.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // 转换为32位整数
        }
        
        return Math.abs(hash);
    }

    /**
     * 获取日变化修正值
     * @param {number} dateHash - 日期哈希
     * @returns {number} 修正值 (-0.8 到 +0.8)
     */
    getDailyModifier(dateHash) {
        const normalized = (dateHash % 1000) / 1000; // 0-1
        return (normalized - 0.5) * 2 * this.dailyVariation; // -0.8 到 +0.8
    }

    /**
     * 获取周趋势修正值
     * @param {Date} date - 日期
     * @returns {number} 修正值
     */
    getWeeklyModifier(date) {
        const dayOfWeek = date.getDay(); // 0-6 (周日到周六)
        const weeklyPattern = [0.1, -0.1, 0.2, 0.0, 0.3, 0.2, -0.2]; // 周末稍低，周五最高
        return weeklyPattern[dayOfWeek] * this.weeklyTrend;
    }

    /**
     * 获取个人周期修正值
     * @param {Date} date - 日期
     * @param {string} mbtiType - MBTI类型
     * @returns {number} 修正值
     */
    getPersonalCycleModifier(date, mbtiType) {
        const daysSinceEpoch = Math.floor(date.getTime() / (1000 * 60 * 60 * 24));
        const cyclePosition = (daysSinceEpoch + this.getTypeOffset(mbtiType)) % this.personalCycle;
        const cyclePhase = (cyclePosition / this.personalCycle) * 2 * Math.PI;
        
        return Math.sin(cyclePhase) * 0.3; // -0.3 到 +0.3
    }

    /**
     * 获取MBTI类型偏移量
     * @param {string} mbtiType - MBTI类型
     * @returns {number} 偏移量
     */
    getTypeOffset(mbtiType) {
        const typeMap = {
            'ENFP': 0, 'ENFJ': 3, 'ENTP': 6, 'ENTJ': 9,
            'INFP': 12, 'INFJ': 15, 'INTP': 18, 'INTJ': 21,
            'ESFP': 1, 'ESFJ': 4, 'ESTP': 7, 'ESTJ': 10,
            'ISFP': 13, 'ISFJ': 16, 'ISTP': 19, 'ISTJ': 22
        };
        return typeMap[mbtiType] || 0;
    }

    /**
     * 标准化运势分数
     * @param {number} base - 基础分数
     * @param {...number} modifiers - 修正值
     * @returns {number} 标准化后的分数
     */
    normalizeFortuneScore(base, ...modifiers) {
        const total = base + modifiers.reduce((sum, mod) => sum + mod, 0);
        const normalized = Math.max(this.minFortuneScore, Math.min(this.maxFortuneScore, total));
        return Math.round(normalized * 10) / 10; // 保留一位小数
    }

    /**
     * 计算各维度运势
     * @param {string} mbtiType - MBTI类型
     * @param {number} dateHash - 日期哈希
     * @param {number} baseFortune - 基础运势
     * @returns {Object} 各维度运势
     */
    calculateDimensionFortunes(mbtiType, dateHash, baseFortune) {
        const dimensions = ['love', 'work', 'health', 'wealth', 'social'];
        const result = {};
        
        dimensions.forEach((dimension, index) => {
            const dimensionHash = dateHash + index * 1000;
            const variance = this.getDimensionVariance(mbtiType, dimension);
            const modifier = ((dimensionHash % 1000) / 1000 - 0.5) * 2 * variance;
            
            result[dimension] = {
                score: this.normalizeFortuneScore(baseFortune, modifier),
                events: this.generateDimensionEvents(dimension, modifier)
            };
        });
        
        return result;
    }

    /**
     * 获取维度变化幅度
     * @param {string} mbtiType - MBTI类型
     * @param {string} dimension - 维度名称
     * @returns {number} 变化幅度
     */
    getDimensionVariance(mbtiType, dimension) {
        // 不同MBTI类型在不同维度的变化幅度
        const varianceMap = {
            'ENFP': { love: 0.9, work: 0.7, health: 0.5, wealth: 1.2, social: 0.6 },
            'ENFJ': { love: 0.7, work: 0.8, health: 0.6, wealth: 0.8, social: 0.5 },
            'ENTP': { love: 0.8, work: 0.9, health: 0.7, wealth: 1.0, social: 0.6 },
            'ENTJ': { love: 0.6, work: 0.5, health: 0.7, wealth: 0.7, social: 0.8 }
            // 可以为所有16种类型配置
        };
        
        const defaultVariance = { love: 0.8, work: 0.8, health: 0.6, wealth: 0.9, social: 0.7 };
        return varianceMap[mbtiType]?.[dimension] || defaultVariance[dimension];
    }

    /**
     * 生成维度事件
     * @param {string} dimension - 维度名称
     * @param {number} modifier - 修正值
     * @returns {Array} 事件列表
     */
    generateDimensionEvents(dimension, modifier) {
        const eventTemplates = {
            love: {
                positive: ['桃花运旺盛', '感情关系和谐', '遇到心仪对象的机会'],
                neutral: ['感情状态平稳', '适合思考感情问题'],
                negative: ['感情需要更多耐心', '避免情感冲动']
            },
            work: {
                positive: ['工作效率很高', '容易获得认可', '项目进展顺利'],
                neutral: ['工作状态稳定', '适合处理日常事务'],
                negative: ['工作需要更多专注', '避免重大决策']
            },
            health: {
                positive: ['精力充沛', '身体状态良好', '适合运动锻炼'],
                neutral: ['健康状态平稳', '注意作息规律'],
                negative: ['注意休息', '避免过度劳累']
            },
            wealth: {
                positive: ['财运不错', '投资机会出现', '收入可能增加'],
                neutral: ['财务状态稳定', '适合理财规划'],
                negative: ['谨慎理财', '避免大额支出']
            },
            social: {
                positive: ['人际关系顺利', '社交活动精彩', '容易结识新朋友'],
                neutral: ['社交状态平稳', '维持现有关系'],
                negative: ['社交需要更多耐心', '避免争执']
            }
        };
        
        const events = eventTemplates[dimension];
        if (!events) return [];
        
        let category;
        if (modifier > 0.3) category = 'positive';
        else if (modifier < -0.3) category = 'negative';
        else category = 'neutral';
        
        const eventList = events[category] || [];
        return eventList.length > 0 ? [eventList[Math.floor(Math.random() * eventList.length)]] : [];
    }

    /**
     * 获取运势等级
     * @param {number} score - 运势分数
     * @returns {string} 运势等级
     */
    getFortuneLevel(score) {
        if (score >= 4.5) return 'excellent';
        if (score >= 3.5) return 'good';
        if (score >= 2.5) return 'average';
        if (score >= 1.5) return 'poor';
        return 'bad';
    }

    /**
     * 获取运势趋势
     * @param {number} dateHash - 日期哈希
     * @returns {string} 趋势方向
     */
    getFortunetTrend(dateHash) {
        const trendValue = (dateHash % 100) / 100;
        if (trendValue > 0.6) return 'rising';
        if (trendValue < 0.4) return 'falling';
        return 'stable';
    }
}

// 导出类
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FortuneEngine;
} else if (typeof window !== 'undefined') {
    window.FortuneEngine = FortuneEngine;
}