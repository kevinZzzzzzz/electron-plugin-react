const name = "p6";
const describe = "P6 插件";
const print = () => {
  console.log(`[${name}] ${describe}`);
};

const P6 = {
  name,
  describe,
  print,
};
window.$plugins.P6 = P6
export default P6;
