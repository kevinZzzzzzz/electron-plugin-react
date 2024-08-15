const name = "p1";
const describe = "P1 插件";

const print = () => {
  console.log(`[${name}] ${describe}`);
};
const P1 = {
  name,
  describe,
  print,
};
window.$plugins.P1 = P1

export default P1;
