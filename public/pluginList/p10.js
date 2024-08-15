const name = "p10";
const describe = "P10 插件";
const print = () => {
  console.log(`[${name}] ${describe}`);
};

const P10 = {
  name,
  describe,
  print,
};
window.$plugins.P10 = P10
export default P10;
