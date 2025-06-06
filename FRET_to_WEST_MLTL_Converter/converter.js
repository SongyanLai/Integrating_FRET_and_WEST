function convertLTLToMLTL() {
  const ltlFormula = document.getElementById("ltlFormula").value;
  let interval = document.getElementById("interval").value;

  if (!interval) {
    interval = "(0,∞)";
  }

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

  let mltlFormula = ltlFormula;
  for (const [key, value] of Object.entries(operators)) {
    const regex = new RegExp(`\\b${key}\\b`, "g");
    mltlFormula = mltlFormula.replace(regex, value);
  }

  document.getElementById("mltlFormula").innerText = mltlFormula;
}
