const name = "p4";
const describe = "P4 插件";
const print = () => {
  console.log(`[${name}] ${describe}`);
};

const P4 = {
  name,
  describe,
  print,
};
window.$plugins.P4 = P4
export default P4;
