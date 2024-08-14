const name = "p1";
const describe = "P1 插件";

const print = () => {
  console.log(`[${name}] ${describe}`);
};
window.P1 = {
  name,
  describe,
  print,
};

export default P1;
