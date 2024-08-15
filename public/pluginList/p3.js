const name = "p3";
const describe = "P3 插件";
const print = () => {
  console.log(`[${name}] ${describe}`);
};

const P3 = {
  name,
  describe,
  print,
};
window.$plugins.P3 = P3
export default P3;
