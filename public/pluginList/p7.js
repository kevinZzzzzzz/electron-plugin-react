const name = "p7";
const describe = "P7 插件";
const print = () => {
  console.log(`[${name}] ${describe}`);
};

const P7 = {
  name,
  describe,
  print,
};
window.$plugins.P7 = P7
export default P7;
