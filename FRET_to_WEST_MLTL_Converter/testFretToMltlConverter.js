function testSingleFretToMltlConversion() {
  const { convertFretToMltl } = require("./FRET_to_WEST_MLTL_Converter");

  // Input formula for testing
  const testFormula =
    "((LAST V (((! apnea) & ((! LAST) & (X apnea))) -> (X (LAST | (X apneaAlarm))))) & (apnea -> (LAST | (X apneaAlarm))))";

  console.log("=== Single FRET to MLTL Conversion Test ===\n");

  console.log("Input Formula:");
  console.log(testFormula);

  // Perform the conversion
  const result = convertFretToMltl(testFormula);

  console.log("\nConverted Formula:");
  console.log(result.convertedFormula);

  console.log("\nConversion Steps:");
  result.conversionSteps.forEach((step, i) => {
    console.log(`  Step ${i + 1} (${step.step}): ${step.formula}`);
  });

  console.log("\nVariable Mapping:");
  console.log(result.variableMap);

  console.log("\nIgnored Symbols:");
  console.log(
    result.conversionSteps.find(
      (step) => step.step === "Removed ignored symbols"
    )?.formula
  );

  console.log("\nIgnored Symbol Details:");
  console.log(Object.keys(result.ignoredSymbolsWithMeaning));

  console.log("\nTest completed!");
}

// Execute the test
testSingleFretToMltlConversion();
