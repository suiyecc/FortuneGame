/**
 * User Profile Manager
 * 用户档案管理器
 * 
 * 管理用户运势历史、个性化设置和偏好配置
 */

class UserProfileManager {
    constructor() {
        this.storageKey = 'fortuneGame_userProfile';
        this.historyLimit = 30; // 保留30天历史记录
        this.profile = this.loadProfile();
    }

    /**
     * 加载用户档案
     * @returns {Object} 用户档案数据
     */
    loadProfile() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                const profile = JSON.parse(stored);
                return this.validateProfile(profile);
            }
        } catch (error) {
            console.warn('Failed to load user profile:', error);
        }
        
        return this.createDefaultProfile();
    }

    /**
     * 创建默认用户档案
     * @returns {Object} 默认档案
     */
    createDefaultProfile() {
        return {
            version: '1.0',
            createdAt: new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
            mbtiType: null,
            preferences: {
                language: 'zh-CN',
                theme: 'auto',
                notifications: true,
                detailedAnalysis: true,
                historicalComparison: true
            },
            fortuneHistory: [],
            statistics: {
                totalQueries: 0,
                averageFortune: 0,
                bestDay: null,
                worstDay: null,
                streakDays: 0,
                lastQueryDate: null
            },
            achievements: [],
            customSettings: {
                fortuneReminders: false,
                shareEnabled: true,
                analyticsEnabled: true
            }
        };
    }

    /**
     * 验证档案数据完整性
     * @param {Object} profile - 档案数据
     * @returns {Object} 验证后的档案
     */
    validateProfile(profile) {
        const defaultProfile = this.createDefaultProfile();
        
        // 确保必要字段存在
        if (!profile.version) profile.version = defaultProfile.version;
        if (!profile.preferences) profile.preferences = defaultProfile.preferences;
        if (!profile.fortuneHistory) profile.fortuneHistory = [];
        if (!profile.statistics) profile.statistics = defaultProfile.statistics;
        if (!profile.achievements) profile.achievements = [];
        if (!profile.customSettings) profile.customSettings = defaultProfile.customSettings;
        
        // 清理过期历史记录
        profile.fortuneHistory = this.cleanupHistory(profile.fortuneHistory);
        
        return profile;
    }

    /**
     * 保存用户档案
     */
    saveProfile() {
        try {
            this.profile.lastUpdated = new Date().toISOString();
            localStorage.setItem(this.storageKey, JSON.stringify(this.profile));
        } catch (error) {
            console.error('Failed to save user profile:', error);
        }
    }

    /**
     * 记录运势查询结果
     * @param {string} mbtiType - MBTI类型
     * @param {Object} fortuneResult - 运势结果
     * @param {Date} date - 查询日期
     */
    recordFortuneQuery(mbtiType, fortuneResult, date = new Date()) {
        const dateStr = date.toISOString().split('T')[0];
        
        // 更新MBTI类型
        this.profile.mbtiType = mbtiType;
        
        // 检查是否已有当天记录
        const existingIndex = this.profile.fortuneHistory.findIndex(
            record => record.date === dateStr
        );
        
        const record = {
            date: dateStr,
            mbtiType: mbtiType,
            fortune: fortuneResult,
            timestamp: date.toISOString(),
            queryCount: 1
        };
        
        if (existingIndex >= 0) {
            // 更新现有记录
            this.profile.fortuneHistory[existingIndex] = {
                ...this.profile.fortuneHistory[existingIndex],
                ...record,
                queryCount: this.profile.fortuneHistory[existingIndex].queryCount + 1
            };
        } else {
            // 添加新记录
            this.profile.fortuneHistory.push(record);
        }
        
        // 更新统计信息
        this.updateStatistics(fortuneResult, date);
        
        // 检查成就
        this.checkAchievements();
        
        // 清理历史记录
        this.profile.fortuneHistory = this.cleanupHistory(this.profile.fortuneHistory);
        
        this.saveProfile();
    }

    /**
     * 更新统计信息
     * @param {Object} fortuneResult - 运势结果
     * @param {Date} date - 日期
     */
    updateStatistics(fortuneResult, date) {
        const stats = this.profile.statistics;
        const dateStr = date.toISOString().split('T')[0];
        const overallScore = fortuneResult.overall.score;
        
        // 更新总查询次数
        stats.totalQueries += 1;
        
        // 更新平均运势
        const totalScore = this.profile.fortuneHistory.reduce(
            (sum, record) => sum + record.fortune.overall.score, 0
        );
        stats.averageFortune = Math.round((totalScore / this.profile.fortuneHistory.length) * 10) / 10;
        
        // 更新最佳/最差日期
        if (!stats.bestDay || overallScore > this.getFortuneByDate(stats.bestDay)?.overall.score) {
            stats.bestDay = dateStr;
        }
        if (!stats.worstDay || overallScore < this.getFortuneByDate(stats.worstDay)?.overall.score) {
            stats.worstDay = dateStr;
        }
        
        // 更新连续查询天数
        if (stats.lastQueryDate) {
            const lastDate = new Date(stats.lastQueryDate);
            const currentDate = new Date(dateStr);
            const dayDiff = Math.floor((currentDate - lastDate) / (1000 * 60 * 60 * 24));
            
            if (dayDiff === 1) {
                stats.streakDays += 1;
            } else if (dayDiff > 1) {
                stats.streakDays = 1;
            }
        } else {
            stats.streakDays = 1;
        }
        
        stats.lastQueryDate = dateStr;
    }

    /**
     * 检查并解锁成就
     */
    checkAchievements() {
        const achievements = [
            {
                id: 'first_query',
                name: '初次探索',
                description: '完成第一次运势查询',
                condition: () => this.profile.statistics.totalQueries >= 1
            },
            {
                id: 'week_streak',
                name: '坚持一周',
                description: '连续查询运势7天',
                condition: () => this.profile.statistics.streakDays >= 7
            },
            {
                id: 'month_streak',
                name: '坚持一月',
                description: '连续查询运势30天',
                condition: () => this.profile.statistics.streakDays >= 30
            },
            {
                id: 'lucky_day',
                name: '幸运之星',
                description: '获得满分运势',
                condition: () => this.profile.fortuneHistory.some(
                    record => record.fortune.overall.score >= 5
                )
            },
            {
                id: 'explorer',
                name: '运势探索者',
                description: '查询运势超过50次',
                condition: () => this.profile.statistics.totalQueries >= 50
            }
        ];
        
        achievements.forEach(achievement => {
            if (!this.hasAchievement(achievement.id) && achievement.condition()) {
                this.unlockAchievement(achievement);
            }
        });
    }

    /**
     * 检查是否已获得成就
     * @param {string} achievementId - 成就ID
     * @returns {boolean} 是否已获得
     */
    hasAchievement(achievementId) {
        return this.profile.achievements.some(a => a.id === achievementId);
    }

    /**
     * 解锁成就
     * @param {Object} achievement - 成就信息
     */
    unlockAchievement(achievement) {
        this.profile.achievements.push({
            ...achievement,
            unlockedAt: new Date().toISOString()
        });
        
        // 可以在这里触发成就通知
        this.notifyAchievement(achievement);
    }

    /**
     * 成就通知
     * @param {Object} achievement - 成就信息
     */
    notifyAchievement(achievement) {
        if (this.profile.preferences.notifications) {
            console.log(`🎉 解锁成就: ${achievement.name} - ${achievement.description}`);
            // 可以在这里添加UI通知逻辑
        }
    }

    /**
     * 清理过期历史记录
     * @param {Array} history - 历史记录
     * @returns {Array} 清理后的历史记录
     */
    cleanupHistory(history) {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - this.historyLimit);
        const cutoffStr = cutoffDate.toISOString().split('T')[0];
        
        return history
            .filter(record => record.date >= cutoffStr)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    /**
     * 根据日期获取运势记录
     * @param {string} dateStr - 日期字符串 (YYYY-MM-DD)
     * @returns {Object|null} 运势记录
     */
    getFortuneByDate(dateStr) {
        const record = this.profile.fortuneHistory.find(r => r.date === dateStr);
        return record ? record.fortune : null;
    }

    /**
     * 获取运势趋势分析
     * @param {number} days - 分析天数
     * @returns {Object} 趋势分析
     */
    getFortunetTrend(days = 7) {
        const recentHistory = this.profile.fortuneHistory.slice(0, days);
        if (recentHistory.length < 2) {
            return { trend: 'insufficient_data', change: 0 };
        }
        
        const scores = recentHistory.map(r => r.fortune.overall.score);
        const firstScore = scores[scores.length - 1];
        const lastScore = scores[0];
        const change = lastScore - firstScore;
        
        let trend;
        if (change > 0.5) trend = 'rising';
        else if (change < -0.5) trend = 'falling';
        else trend = 'stable';
        
        return {
            trend: trend,
            change: Math.round(change * 10) / 10,
            average: Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10,
            dataPoints: recentHistory.length
        };
    }

    /**
     * 获取维度表现分析
     * @returns {Object} 维度分析
     */
    getDimensionAnalysis() {
        if (this.profile.fortuneHistory.length === 0) {
            return null;
        }
        
        const dimensions = ['love', 'work', 'health', 'wealth', 'social'];
        const analysis = {};
        
        dimensions.forEach(dimension => {
            const scores = this.profile.fortuneHistory
                .map(record => record.fortune.dimensions[dimension]?.score)
                .filter(score => score !== undefined);
            
            if (scores.length > 0) {
                analysis[dimension] = {
                    average: Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10,
                    best: Math.max(...scores),
                    worst: Math.min(...scores),
                    trend: this.calculateDimensionTrend(dimension)
                };
            }
        });
        
        return analysis;
    }

    /**
     * 计算维度趋势
     * @param {string} dimension - 维度名称
     * @returns {string} 趋势方向
     */
    calculateDimensionTrend(dimension) {
        const recentScores = this.profile.fortuneHistory
            .slice(0, 5)
            .map(record => record.fortune.dimensions[dimension]?.score)
            .filter(score => score !== undefined);
        
        if (recentScores.length < 2) return 'stable';
        
        const change = recentScores[0] - recentScores[recentScores.length - 1];
        if (change > 0.3) return 'rising';
        if (change < -0.3) return 'falling';
        return 'stable';
    }

    /**
     * 更新用户偏好
     * @param {Object} preferences - 偏好设置
     */
    updatePreferences(preferences) {
        this.profile.preferences = { ...this.profile.preferences, ...preferences };
        this.saveProfile();
    }

    /**
     * 获取个性化建议
     * @returns {Array} 建议列表
     */
    getPersonalizedSuggestions() {
        const suggestions = [];
        const stats = this.profile.statistics;
        const dimensionAnalysis = this.getDimensionAnalysis();
        
        // 基于连续查询天数的建议
        if (stats.streakDays >= 7) {
            suggestions.push({
                type: 'encouragement',
                message: `太棒了！您已经连续查询运势${stats.streakDays}天，坚持就是胜利！`
            });
        }
        
        // 基于维度分析的建议
        if (dimensionAnalysis) {
            Object.entries(dimensionAnalysis).forEach(([dimension, data]) => {
                if (data.trend === 'falling' && data.average < 3) {
                    const dimensionNames = {
                        love: '感情', work: '工作', health: '健康', 
                        wealth: '财富', social: '社交'
                    };
                    suggestions.push({
                        type: 'improvement',
                        message: `您的${dimensionNames[dimension]}运势最近有所下降，建议多关注这方面的发展。`
                    });
                }
            });
        }
        
        // 基于平均运势的建议
        if (stats.averageFortune >= 4) {
            suggestions.push({
                type: 'positive',
                message: '您的整体运势表现很好，继续保持积极的心态！'
            });
        } else if (stats.averageFortune < 2.5) {
            suggestions.push({
                type: 'support',
                message: '运势有起有落很正常，保持乐观的心态，好运即将到来！'
            });
        }
        
        return suggestions;
    }

    /**
     * 导出用户数据
     * @returns {Object} 导出的数据
     */
    exportData() {
        return {
            profile: this.profile,
            exportedAt: new Date().toISOString(),
            version: '1.0'
        };
    }

    /**
     * 重置用户档案
     */
    resetProfile() {
        this.profile = this.createDefaultProfile();
        this.saveProfile();
    }
}

// 导出类
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserProfileManager;
} else if (typeof window !== 'undefined') {
    window.UserProfileManager = UserProfileManager;
}