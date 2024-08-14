const name = "p6";
const describe = "P6 插件";
const print = () => {
  console.log(`[${name}] ${describe}`);
};
window.P6 = {
  name,
  describe,
  print,
};
export default P6;
