const name = "p5";
const describe = "P5 插件";
const print = () => {
  console.log(`[${name}] ${describe}`);
};

const P5 = {
  name,
  describe,
  print,
};
window.$plugins.P5 = P5
export default P5;
