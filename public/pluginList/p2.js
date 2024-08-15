const name = "p2";
const describe = "P2 插件";
const print = () => {
  console.log(`[${name}] ${describe}`);
};

const P2 = {
  name,
  describe,
  print,
};
window.$plugins.P2 = P2
export default P2;
