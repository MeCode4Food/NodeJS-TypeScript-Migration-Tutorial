# Migration to TypeScript

## Set up
1. Navigate to repo directory
2. Run `tsc --init` to generate a `tsconfig.json`
3. Change tsconfig.json
  - Disable strict mode
  - Enable outputs, change output directory
  - Enable js type checking
  - (if using react) preseve jsx
4. Migrate inputs to ./src
5. Configure outputs for tsc
6. Put `tsc` compile step inside CI process

## Conversion to TypeScript
1. Rename your files to .ts one by one
2. Install types from @types
3. Change import/exports to ES6
4. Fix linting issues raised by VSCode

## Conversion guidelines/hierarchy 
1. Start with the helper files first
2. Convert files without dependencies first before moving to larger files