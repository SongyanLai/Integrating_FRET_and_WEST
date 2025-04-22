function convertLTLToMLTL() {
  // 获取输入的LTL公式和时间间隔
  const ltlFormula = document.getElementById("ltlFormula").value;
  let interval = document.getElementById("interval").value;

  // 如果没有输入时间间隔，使用默认值 (0,∞)
  if (!interval) {
    interval = "(0,∞)";
  }

  // 定义时态运算符及其MLTL对应形式
  const operators = {
    F: `F_${interval}`,
    G: `G_${interval}`,
    U: `U_${interval}`,
    X: `X_${interval}`,
    P: `P_${interval}`,
    H: `H_${interval}`,
    S: `S_${interval}`,
    O: `O_${interval}`,
  };

  // 替换LTL公式中的运算符为MLTL形式
  let mltlFormula = ltlFormula;
  for (const [key, value] of Object.entries(operators)) {
    const regex = new RegExp(`\\b${key}\\b`, "g");
    mltlFormula = mltlFormula.replace(regex, value);
  }

  // 显示转换后的MLTL公式
  document.getElementById("mltlFormula").innerText = mltlFormula;
}
