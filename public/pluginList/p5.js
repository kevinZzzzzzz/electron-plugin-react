const name = "p5";
const describe = "P5 插件";
const print = () => {
  console.log(`[${name}] ${describe}`);
};
window.P5 = {
  name,
  describe,
  print,
};
export default P5;
