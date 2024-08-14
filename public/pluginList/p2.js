const name = "p2";
const describe = "P2 插件";
const print = () => {
  console.log(`[${name}] ${describe}`);
};
window.P2 = {
  name,
  describe,
  print,
};
export default P2;
