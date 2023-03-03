import * as ts from "typescript";

function compile_ts_to_js(
  source: string,
  options: ts.TranspileOptions | null = null
): string {
  // Default options -- you could also perform a merge, or use the project tsconfig.json
  if (null === options) {
    options = { compilerOptions: { module: ts.ModuleKind.CommonJS } };
  }
  return ts.transpileModule(source, options).outputText;
}

// // Make sure it works
// const source = "let foo: string  = 'bar'";

// let result = tsCompile(source);

// console.log(result); // var foo = 'bar';
