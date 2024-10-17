export default {
  // 继承的规则
  extends: ["@commitlint/config-conventional", "cz"],
  plugins: [
    {
      // 校验提交信息是否包含 story 和 user 参数
      rules: {
        "examine-subject": (parsed) => {
          const subjectArr = parsed.subject.split(" ");
          const containsStoryFlag =
            parsed.subject.includes("--story") ||
            parsed.subject.includes("--bug");
          const containsUserFlag = parsed.subject.includes("--user");
          if (!containsStoryFlag) {
            return [false, '提交信息必须包含 "--story" 或者 "--bug" 参数'];
          } else {
            const storyStr = subjectArr[1]?.split("=");
            if (storyStr.length <= 1 || !storyStr[1]) {
              return [false, "请输入关联的 storyId或者bugId"];
            }
          }
          if (!containsUserFlag) {
            return [false, '提交信息必须包含 "--user" 参数'];
          } else {
            const userStr = subjectArr[2]?.split("=");
            if (userStr.length <= 1 || !userStr[1]) {
              return [false, "请输入提交人user"];
            }
          }
          return [true];
        },
      },
    },
  ],
  // 定义规则类型
  rules: {
    // type 类型定义，表示 git 提交的 type 必须在以下类型范围内
    "type-enum": [
      2,
      "always",
      [
        "feat", // 新功能 feature
        "fix", // 修复 bug
        "docs", // 文档注释
        "style", // 代码格式(不影响代码运行的变动)
        "refactor", // 重构(既不增加新功能，也不是修复bug)
        "perf", // 性能优化
        "test", // 增加测试
        "chore", // 构建过程或辅助工具的变动
        "revert", // 回退
        "build", // 打包
      ],
    ],
    "type-empty": [2, "never"], // <type> 不能为空// 'type-case': [2, 'always', 'lower-case'], // <type>格式小写
    "type-case": [0],
    "scope-empty": [0],
    // 'scope-case': [2, 'always', 'lower-case'], // <scope> 格式 小写
    "scope-case": [0],
    "subject-empty": [2, "never"], // <subject> 不能为空 (默认)
    // 'subject-full-stop': [2, 'never', '.'], // <subject> 以.为结束标志
    "subject-full-stop": [0, "never"],
    // 'subject-case': [2, 'never', 'lower-case'],
    "subject-case": [0, "never"],
    "examine-subject": [2, "always"],
    // case可选值
    // 'lower-case' 小写 lowercase
    // 'upper-case' 大写 UPPERCASE
    // 'camel-case' 小驼峰 camelCase
    // 'kebab-case' 短横线 kebab-case
    // 'pascal-case' 大驼峰 PascalCase
    // 'sentence-case' 首字母大写 Sentence case
    // 'snake-case' 下划线 snake_case
    // 'start-case' 所有首字母大写 start-case

    "header-max-length": [0, "always", 72], // header 最长72
    // 'body-leading-blank': [2, 'always'], // body换行
    // 'footer-leading-blank': [1, 'always'], // <footer> 以空行开头
  },
};
