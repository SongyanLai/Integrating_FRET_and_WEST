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
 * @throws {Error} - If the formula contains unmatched parentheses or is empty.
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
 * @param {object} symbolMap - Mapping of FRET symbols to MLTL equivalents.
 * @returns {string} - The updated formula with MLTL symbols.
 */
function mapSymbols(formula, symbolMap) {
  for (const [fretSymbol, mltlSymbol] of Object.entries(symbolMap)) {
    const regex = new RegExp(`\\b${fretSymbol}\\b`, "g");
    formula = formula.replace(regex, mltlSymbol);
  }
  return formula;
}

/**
 * Handles relational operators (<, <=, >, >=) and converts them into logical equivalents.
 * @param {string} formula - The formula to process.
 * @returns {string} - The updated formula with logical equivalents for relational operators.
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
 * @param {object} variableMap - Object to track original and standardized variable names.
 * @returns {string} - The standardized formula.
 */
function standardizeVariables(formula, variableMap = {}) {
  let counter = 0;
  return formula.replace(/\b[a-zA-Z_]\w*\b/g, (v) => {
    if (Object.values(symbolMap).includes(v)) return v; // Skip symbols
    if (!variableMap[v]) variableMap[v] = `p${++counter}`;
    return variableMap[v];
  });
}

/**
 * Cleans up spacing in the formula for a consistent format.
 * @param {string} formula - The formula to clean.
 * @returns {string} - The cleaned formula.
 */
function cleanUpSpacing(formula) {
  return formula
    .replace(/\s*([()!&|=->X<>=])\s*/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Removes redundant parentheses from the formula.
 * @param {string} formula - The formula to process.
 * @returns {string} - The formula with redundant parentheses removed.
 */
function removeRedundantParentheses(formula) {
  let stack = [];
  let toRemove = new Set();

  // Detect redundant parentheses
  for (let i = 0; i < formula.length; i++) {
    if (formula[i] === "(") stack.push(i);
    else if (formula[i] === ")") {
      const start = stack.pop();
      if (
        start !== undefined &&
        formula[start + 1] !== "(" &&
        formula[i - 1] !== ")"
      ) {
        toRemove.add(start);
        toRemove.add(i);
      }
    }
  }

  // Remove redundant parentheses
  let cleanedFormula = "";
  for (let i = 0; i < formula.length; i++) {
    if (!toRemove.has(i)) cleanedFormula += formula[i];
  }
  return cleanedFormula.trim();
}

/**
 * Main function to convert a single FRET formula into an MLTL formula.
 * @param {string} formula - The input FRET formula.
 * @returns {object} - An object containing the converted formula, conversion steps, and variable map.
 */
function convertFretToMltl(formula) {
  const conversionSteps = [];
  const variableMap = {};

  // Step 1: Validate input
  validateFormula(formula);
  conversionSteps.push({ step: "Validated input formula", formula });

  // Step 2: Remove ignored symbols
  formula = removeIgnoredSymbols(formula);
  conversionSteps.push({ step: "Removed ignored symbols", formula });

  // Step 3: Handle relational operators
  formula = handleRelationalOperators(formula);
  conversionSteps.push({ step: "Handled relational operators", formula });

  // Step 4: Map FRET symbols to MLTL
  formula = mapSymbols(formula, symbolMap);
  conversionSteps.push({ step: "Mapped FRET symbols", formula });

  // Step 5: Standardize variables
  formula = standardizeVariables(formula, variableMap);
  conversionSteps.push({ step: "Standardized variables", formula });

  // Step 6: Clean up spacing and remove redundant parentheses
  formula = cleanUpSpacing(formula);
  formula = removeRedundantParentheses(formula);
  conversionSteps.push({ step: "Cleaned and finalized formula", formula });

  return {
    convertedFormula: formula,
    conversionSteps,
    variableMap,
    ignoredSymbolsWithMeaning,
  };
}

/**
 * Main function to convert multiple FRET formulas.
 * @param {Array<string>} fretFormulas - Array of FRET formulas to convert.
 * @returns {Array<object>} - An array of objects with converted formulas and details.
 */
function main(fretFormulas) {
  return fretFormulas.map((formula) => convertFretToMltl(formula));
}

module.exports = { main, convertFretToMltl };
