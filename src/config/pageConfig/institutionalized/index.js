// 制度化管理
export default {
    // 法律法规识别-法规标准库
    "/institutionalized/lawsRegulations/standardLibrary": {
        $leftWidth: 0,
        $rightWidth: 24,
        isTree: true,
        headerButtons: ["daoru", "daochu", "xiaoleibie", "xinzeng", "chaxun", "chongzhi"],
        operationButtons: ["chakan", "bianji", "shanchu", "weishibie", "shibie"],
        dictionary: []
    },

    // 法律法规识别-法规识别
    "/institutionalized/lawsRegulations/lawIdentify": {
        $leftWidth: 0,
        $rightWidth: 24,
        isTree: true,
        headerButtons: ["daochubaogao", "xinzeng", "chaxun", "chongzhi"],
        operationButtons: ["chakan", "bianji", "shanchu", "shenpi"],
        dictionary: []
    },

    // 安全管理制度-安全管理制度
    "/institutionalized/safetyManage/manageSystem": {
        $leftWidth: 0,
        $rightWidth: 24,
        isTree: true,
        headerButtons: ["daoru", "daochu", "xinzeng", "chaxun"],
        operationButtons: ["chakan", "bianji", "shanchu", "shenpi", "zuofei"],
        dictionary: []
    },

    // 安全管理制度-制度评审记录
    "/institutionalized/safetyManage/systemRecords": {
        $leftWidth: 0,
        $rightWidth: 24,
        isTree: true,
        headerButtons: ["daochu", "xinzeng", "chaxun"],
        operationButtons: ["chakan", "bianji", "shanchu", "shenpi"],
        dictionary: []
    },

    // 安全操作规程-安全操作规程
    "/institutionalized/safetyOperation/operationRules": {
        $leftWidth: 0,
        $rightWidth: 24,
        isTree: true,
        headerButtons: ["daoru", "daochu", "xinzeng", "chaxun"],
        operationButtons: ["chakan", "bianji", "shanchu", "shenpi", "zuofei"],
        dictionary: []
    },

    // 安全操作规程-规程评审记录
    "/institutionalized/safetyOperation/rulesRecords": {
        $leftWidth: 0,
        $rightWidth: 24,
        isTree: true,
        headerButtons: ["daochu", "xinzeng", "chaxun"],
        operationButtons: ["chakan", "bianji", "shanchu", "shenpi"],
        dictionary: []
    },

    // 安全文档管理-文件发布
    "/institutionalized/safetyDocument/documentRelease": {
        $leftWidth: 0,
        $rightWidth: 24,
        isTree: true,
        headerButtons: ["xinzeng", "chaxun"],
        operationButtons: ["chakan", "bianji", "shanchu", "shenpi"],
        dictionary: []
    },

    // 安全文档管理-文件传阅管理
    "/institutionalized/safetyDocument/documentCirculation": {
        $leftWidth: 0,
        $rightWidth: 24,
        isTree: true,
        headerButtons: ["chaxun"],
        operationButtons: [],
        dictionary: []
    },

    // 安全文档管理-文件查阅
    "/institutionalized/safetyDocument/documentConsult": {
        $leftWidth: 0,
        $rightWidth: 24,
        isTree: true,
        headerButtons: ["chaxun"],
        operationButtons: [],
        dictionary: []
    },

    // 安全文档管理-文件查阅
    "/institutionalized/workFlow/approvalStructure": {
        $leftWidth: 0,
        $rightWidth: 24,
        isTree: true,
        headerButtons: ["xinzeng", "chaxun", "chongzhi"],
        operationButtons: ["tianjiashenpiren", "bianji", "shanchu"],
        dictionary: []
    },
};
