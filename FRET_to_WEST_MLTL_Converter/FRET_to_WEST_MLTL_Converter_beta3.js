// Convert FRET formula to MLTL format with comparison expression replacement
function fretToMltlConverter(inputFormula) {
  // Map of FRET symbols to MLTL equivalents
  const symbolMap = {
    eventually: "F",
    always: "G",
    until: "U",
    release: "R",
    true: "true",
    false: "false",
    and: "&",
    or: "|",
    not: "!",
    "->": "->",
    "=": "=",
  };

  // Symbols to ignore during conversion with explanations
  const ignoredSymbolsWithMeaning = {
    "LAST V": "Indicates current state relevance; removed in conversion.",
    X: "Next operator; removed in conversion.",
    G: "Globally operator; removed in conversion.",
    F: "Finally operator; removed in conversion.",
    U: "Until operator; removed in conversion.",
    R: "Release operator; removed in conversion.",
  };

  // Array to store conversion steps
  const steps = [];
  // Array to store ignored symbols and their explanations
  const ignoredSymbolsDetails = [];

  // Log each conversion step
  const updateConversionSteps = (step, formula) => {
    steps.push({ step, formula });
  };

  // Remove ignored symbols from the formula
  const removeIgnoredSymbols = (formula) => {
    let cleanedFormula = formula;
    Object.entries(ignoredSymbolsWithMeaning).forEach(([symbol, meaning]) => {
      const regex = new RegExp(`\\b${symbol}\\b`, "g");
      if (regex.test(cleanedFormula)) {
        ignoredSymbolsDetails.push({ symbol, meaning });
        cleanedFormula = cleanedFormula.replace(regex, "").trim();
      }
    });
    updateConversionSteps("Removed ignored time operators", cleanedFormula);
    return cleanedFormula;
  };

  // Replace FRET symbols with MLTL equivalents
  const mapSymbols = (formula) => {
    Object.entries(symbolMap).forEach(([fretSymbol, mltlSymbol]) => {
      const regex = new RegExp(`\\b${fretSymbol}\\b`, "g");
      formula = formula.replace(regex, mltlSymbol);
    });
    updateConversionSteps("Mapped FRET symbols to MLTL", formula);
    return formula;
  };

  // Replace comparison expressions (e.g. "(a > b)") with a variable.
  // The regex uses a negative lookbehind to avoid matching ">" in "->".
  const replaceComparisonExpressions = (formula) => {
    let comparisonMap = {};
    let count = 0;
    // Regex: match a parenthesized expression that contains a comparison operator
    // but the ">" operator must not be preceded by "-" (to avoid "->")
    const regex = /\([^()]*\s*(?<!-)(?:>|<|>=|<=)\s*[^()]*\)/g;
    formula = formula.replace(regex, (match) => {
      const varName = `p${count++}`; // assign a new variable
      comparisonMap[varName] = match;
      return varName;
    });
    updateConversionSteps("Replaced comparison expressions", formula);
    return { formula, comparisonMap };
  };

  // Standardize variable names to pX, excluding those already replaced
  const standardizeVariables = (formula, excludeSet = new Set()) => {
    const variableMap = {};
    let variableCount = 0;
    const standardizedFormula = formula.replace(
      /\b[a-zA-Z_]\w*\b/g,
      (match) => {
        if (excludeSet.has(match) || Object.values(symbolMap).includes(match))
          return match;
        if (!variableMap[match]) variableMap[match] = `p${++variableCount}`;
        return variableMap[match];
      }
    );
    updateConversionSteps("Standardized variables", standardizedFormula);
    return { formula: standardizedFormula, variableMap };
  };

  // Clean up spacing in the formula
  const cleanUpSpacing = (formula) => {
    const cleanedFormula = formula
      .replace(/\s*([()!&|=->X<>=])\s*/g, "$1")
      .replace(/\s+/g, " ")
      .trim();
    updateConversionSteps("Cleaned up spacing", cleanedFormula);
    return cleanedFormula;
  };

  // Main function to handle the conversion process
  const convertFretToMltl = (formula) => {
    updateConversionSteps("Original formula", formula);
    formula = removeIgnoredSymbols(formula);
    formula = mapSymbols(formula);
    // Replace comparison expressions and get their mapping
    const { formula: compReplacedFormula, comparisonMap } =
      replaceComparisonExpressions(formula);
    // Exclude comparison variables from standardization
    const excludeSet = new Set(Object.keys(comparisonMap));
    const { formula: standardizedFormula, variableMap: standardVarMap } =
      standardizeVariables(compReplacedFormula, excludeSet);
    formula = cleanUpSpacing(standardizedFormula);
    updateConversionSteps("Final converted formula", formula);
    // Merge the mappings from comparisons and standard variables
    const combinedVariableMap = Object.assign(
      {},
      comparisonMap,
      standardVarMap
    );
    return {
      formula,
      steps,
      variableMap: combinedVariableMap,
      ignoredSymbols: ignoredSymbolsDetails,
    };
  };

  return convertFretToMltl(inputFormula);
}

// Usage example
const result = fretToMltlConverter(
  // Example FRET formula with comparisons and an implication arrow
  "((LAST V (((! (sensorfaults & trackingPilotCommands)) & ((! LAST) & (X (sensorfaults & trackingPilotCommands)))) -> (X ((! LAST) U controlObjectives)))) & ((sensorfaults & trackingPilotCommands) -> ((! LAST) U controlObjectives)))"
);
console.log(result.formula); // Final converted formula
console.log(result.steps); // Array of conversion steps
console.log(result.variableMap); // Variable mapping including comparison expressions
console.log(result.ignoredSymbols); // Ignored time operators with explanations
