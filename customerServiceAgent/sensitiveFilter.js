/**
 * 敏感词过滤模块
 *
 * 功能说明：
 * - judgeMessage(content): 检测用户输入是否包含敏感词，包含则返回false，否则返回true
 * - filterMessage(content): 过滤API返回内容，将敏感词替换为***
 *
 * 实现原理：
 * - 使用DFA（确定有限状态自动机）算法构建敏感词树，提高匹配效率
 * - 时间复杂度：O(n)，n为待检测文本长度
 * - 空间复杂度：O(m*k)，m为敏感词数量，k为敏感词平均长度
 */

/* ===================== DFA敏感词树构建 ===================== */

/**
 * 敏感词树结构（DFA算法核心）
 * 使用Map存储，结构示例：
 * {
 *   '洗': { '钱': { isEnd: true } },
 *   '非': { '法': { '集': { '资': { isEnd: true } } } }
 * }
 */
var sensitiveWordTree = null;

/**
 * 构建DFA敏感词树
 * 将敏感词数组转换为树形结构，便于快速匹配
 * @returns {Map} 敏感词树
 */
function buildSensitiveWordTree() {
    // 如果已经构建过，直接返回缓存结果
    if (sensitiveWordTree !== null) {
        return sensitiveWordTree;
    }

    // 初始化根节点
    var tree = {};

    // 遍历所有敏感词，构建树结构
    for (var i = 0; i < SENSITIVE_WORDS.length; i++) {
        var word = SENSITIVE_WORDS[i];

        // 跳过空字符串
        if (!word || word.length === 0) {
            continue;
        }

        // 从根节点开始，逐字符构建树
        var currentNode = tree;

        for (var j = 0; j < word.length; j++) {
            var char = word[j];

            // 如果当前字符不存在于树中，创建新节点
            if (!currentNode[char]) {
                currentNode[char] = {};
            }

            // 移动到下一层节点
            currentNode = currentNode[char];

            // 如果是敏感词的最后一个字符，标记结束
            if (j === word.length - 1) {
                currentNode.isEnd = true;
            }
        }
    }

    // 缓存构建结果
    sensitiveWordTree = tree;

    // console.log('[敏感词过滤] 敏感词树构建完成，共加载', SENSITIVE_WORDS.length, '个敏感词');

    return tree;
}

/* ===================== 敏感词检测与过滤核心函数 ===================== */

/**
 * 检测用户输入是否包含敏感词
 * @param {string} content - 用户输入的内容
 * @returns {boolean} true-不包含敏感词（允许发送），false-包含敏感词（禁止发送）
 */
function judgeMessage(content) {
    // 参数校验：空内容视为安全
    if (!content || typeof content !== 'string') {
        return true;
    }

    // 获取敏感词树
    var tree = buildSensitiveWordTree();

    // 遍历文本，检测敏感词
    for (var i = 0; i < content.length; i++) {
        var currentNode = tree;
        var j = i;

        // 从当前位置开始，逐字符匹配敏感词树
        while (j < content.length) {
            var char = content[j];

            // 如果当前字符在树中存在
            if (currentNode[char]) {
                currentNode = currentNode[char];

                // 如果匹配到敏感词结尾，返回false（包含敏感词）
                if (currentNode.isEnd === true) {
                    console.log('[敏感词过滤] 检测到敏感词，起始位置:', i, '结束位置:', j);
                    return false;
                }

                j++;
            } else {
                // 当前字符不在树中，终止当前匹配，从下一个位置重新开始
                break;
            }
        }
    }

    // 未检测到敏感词，返回true
    return true;
}

/**
 * 过滤API返回内容，将敏感词替换为***
 * @param {string} content - API返回的内容
 * @returns {string} 过滤后的内容，敏感词已替换为***
 */
function filterMessage(content) {
    // 参数校验：空内容直接返回
    if (!content || typeof content !== 'string') {
        return content;
    }

    // 获取敏感词树
    var tree = buildSensitiveWordTree();

    // 存储需要替换的敏感词及其位置
    var sensitiveWordMatches = [];

    // 遍历文本，查找所有敏感词
    for (var i = 0; i < content.length; i++) {
        var currentNode = tree;
        var j = i;
        var matchedLength = 0;

        // 从当前位置开始，逐字符匹配敏感词树
        while (j < content.length) {
            var char = content[j];

            // 如果当前字符在树中存在
            if (currentNode[char]) {
                currentNode = currentNode[char];
                j++;
                matchedLength++;

                // 如果匹配到敏感词结尾，记录位置
                if (currentNode.isEnd === true) {
                    sensitiveWordMatches.push({
                        start: i,
                        end: j,
                        word: content.substring(i, j)
                    });
                }
            } else {
                // 当前字符不在树中，终止当前匹配
                break;
            }
        }
    }

    // 如果没有匹配到敏感词，直接返回原内容
    if (sensitiveWordMatches.length === 0) {
        return content;
    }

    // 从后往前替换，避免位置偏移问题
    var result = content;
    for (var k = sensitiveWordMatches.length - 1; k >= 0; k--) {
        var match = sensitiveWordMatches[k];
        var replacement = '';
        for (var m = 0; m < match.word.length; m++) {
            replacement += '*';
        }
        result = result.substring(0, match.start) + replacement + result.substring(match.end);
        console.log('[敏感词过滤] 已过滤敏感词:', match.word, '->', replacement);
    }

    return result;
}

/**
 * 过滤API返回内容（跳过标点符号等特殊字符）
 * 专门用于API返回内容的敏感词过滤，匹配时跳过标点符号，替换时保留标点符号
 * @param {string} content - API返回的内容
 * @returns {string} 过滤后的内容，敏感词已替换为***
 */
function filterApiResponse(content) {
    // 参数校验：空内容直接返回
    if (!content || typeof content !== 'string') {
        return content;
    }

    // 获取敏感词树
    var tree = buildSensitiveWordTree();

    // 需要跳过的特殊字符（标点符号、空格等）
    var skipChars = ' ,.;:!?，。；：！？、\\s';

    // 记录需要替换为*的字符位置（只替换敏感词字符，不替换标点符号）
    var charsToReplace = [];

    // 遍历文本，查找所有敏感词
    for (var i = 0; i < content.length; i++) {
        var currentNode = tree;
        var j = i;
        // 记录匹配过程中的敏感词字符位置（不含跳过的标点符号）
        var matchedPositions = [];

        // 从当前位置开始，逐字符匹配敏感词树
        while (j < content.length) {
            var char = content[j];

            // 优先跳过标点符号和空格（即使它们在敏感词树中存在也跳过）
            if (skipChars.indexOf(char) >= 0) {
                j++;
                continue;
            }

            // 如果当前字符在树中存在
            if (currentNode[char]) {
                currentNode = currentNode[char];
                matchedPositions.push(j); // 记录敏感词字符位置
                j++;

                // 如果匹配到敏感词结尾，标记这些位置需要替换
                if (currentNode.isEnd === true) {
                    for (var k = 0; k < matchedPositions.length; k++) {
                        if (charsToReplace.indexOf(matchedPositions[k]) === -1) {
                            charsToReplace.push(matchedPositions[k]);
                        }
                    }
                }
            } else {
                // 当前字符不在树中，终止当前匹配
                break;
            }
        }
    }

    // 如果没有匹配到敏感词，直接返回原内容
    if (charsToReplace.length === 0) {
        return content;
    }

    // 按位置排序，便于逐字符替换
    charsToReplace.sort(function(a, b) { return a - b; });

    // 将需要替换的位置转为字符串数组，逐字符替换
    var result = content.split('');
    for (var m = 0; m < charsToReplace.length; m++) {
        result[charsToReplace[m]] = '*';
    }

    return result.join('');
}

/* ===================== 辅助函数 ===================== */

/**
 * 获取文本中所有匹配到的敏感词列表
 * @param {string} content - 待检测文本
 * @returns {Array} 匹配到的敏感词数组
 */
function getMatchedSensitiveWords(content) {
    // 参数校验
    if (!content || typeof content !== 'string') {
        return [];
    }

    // 获取敏感词树
    var tree = buildSensitiveWordTree();

    // 存储匹配到的敏感词
    var matchedWords = [];

    // 遍历文本，查找所有敏感词
    for (var i = 0; i < content.length; i++) {
        var currentNode = tree;
        var j = i;

        while (j < content.length) {
            var char = content[j];

            if (currentNode[char]) {
                currentNode = currentNode[char];
                j++;

                if (currentNode.isEnd === true) {
                    var word = content.substring(i, j);
                    // 避免重复添加
                    if (matchedWords.indexOf(word) === -1) {
                        matchedWords.push(word);
                    }
                }
            } else {
                break;
            }
        }
    }

    return matchedWords;
}

/**
 * 重新加载敏感词库（当敏感词数组更新后调用）
 * 清除缓存，下次检测时会重新构建敏感词树
 */
function reloadSensitiveWords() {
    sensitiveWordTree = null;
    console.log('[敏感词过滤] 敏感词缓存已清除，下次检测时将重新构建');
}

/* ===================== 模块初始化 ===================== */

// 页面加载完成后初始化敏感词树（预构建，提升首次检测速度）
if (typeof window !== 'undefined') {
    // 检测DOM加载完成状态
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            buildSensitiveWordTree();
        });
    } else {
        // DOM已加载完成，直接构建
        buildSensitiveWordTree();
    }
}