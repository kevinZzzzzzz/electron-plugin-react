const name = "p8";
const describe = "P8 插件";
const print = () => {
  console.log(`[${name}] ${describe}`);
};

const P8 = {
  name,
  describe,
  print,
};
window.$plugins.P8 = P8
export default P8;
