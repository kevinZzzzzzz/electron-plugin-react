const name = "p9";
const describe = "P9 插件";
const print = () => {
  console.log(`[${name}] ${describe}`);
};

const P9 = {
  name,
  describe,
  print,
};
window.$plugins.P9 = P9
export default P9;
