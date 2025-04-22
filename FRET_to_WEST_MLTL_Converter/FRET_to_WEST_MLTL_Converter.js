// Symbol mapping from FRET syntax to MLTL syntax
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

// Symbols to ignore and their explanations
const ignoredSymbolsWithMeaning = {
  "LAST V": "Indicates current state relevance; removed in conversion.",
  X: "Next operator; removed in conversion.",
  G: "Globally operator; removed in conversion.",
  F: "Finally operator; removed in conversion.",
  U: "Until operator; removed in conversion.",
  R: "Release operator; removed in conversion.",
};

/**
 * Validates the formula to ensure it meets basic syntax requirements.
 * @param {string} formula - The formula to validate.
 * @throws {Error} - If the formula is invalid.
 */
function validateFormula(formula) {
  if (!formula) throw new Error("Formula cannot be empty.");
  const unmatchedParentheses = formula.split("").reduce((count, char) => {
    if (char === "(") count++;
    if (char === ")") count--;
    return count;
  }, 0);  
  if (unmatchedParentheses !== 0) {
    throw new Error("Unmatched parentheses in formula.");
  }
}

/**
 * Removes ignored symbols from the formula.
 * @param {string} formula - The FRET formula to process.
 * @returns {string} - The cleaned formula without ignored symbols.
 */
function removeIgnoredSymbols(formula) {
  Object.keys(ignoredSymbolsWithMeaning).forEach((symbol) => {
    const regex = new RegExp(`\\b${symbol}\\b`, "g");
    formula = formula.replace(regex, "").trim();
  });
  return formula;
}

/**
 * Maps FRET symbols to MLTL symbols in the formula.
 * @param {string} formula - The FRET formula to process.
 * @returns {string} - The updated formula with MLTL symbols.
 */
function mapSymbols(formula) {
  for (const [fretSymbol, mltlSymbol] of Object.entries(symbolMap)) {
    const regex = new RegExp(`\\b${fretSymbol}\\b`, "g");
    formula = formula.replace(regex, mltlSymbol);
  }
  return formula;
}

/**
 * Handles relational operators (<, <=, >, >=) in the formula.
 * @param {string} formula - The formula to process.
 * @returns {string} - The updated formula.
 */
function handleRelationalOperators(formula) {
  return formula
    .replace(/(\w+)\s*<\s*(\w+)/g, "(!($1) & ($2))")
    .replace(/(\w+)\s*<=\s*(\w+)/g, "(!($1) | ($2))")
    .replace(/(\w+)\s*>\s*(\w+)/g, "(($1) & !($2))")
    .replace(/(\w+)\s*>=\s*(\w+)/g, "(($1) | !($2))");
}

/**
 * Standardizes variables in the formula to a generic format (e.g., p1, p2).
 * @param {string} formula - The formula to standardize.
 * @returns {Object} - The standardized formula and variable map.
 */
function standardizeVariables(formula) {
  const variableMap = {};
  let counter = 0;
  const standardizedFormula = formula.replace(/\b[a-zA-Z_]\w*\b/g, (v) => {
    if (Object.values(symbolMap).includes(v)) return v; // Skip symbols
    if (!variableMap[v]) variableMap[v] = `p${++counter}`;
    return variableMap[v];
  });
  return { standardizedFormula, variableMap };
}

/**
 * Cleans up spacing and removes redundant parentheses in the formula.
 * @param {string} formula - The formula to process.
 * @returns {string} - The cleaned formula.
 */
function cleanFormula(formula) {
  return formula
    .replace(/\s*([()!&|=->X<>=])\s*/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Converts a FRET formula into an MLTL formula.
 * @param {string} formula - The input FRET formula.
 * @returns {Object} - An object with the converted formula, steps, and variable mapping.
 */
function convertFretToMltl(formula) {
  const conversionSteps = [];

  // Step 1: Validate formula
  validateFormula(formula);
  conversionSteps.push({ step: "Validated formula", formula });

  // Step 2: Remove ignored symbols
  formula = removeIgnoredSymbols(formula);
  conversionSteps.push({ step: "Removed ignored symbols", formula });

  // Step 3: Handle relational operators
  formula = handleRelationalOperators(formula);
  conversionSteps.push({ step: "Handled relational operators", formula });

  // Step 4: Map FRET symbols to MLTL symbols
  formula = mapSymbols(formula);
  conversionSteps.push({ step: "Mapped FRET symbols", formula });

  // Step 5: Standardize variables
  const { standardizedFormula, variableMap } = standardizeVariables(formula);
  formula = standardizedFormula;
  conversionSteps.push({ step: "Standardized variables", formula });

  // Step 6: Clean up formula
  formula = cleanFormula(formula);
  conversionSteps.push({ step: "Cleaned formula", formula });

  return {
    convertedFormula: formula,
    conversionSteps,
    variableMap,
    ignoredSymbolsWithMeaning,
  };
}

module.exports = { convertFretToMltl };
