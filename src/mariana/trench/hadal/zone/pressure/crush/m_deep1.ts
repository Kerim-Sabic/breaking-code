/* eslint-disable */
// Deeper than the deepest stack trace
${Array.from({length: 4200}, (_, i) => `const deep${i} = "m";`).join('\n')}
export const deep1 = "m";
