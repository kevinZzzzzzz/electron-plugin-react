const name = "p4";
const describe = "P4 插件";
const print = () => {
  console.log(`[${name}] ${describe}`);
};
window.P4 = {
  name,
  describe,
  print,
};
export default P4;
