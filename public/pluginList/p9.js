const name = "p9";
const describe = "P9 插件";
const print = () => {
  console.log(`[${name}] ${describe}`);
};
window.P9 = {
  name,
  describe,
  print,
};
export default P9;
