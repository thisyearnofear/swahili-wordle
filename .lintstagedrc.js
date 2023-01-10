module.exports = {
  // Type check TypeScript files
  "**/*.(ts|tsx)": () => ["yarn tsc --noEmit"],

  // Lint & Prettify TS and JS files
  "**/*.(ts|tsx|js)": (filenames) => [
    `yarn eslint --fix ${filenames.join(" ")}`,
    `yarn prettier --write ${filenames.join(" ")}`,
  ],
  "*": (filenames) => [`yarn prettier -wu ${filenames.join(" ")}`],
};
