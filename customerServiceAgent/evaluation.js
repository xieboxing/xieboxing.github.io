// 测评问题列表
// 定义为全局变量，供自动测评功能使用
const EvaluationArr = {
    "Evaluation": [
        // ==================== 第一部分：基础意图测试问题（140个） ====================
        // 标注说明：每个问题包含 intent_id（对应意图ID）、intent_name（意图名称）、question（测试问题）

        // ===== 一、知识库查询类（共14个问题） =====

        // 1.1 平台介绍（2个问题）
        {
            "intent_id": "1.1",
            "intent_name": "平台介绍",
            "question": "ChuangZaoAI 交易平台用的是什么撮合协议？",
            "category": "基础意图"
        },
        {
            "intent_id": "1.1",
            "intent_name": "平台介绍",
            "question": "你们平台的底层架构是怎样的，安全吗？",
            "category": "基础意图"
        },

        // 1.2 交易规则（2个问题）
        {
            "intent_id": "1.2",
            "intent_name": "交易规则",
            "question": "ChuangZaoAI 交易平台的合约交易规则是什么？",
            "category": "基础意图"
        },
        {
            "intent_id": "1.2",
            "intent_name": "交易规则",
            "question": "全仓模式和逐仓模式有什么区别？",
            "category": "基础意图"
        },

        // 1.3 用户操作（3个问题）
        {
            "intent_id": "1.3",
            "intent_name": "用户操作",
            "question": "请问在 ChuangZaoAI 交易平台怎么充值？",
            "category": "基础意图"
        },
        {
            "intent_id": "1.3",
            "intent_name": "用户操作",
            "question": "提现流程是怎样的，多久能到账？",
            "category": "基础意图"
        },
        {
            "intent_id": "1.3",
            "intent_name": "用户操作",
            "question": "新手如何开合约单，有操作指引吗？",
            "category": "基础意图"
        },

        // 1.4 账户资产（3个问题）
        {
            "intent_id": "1.4",
            "intent_name": "账户资产",
            "question": "我在哪里可以看到我的账户资产？",
            "category": "基础意图"
        },
        {
            "intent_id": "1.4",
            "intent_name": "账户资产",
            "question": "历史仓位记录在哪里查看？",
            "category": "基础意图"
        },
        {
            "intent_id": "1.4",
            "intent_name": "账户资产",
            "question": "怎么查看我的资产变动明细？",
            "category": "基础意图"
        },

        // 1.5 API开发（2个问题）
        {
            "intent_id": "1.5",
            "intent_name": "API开发",
            "question": "ChuangZaoAI.com 的API接口文档在哪里？",
            "category": "基础意图"
        },
        {
            "intent_id": "1.5",
            "intent_name": "API开发",
            "question": "怎么创建API密钥，有频率限制吗？",
            "category": "基础意图"
        },

        // 1.6 生态功能（2个问题）
        {
            "intent_id": "1.6",
            "intent_name": "生态功能",
            "question": "Vault金库是什么功能？",
            "category": "基础意图"
        },
        {
            "intent_id": "1.6",
            "intent_name": "生态功能",
            "question": "网格交易怎么设置，有教程吗？",
            "category": "基础意图"
        },

        // ===== 二、工具查询类（共70个问题） =====

        // 2.1.1 账户权益（4个问题）
        {
            "intent_id": "2.1.1",
            "intent_name": "账户权益",
            "question": "我的账户权益是多少？",
            "category": "基础意图"
        },
        {
            "intent_id": "2.1.1",
            "intent_name": "账户权益",
            "question": "帮我查一下现货净值有多少",
            "category": "基础意图"
        },
        {
            "intent_id": "2.1.1",
            "intent_name": "账户权益",
            "question": "合约账户的净值是多少？",
            "category": "基础意图"
        },
        {
            "intent_id": "2.1.1",
            "intent_name": "账户权益",
            "question": "我账户总资产现在有多少？",
            "category": "基础意图"
        },

        // 2.1.2 可用资金（4个问题）
        {
            "intent_id": "2.1.2",
            "intent_name": "可用资金",
            "question": "我的可用资金有多少？",
            "category": "基础意图"
        },
        {
            "intent_id": "2.1.2",
            "intent_name": "可用资金",
            "question": "现货账户可用余额是多少？",
            "category": "基础意图"
        },
        {
            "intent_id": "2.1.2",
            "intent_name": "可用资金",
            "question": "合约账户还能用来开单的资金是多少？",
            "category": "基础意图"
        },
        {
            "intent_id": "2.1.2",
            "intent_name": "可用资金",
            "question": "我还能用多少钱来交易？",
            "category": "基础意图"
        },

        // 2.1.3 维持保证金（3个问题）
        {
            "intent_id": "2.1.3",
            "intent_name": "维持保证金",
            "question": "我的维持保证金是多少？",
            "category": "基础意图"
        },
        {
            "intent_id": "2.1.3",
            "intent_name": "维持保证金",
            "question": "合约持仓需要的维持保证金是多少？",
            "category": "基础意图"
        },
        {
            "intent_id": "2.1.3",
            "intent_name": "维持保证金",
            "question": "维持保证金率怎么查看？",
            "category": "基础意图"
        },

        // 2.1.4 保证金比率（3个问题）
        {
            "intent_id": "2.1.4",
            "intent_name": "保证金比率",
            "question": "全仓保证金比率是多少？",
            "category": "基础意图"
        },
        {
            "intent_id": "2.1.4",
            "intent_name": "保证金比率",
            "question": "我的全仓保证金率现在多少了？",
            "category": "基础意图"
        },
        {
            "intent_id": "2.1.4",
            "intent_name": "保证金比率",
            "question": "全仓账户保证金比例在哪里看？",
            "category": "基础意图"
        },

        // 2.1.5 未实现盈亏（4个问题）
        {
            "intent_id": "2.1.5",
            "intent_name": "未实现盈亏",
            "question": "我的未实现盈亏是多少？",
            "category": "基础意图"
        },
        {
            "intent_id": "2.1.5",
            "intent_name": "未实现盈亏",
            "question": "持仓浮盈浮亏帮我查一下",
            "category": "基础意图"
        },
        {
            "intent_id": "2.1.5",
            "intent_name": "未实现盈亏",
            "question": "当前持仓盈亏情况怎么样？",
            "category": "基础意图"
        },
        {
            "intent_id": "2.1.5",
            "intent_name": "未实现盈亏",
            "question": "我现在持仓赚了多少钱？",
            "category": "基础意图"
        },

        // 2.1.6 全仓杠杆（3个问题）
        {
            "intent_id": "2.1.6",
            "intent_name": "全仓杠杆",
            "question": "全仓账户杠杆倍数是多少？",
            "category": "基础意图"
        },
        {
            "intent_id": "2.1.6",
            "intent_name": "全仓杠杆",
            "question": "我当前全仓杠杆是多少倍？",
            "category": "基础意图"
        },
        {
            "intent_id": "2.1.6",
            "intent_name": "全仓杠杆",
            "question": "帮我查一下全仓杠杆倍数",
            "category": "基础意图"
        },

        // 2.2.1 仓位总览（4个问题）
        {
            "intent_id": "2.2.1",
            "intent_name": "仓位总览",
            "question": "我的当前仓位有哪些？",
            "category": "基础意图"
        },
        {
            "intent_id": "2.2.1",
            "intent_name": "仓位总览",
            "question": "帮我查看所有持仓情况",
            "category": "基础意图"
        },
        {
            "intent_id": "2.2.1",
            "intent_name": "仓位总览",
            "question": "持仓总览在哪里看？",
            "category": "基础意图"
        },
        {
            "intent_id": "2.2.1",
            "intent_name": "仓位总览",
            "question": "我现在持有什么仓位？",
            "category": "基础意图"
        },

        // 2.2.2 单币种仓位（3个问题）
        {
            "intent_id": "2.2.2",
            "intent_name": "单币种仓位",
            "question": "BTC的持仓情况帮我查一下",
            "category": "基础意图"
        },
        {
            "intent_id": "2.2.2",
            "intent_name": "单币种仓位",
            "question": "ETH仓位详情是多少？",
            "category": "基础意图"
        },
        {
            "intent_id": "2.2.2",
            "intent_name": "单币种仓位",
            "question": "SOL持仓明细帮我看看",
            "category": "基础意图"
        },

        // 2.3.1 当前挂单（3个问题）
        {
            "intent_id": "2.3.1",
            "intent_name": "当前挂单",
            "question": "查看当前挂单列表",
            "category": "基础意图"
        },
        {
            "intent_id": "2.3.1",
            "intent_name": "当前挂单",
            "question": "我有哪些未成交的订单？",
            "category": "基础意图"
        },
        {
            "intent_id": "2.3.1",
            "intent_name": "当前挂单",
            "question": "帮我看看我的挂单",
            "category": "基础意图"
        },

        // 2.3.2 历史订单（3个问题）
        {
            "intent_id": "2.3.2",
            "intent_name": "历史订单",
            "question": "查看历史订单记录",
            "category": "基础意图"
        },
        {
            "intent_id": "2.3.2",
            "intent_name": "历史订单",
            "question": "过去的成交订单帮我查一下",
            "category": "基础意图"
        },
        {
            "intent_id": "2.3.2",
            "intent_name": "历史订单",
            "question": "我之前的订单都在哪里看？",
            "category": "基础意图"
        },

        // 2.3.3 订单状态（3个问题）
        {
            "intent_id": "2.3.3",
            "intent_name": "订单状态",
            "question": "订单号123456的状态帮我查一下",
            "category": "基础意图"
        },
        {
            "intent_id": "2.3.3",
            "intent_name": "订单状态",
            "question": "这个订单成交了吗，订单号是789012",
            "category": "基础意图"
        },
        {
            "intent_id": "2.3.3",
            "intent_name": "订单状态",
            "question": "查一下订单号345678的详情",
            "category": "基础意图"
        },

        // 2.3.4 最近成交（3个问题）
        {
            "intent_id": "2.3.4",
            "intent_name": "最近成交",
            "question": "最近成交记录有哪些？",
            "category": "基础意图"
        },
        {
            "intent_id": "2.3.4",
            "intent_name": "最近成交",
            "question": "最新成交明细帮我看看",
            "category": "基础意图"
        },
        {
            "intent_id": "2.3.4",
            "intent_name": "最近成交",
            "question": "近几笔成交情况怎么样？",
            "category": "基础意图"
        },

        // 2.3.5 订单取消（3个问题）
        {
            "intent_id": "2.3.5",
            "intent_name": "订单取消",
            "question": "取消订单号123456的挂单",
            "category": "基础意图"
        },
        {
            "intent_id": "2.3.5",
            "intent_name": "订单取消",
            "question": "帮我撤销这个未成交订单",
            "category": "基础意图"
        },
        {
            "intent_id": "2.3.5",
            "intent_name": "订单取消",
            "question": "取消挂单，订单号是789012",
            "category": "基础意图"
        },

        // 2.4.1 充值记录（4个问题）
        {
            "intent_id": "2.4.1",
            "intent_name": "充值记录",
            "question": "查看我的充值记录",
            "category": "基础意图"
        },
        {
            "intent_id": "2.4.1",
            "intent_name": "充值记录",
            "question": "充值到账了吗？帮我查一下",
            "category": "基础意图"
        },
        {
            "intent_id": "2.4.1",
            "intent_name": "充值记录",
            "question": "充值流水明细帮我看看",
            "category": "基础意图"
        },
        {
            "intent_id": "2.4.1",
            "intent_name": "充值记录",
            "question": "我之前的充值记录在哪里看？",
            "category": "基础意图"
        },

        // 2.4.2 提现记录（4个问题）
        {
            "intent_id": "2.4.2",
            "intent_name": "提现记录",
            "question": "查看我的提现记录",
            "category": "基础意图"
        },
        {
            "intent_id": "2.4.2",
            "intent_name": "提现记录",
            "question": "提现到账了吗，帮我查一下",
            "category": "基础意图"
        },
        {
            "intent_id": "2.4.2",
            "intent_name": "提现记录",
            "question": "提现流水明细在哪里？",
            "category": "基础意图"
        },
        {
            "intent_id": "2.4.2",
            "intent_name": "提现记录",
            "question": "我之前的提现记录帮我看看",
            "category": "基础意图"
        },

        // 2.4.3 流水总览（3个问题）
        {
            "intent_id": "2.4.3",
            "intent_name": "流水总览",
            "question": "查看我的资金流水",
            "category": "基础意图"
        },
        {
            "intent_id": "2.4.3",
            "intent_name": "流水总览",
            "question": "资产变动记录帮我查一下",
            "category": "基础意图"
        },
        {
            "intent_id": "2.4.3",
            "intent_name": "流水总览",
            "question": "资金往来明细在哪里看？",
            "category": "基础意图"
        },

        // 2.4.4 手续费（3个问题）
        {
            "intent_id": "2.4.4",
            "intent_name": "手续费",
            "question": "我的手续费明细是多少？",
            "category": "基础意图"
        },
        {
            "intent_id": "2.4.4",
            "intent_name": "手续费",
            "question": "交易手续费帮我查一下",
            "category": "基础意图"
        },
        {
            "intent_id": "2.4.4",
            "intent_name": "手续费",
            "question": "手续费记录在哪里看？",
            "category": "基础意图"
        },

        // 2.4.5 资金费率记录（3个问题）
        {
            "intent_id": "2.4.5",
            "intent_name": "资金费率记录",
            "question": "我的资金费率记录是多少？",
            "category": "基础意图"
        },
        {
            "intent_id": "2.4.5",
            "intent_name": "资金费率记录",
            "question": "资金费率收取明细帮我看看",
            "category": "基础意图"
        },
        {
            "intent_id": "2.4.5",
            "intent_name": "资金费率记录",
            "question": "资金费率历史记录在哪里？",
            "category": "基础意图"
        },

        // 2.5.1 实时价格（4个问题）
        {
            "intent_id": "2.5.1",
            "intent_name": "实时价格",
            "question": "BTC/USDT价格是多少？",
            "category": "基础意图"
        },
        {
            "intent_id": "2.5.1",
            "intent_name": "实时价格",
            "question": "ETH当前价格帮我查一下",
            "category": "基础意图"
        },
        {
            "intent_id": "2.5.1",
            "intent_name": "实时价格",
            "question": "SOL最新价格是多少？",
            "category": "基础意图"
        },
        {
            "intent_id": "2.5.1",
            "intent_name": "实时价格",
            "question": "DOGE现在价格多少？",
            "category": "基础意图"
        },

        // 2.5.2 24h涨跌（3个问题）
        {
            "intent_id": "2.5.2",
            "intent_name": "24h涨跌",
            "question": "BTC今天涨了多少？",
            "category": "基础意图"
        },
        {
            "intent_id": "2.5.2",
            "intent_name": "24h涨跌",
            "question": "ETH24小时涨跌幅是多少？",
            "category": "基础意图"
        },
        {
            "intent_id": "2.5.2",
            "intent_name": "24h涨跌",
            "question": "SOL今日跌幅帮我查一下",
            "category": "基础意图"
        },

        // 2.5.3 成交量（3个问题）
        {
            "intent_id": "2.5.3",
            "intent_name": "成交量",
            "question": "BTC今天成交量是多少？",
            "category": "基础意图"
        },
        {
            "intent_id": "2.5.3",
            "intent_name": "成交量",
            "question": "ETH24h成交量帮我查一下",
            "category": "基础意图"
        },
        {
            "intent_id": "2.5.3",
            "intent_name": "成交量",
            "question": "SOL交易量是多少？",
            "category": "基础意图"
        },

        // 2.5.4 资金费率（3个问题）
        {
            "intent_id": "2.5.4",
            "intent_name": "资金费率",
            "question": "BTC合约当前资金费率是多少？",
            "category": "基础意图"
        },
        {
            "intent_id": "2.5.4",
            "intent_name": "资金费率",
            "question": "ETH资金费率帮我查一下",
            "category": "基础意图"
        },
        {
            "intent_id": "2.5.4",
            "intent_name": "资金费率",
            "question": "最新资金费率是多少？",
            "category": "基础意图"
        },

        // 2.5.5 行情概览（3个问题）
        {
            "intent_id": "2.5.5",
            "intent_name": "行情概览",
            "question": "现在市场行情怎么样？",
            "category": "基础意图"
        },
        {
            "intent_id": "2.5.5",
            "intent_name": "行情概览",
            "question": "全品种行情概览帮我看看",
            "category": "基础意图"
        },
        {
            "intent_id": "2.5.5",
            "intent_name": "行情概览",
            "question": "主流币行情如何？",
            "category": "基础意图"
        },

        // ===== 三、交易类（共50个问题） =====

        // 3.1 合约开仓（5个问题）
        {
            "intent_id": "3.1",
            "intent_name": "合约开仓",
            "question": "开多BTC合约100U",
            "category": "基础意图"
        },
        {
            "intent_id": "3.1",
            "intent_name": "合约开仓",
            "question": "做空ETH，仓位200U",
            "category": "基础意图"
        },
        {
            "intent_id": "3.1",
            "intent_name": "合约开仓",
            "question": "我想买涨BTC/USDT，开仓500U",
            "category": "基础意图"
        },
        {
            "intent_id": "3.1",
            "intent_name": "合约开仓",
            "question": "买跌SOL合约，数量0.5个",
            "category": "基础意图"
        },
        {
            "intent_id": "3.1",
            "intent_name": "合约开仓",
            "question": "帮我开个合约多单",
            "category": "基础意图"
        },

        // 3.2 合约平仓（5个问题）
        {
            "intent_id": "3.2",
            "intent_name": "合约平仓",
            "question": "平掉BTC仓位",
            "category": "基础意图"
        },
        {
            "intent_id": "3.2",
            "intent_name": "合约平仓",
            "question": "平多ETH合约",
            "category": "基础意图"
        },
        {
            "intent_id": "3.2",
            "intent_name": "合约平仓",
            "question": "平空SOL仓位",
            "category": "基础意图"
        },
        {
            "intent_id": "3.2",
            "intent_name": "合约平仓",
            "question": "全部平仓",
            "category": "基础意图"
        },
        {
            "intent_id": "3.2",
            "intent_name": "合约平仓",
            "question": "帮我平掉一半的仓位",
            "category": "基础意图"
        },

        // 3.3 现货买入（5个问题）
        {
            "intent_id": "3.3",
            "intent_name": "现货买入",
            "question": "买入BTC现货100U",
            "category": "基础意图"
        },
        {
            "intent_id": "3.3",
            "intent_name": "现货买入",
            "question": "现货买ETH",
            "category": "基础意图"
        },
        {
            "intent_id": "3.3",
            "intent_name": "现货买入",
            "question": "买100U的BTC现货",
            "category": "基础意图"
        },
        {
            "intent_id": "3.3",
            "intent_name": "现货买入",
            "question": "我想买点SOL现货",
            "category": "基础意图"
        },
        {
            "intent_id": "3.3",
            "intent_name": "现货买入",
            "question": "市价买入DOGE现货50U",
            "category": "基础意图"
        },

        // 3.4 现货卖出（5个问题）
        {
            "intent_id": "3.4",
            "intent_name": "现货卖出",
            "question": "卖出BTC现货",
            "category": "基础意图"
        },
        {
            "intent_id": "3.4",
            "intent_name": "现货卖出",
            "question": "现货卖ETH，卖一半",
            "category": "基础意图"
        },
        {
            "intent_id": "3.4",
            "intent_name": "现货卖出",
            "question": "全部卖出SOL现货",
            "category": "基础意图"
        },
        {
            "intent_id": "3.4",
            "intent_name": "现货卖出",
            "question": "帮我把持仓的DOGE卖了",
            "category": "基础意图"
        },
        {
            "intent_id": "3.4",
            "intent_name": "现货卖出",
            "question": "限价卖出BTC，价格50000",
            "category": "基础意图"
        },

        // 3.5 赚取理财（5个问题）
        {
            "intent_id": "3.5",
            "intent_name": "赚取理财",
            "question": "我要理财",
            "category": "基础意图"
        },
        {
            "intent_id": "3.5",
            "intent_name": "赚取理财",
            "question": "购买理财产品",
            "category": "基础意图"
        },
        {
            "intent_id": "3.5",
            "intent_name": "赚取理财",
            "question": "查看理财收益",
            "category": "基础意图"
        },
        {
            "intent_id": "3.5",
            "intent_name": "赚取理财",
            "question": "ChuangZaoAI 交易平台有什么理财产品？",
            "category": "基础意图"
        },
        {
            "intent_id": "3.5",
            "intent_name": "赚取理财",
            "question": "活期理财收益怎么样？",
            "category": "基础意图"
        },

        // 3.6 金库Vault（5个问题）
        {
            "intent_id": "3.6",
            "intent_name": "金库Vault",
            "question": "Vault金库怎么加入？",
            "category": "基础意图"
        },
        {
            "intent_id": "3.6",
            "intent_name": "金库Vault",
            "question": "加入金库",
            "category": "基础意图"
        },
        {
            "intent_id": "3.6",
            "intent_name": "金库Vault",
            "question": "金库收益怎么样？",
            "category": "基础意图"
        },
        {
            "intent_id": "3.6",
            "intent_name": "金库Vault",
            "question": "怎么查看我在金库的资产？",
            "category": "基础意图"
        },
        {
            "intent_id": "3.6",
            "intent_name": "金库Vault",
            "question": "退出金库怎么操作？",
            "category": "基础意图"
        },

        // 3.7 质押（5个问题）
        {
            "intent_id": "3.7",
            "intent_name": "质押",
            "question": "我要质押",
            "category": "基础意图"
        },
        {
            "intent_id": "3.7",
            "intent_name": "质押",
            "question": "质押挖矿收益是多少？",
            "category": "基础意图"
        },
        {
            "intent_id": "3.7",
            "intent_name": "质押",
            "question": "解除质押怎么操作？",
            "category": "基础意图"
        },
        {
            "intent_id": "3.7",
            "intent_name": "质押",
            "question": "ChuangZaoAI 交易平台支持哪些币种质押？",
            "category": "基础意图"
        },
        {
            "intent_id": "3.7",
            "intent_name": "质押",
            "question": "质押到期后怎么取回？",
            "category": "基础意图"
        },

        // 3.8 入金充值（5个问题）
        {
            "intent_id": "3.8",
            "intent_name": "入金充值",
            "question": "我要充值",
            "category": "基础意图"
        },
        {
            "intent_id": "3.8",
            "intent_name": "入金充值",
            "question": "充钱到账户",
            "category": "基础意图"
        },
        {
            "intent_id": "3.8",
            "intent_name": "入金充值",
            "question": "入金操作怎么弄？",
            "category": "基础意图"
        },
        {
            "intent_id": "3.8",
            "intent_name": "入金充值",
            "question": "充值USDT到ChuangZaoAI 交易平台",
            "category": "基础意图"
        },
        {
            "intent_id": "3.8",
            "intent_name": "入金充值",
            "question": "充币地址在哪里看？",
            "category": "基础意图"
        },

        // 3.9 出金提现（5个问题）
        {
            "intent_id": "3.9",
            "intent_name": "出金提现",
            "question": "我要提现",
            "category": "基础意图"
        },
        {
            "intent_id": "3.9",
            "intent_name": "出金提现",
            "question": "怎么出金？",
            "category": "基础意图"
        },
        {
            "intent_id": "3.9",
            "intent_name": "出金提现",
            "question": "提币到我的钱包",
            "category": "基础意图"
        },
        {
            "intent_id": "3.9",
            "intent_name": "出金提现",
            "question": "提现USDT到钱包地址",
            "category": "基础意图"
        },
        {
            "intent_id": "3.9",
            "intent_name": "出金提现",
            "question": "提现手续费是多少？",
            "category": "基础意图"
        },

        // 3.10 资金划转（5个问题）
        {
            "intent_id": "3.10",
            "intent_name": "资金划转",
            "question": "我要划转资金",
            "category": "基础意图"
        },
        {
            "intent_id": "3.10",
            "intent_name": "资金划转",
            "question": "现货转合约",
            "category": "基础意图"
        },
        {
            "intent_id": "3.10",
            "intent_name": "资金划转",
            "question": "合约转现货",
            "category": "基础意图"
        },
        {
            "intent_id": "3.10",
            "intent_name": "资金划转",
            "question": "划转100U到合约账户",
            "category": "基础意图"
        },
        {
            "intent_id": "3.10",
            "intent_name": "资金划转",
            "question": "资金划转多久到账？",
            "category": "基础意图"
        },

        // ===== 四、高风险复杂问题（共4个问题） =====

        {
            "intent_id": "4",
            "intent_name": "高风险复杂问题",
            "question": "我的资产不见了，账户里的钱怎么少了？",
            "category": "基础意图"
        },
        {
            "intent_id": "4",
            "intent_name": "高风险复杂问题",
            "question": "订单异常成交，价格不对",
            "category": "基础意图"
        },
        {
            "intent_id": "4",
            "intent_name": "高风险复杂问题",
            "question": "提现不到账，已经两天了",
            "category": "基础意图"
        },
        {
            "intent_id": "4",
            "intent_name": "高风险复杂问题",
            "question": "我要投诉，对处理结果不满意",
            "category": "基础意图"
        },

        // ===== 五、咨询推荐类（共2个问题） =====

        {
            "intent_id": "5",
            "intent_name": "咨询推荐类",
            "question": "ChuangZaoAI.com 官网是什么？",
            "category": "基础意图"
        },
        {
            "intent_id": "5",
            "intent_name": "咨询推荐类",
            "question": "最新活动在哪里看？",
            "category": "基础意图"
        },

        // ===== 六、意图不明（共2个问题） =====

        {
            "intent_id": "6",
            "intent_name": "意图不明",
            "question": "你好",
            "category": "基础意图"
        },
        {
            "intent_id": "6",
            "intent_name": "意图不明",
            "question": "在吗，帮我一下",
            "category": "基础意图"
        },

        // ===== 七、询问来源和底层（共2个问题） =====

        {
            "intent_id": "7",
            "intent_name": "询问来源和底层",
            "question": "你是谁开发的？",
            "category": "基础意图"
        },
        {
            "intent_id": "7",
            "intent_name": "询问来源和底层",
            "question": "你的底层模型是什么？",
            "category": "基础意图"
        },

        // ==================== 第二部分：长场景测试问题（60个） ====================
        // 标注说明：长场景问题涉及多个意图、多个步骤的复杂问题，符合金融用户实际咨询习惯

        // ===== 场景一：完整开户与入金流程（10个问题） =====
        {
            "intent_id": "长场景",
            "intent_name": "完整开户与入金流程",
            "question": "我在 ChuangZaoAI 交易平台怎么注册账号？注册完需要实名认证吗？需要什么材料？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "完整开户与入金流程",
            "question": "实名认证审核多久能通过？审核通过后怎么充值？支持哪些充值方式？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "完整开户与入金流程",
            "question": "我是新用户，想了解从注册到开始交易需要哪些步骤？开户有什么门槛吗？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "完整开户与入金流程",
            "question": "充值到账时间要多久？充值后资金在哪个账户？怎么划转到交易账户？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "完整开户与入金流程",
            "question": "我刚完成注册，想开始交易，但是不知道怎么操作，能详细说一下流程吗？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "完整开户与入金流程",
            "question": "KYC认证需要提交哪些材料？身份证照片有什么要求？审核失败怎么办？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "完整开户与入金流程",
            "question": "新用户首次充值有优惠吗？充值的最低金额是多少？充值失败了怎么处理？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "完整开户与入金流程",
            "question": "注册后发现名字填错了能改吗？实名认证信息填错了怎么办？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "完整开户与入金流程",
            "question": "充值的币种选错了怎么办？充错地址了能找回吗？需要联系客服吗？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "完整开户与入金流程",
            "question": "开户完成后怎么设置交易密码？交易密码忘记怎么找回？和登录密码有什么区别？",
            "category": "长场景"
        },

        // ===== 场景二：异常交易处理（10个问题） =====
        {
            "intent_id": "长场景",
            "intent_name": "异常交易处理",
            "question": "我有一笔交易没成功，钱扣了但没成交，订单状态显示异常，怎么申请退款？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "异常交易处理",
            "question": "下单时显示成功但账户里没有持仓记录，钱也扣了，这是怎么回事？怎么处理？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "异常交易处理",
            "question": "平仓后发现到账金额和预期不一样，好像少了一笔钱，帮我查一下交易记录和流水明细",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "异常交易处理",
            "question": "我的挂单一直没成交，想取消但取消不了，系统提示异常，这种情况怎么办？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "异常交易处理",
            "question": "交易时系统显示价格和实际成交价格不一样，滑点太大，这正常吗？可以申诉吗？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "异常交易处理",
            "question": "刚才一笔交易显示网络错误，但我查了一下资金已经扣除了，帮我确认一下订单状态",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "异常交易处理",
            "question": "强平价格和实际强平价格差很多，导致我损失惨重，这个怎么解释？可以投诉吗？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "异常交易处理",
            "question": "交易手续费扣多了，和平台公示的不一样，帮我核实一下手续费明细",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "异常交易处理",
            "question": "我设置的是限价单，但系统按市价成交了，价格相差很大，这个损失谁来承担？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "异常交易处理",
            "question": "提现申请提交后一直显示处理中，都三天了还没到账，帮我查一下提现记录和处理进度",
            "category": "长场景"
        },

        // ===== 场景三：投诉与反馈（10个问题） =====
        {
            "intent_id": "长场景",
            "intent_name": "投诉与反馈",
            "question": "我要投诉，之前的问题反馈了三天还没人处理，这种情况怎么升级反馈？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "投诉与反馈",
            "question": "对客服处理结果不满意，我觉得处理不公平，可以申请复核吗？怎么申诉？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "投诉与反馈",
            "question": "我的问题一直没解决，客服说等通知，已经等了一周了，怎么投诉才能有效？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "投诉与反馈",
            "question": "账户被冻结了，客服说要配合调查，但我不知道什么原因，怎么申诉解冻？需要什么材料？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "投诉与反馈",
            "question": "平台系统故障导致我亏损，反馈后只说会记录，什么时候能给赔偿方案？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "投诉与反馈",
            "question": "我想投诉某个客服人员态度差、不解决问题，有投诉渠道吗？会有人跟进吗？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "投诉与反馈",
            "question": "提交的工单一直显示处理中，没有人联系我，怎么催促处理？能转接主管吗？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "投诉与反馈",
            "question": "对交易结果有争议，认为平台处理不当，可以申请第三方仲裁吗？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "投诉与反馈",
            "question": "之前承诺的补偿一直没有到账，每次问都说在处理，这个问题怎么解决？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "投诉与反馈",
            "question": "我在 ChuangZaoAI 交易平台遇到资金安全问题，需要紧急处理，能帮我转接人工客服主管吗？",
            "category": "长场景"
        },

        // ===== 场景四：多品种交易咨询（10个问题） =====
        {
            "intent_id": "长场景",
            "intent_name": "多品种交易咨询",
            "question": "我想买BTC现货，手续费是多少？买完后怎么卖出？收益在哪里看？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "多品种交易咨询",
            "question": "BTC合约怎么开多？保证金需要多少？如果亏了怎么追加保证金？平仓怎么操作？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "多品种交易咨询",
            "question": "ETH现货和合约有什么区别？哪个更适合新手？交易时间和限制是什么？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "多品种交易咨询",
            "question": "SOL最近涨跌幅怎么样？成交量多少？资金费率是多少？适合现在入手吗？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "多品种交易咨询",
            "question": "我想同时做多BTC和做空ETH，怎么操作？风险大吗？怎么设置止盈止损？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "多品种交易咨询",
            "question": "DOGE现货买入后，怎么查看我的持仓？什么时候卖出合适？卖出后资金在哪？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "多品种交易咨询",
            "question": "我想了解不同币种的手续费率，哪里可以看？大户有优惠吗？VIP等级怎么升级？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "多品种交易咨询",
            "question": "合约交易强平规则是什么？保证金比例低于多少会强平？强平后还能追回损失吗？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "多品种交易咨询",
            "question": "现在主流币行情怎么样？BTC和ETH哪个更适合长线持有？当前价格多少？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "多品种交易咨询",
            "question": "小币种交易有什么限制？流动性怎么样？买单和卖单差价大吗？容易成交吗？",
            "category": "长场景"
        },

        // ===== 场景五：资金管理与账户安全（10个问题） =====
        {
            "intent_id": "长场景",
            "intent_name": "资金管理与账户安全",
            "question": "我的账户权益是多少？可用资金还有多少？维持保证金比率安全吗？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "资金管理与账户安全",
            "question": "怎么查看我的持仓浮盈浮亏？未实现盈亏怎么算的？什么时候会变成已实现？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "资金管理与账户安全",
            "question": "现货账户和合约账户资金怎么划转？划转有手续费吗？即时到账吗？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "资金管理与账户安全",
            "question": "账户安全怎么设置？怎么开启谷歌验证器？提现白名单怎么添加？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "资金管理与账户安全",
            "question": "资金流水明细在哪里看？充值记录和提现记录能导出吗？最近一笔交易详情帮我查一下",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "资金管理与账户安全",
            "question": "我的资金费率收入和支出明细在哪里看？持仓过夜会收取资金费率吗？什么时候结算？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "资金管理与账户安全",
            "question": "账户被异地登录了怎么办？怎么修改密码？需要冻结账户吗？怎么联系客服处理？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "资金管理与账户安全",
            "question": "我想把资产转到理财账户，怎么操作？理财收益怎么计算？能随时赎回吗？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "资金管理与账户安全",
            "question": "质押挖矿收益怎么算？质押后能提前赎回吗？有什么风险？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "资金管理与账户安全",
            "question": "金库Vault怎么加入？收益是固定的吗？本金有保障吗？怎么退出？",
            "category": "长场景"
        },

        // ===== 场景六：高级功能与生态（10个问题） =====
        {
            "intent_id": "长场景",
            "intent_name": "高级功能与生态",
            "question": "API接口怎么调用？需要什么权限？频率限制是多少？有示例代码吗？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "高级功能与生态",
            "question": "Websocket怎么连接实时行情？推送频率是多少？支持哪些数据订阅？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "高级功能与生态",
            "question": "Builder是什么功能？怎么创建自己的交易策略？支持哪些策略类型？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "高级功能与生态",
            "question": "网格交易怎么设置？参数怎么配置？止盈止损怎么设？收益如何？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "高级功能与生态",
            "question": "ChuangZaoAI 交易平台支持量化交易吗？有回测功能吗？策略怎么上传？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "高级功能与生态",
            "question": "跟单交易怎么开通？可以选择跟单哪些交易员？收益分成怎么算？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "高级功能与生态",
            "question": "VIP等级有什么权益？怎么升级？交易手续费折扣多少？有专属客服吗？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "高级功能与生态",
            "question": "平台有什么活动可以参加？新人有什么福利？推荐奖励怎么领取？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "高级功能与生态",
            "question": "合约交易支持哪些杠杆倍数？不同币种杠杆上限一样吗？怎么调整杠杆？",
            "category": "长场景"
        },
        {
            "intent_id": "长场景",
            "intent_name": "高级功能与生态",
            "question": "ChuangZaoAI.com 平台的撮合机制是怎样的？委托单怎么匹配？深度怎么样？",
            "category": "长场景"
        }
    ]
};