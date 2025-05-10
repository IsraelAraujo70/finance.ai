const fs = require('fs');
const path = require('path');
const { minify } = require('terser');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

// Extensões de arquivos a serem processados
const extensions = ['.js', '.jsx', '.ts', '.tsx'];

// Diretórios a serem ignorados
const ignoreDirs = ['node_modules', '.next', '.git', '.vscode'];

// Configurações do Terser para manter nomes de variáveis
const terserOptions = {
  compress: {
    dead_code: true,
    drop_console: false,
    drop_debugger: true,
    keep_classnames: true,
    keep_fargs: true,
    keep_infinity: true,
  },
  mangle: false, // Não alterar nomes de variáveis
  format: {
    comments: false,
    beautify: false,
  },
  keep_classnames: true,
  keep_fnames: true,
};

// Função para verificar se um arquivo deve ser processado
const shouldProcessFile = (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  return extensions.includes(ext);
};

// Função para verificar se um diretório deve ser ignorado
const shouldIgnoreDir = (dirPath) => {
  const dirName = path.basename(dirPath);
  return ignoreDirs.includes(dirName);
};

// Função para encontrar todos os arquivos recursivamente
async function findAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!shouldIgnoreDir(filePath)) {
        await findAllFiles(filePath, fileList);
      }
    } else if (shouldProcessFile(filePath)) {
      fileList.push(filePath);
    }
  }

  return fileList;
}

// Função para minificar um arquivo
async function minifyFile(filePath) {
  try {
    const content = await readFileAsync(filePath, 'utf8');
    
    // Para arquivos TypeScript, vamos apenas incluir o conteúdo sem tentar compilar
    // Isso é apenas para fins de contexto de IA, não para execução
    const result = await minify(content, terserOptions);
    
    // Adicionar comentário com o caminho do arquivo original
    return `\n// File: ${filePath}\n${result.code}`;
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error.message);
    return `\n// Error processing file: ${filePath}\n// ${error.message}`;
  }
}

// Função principal
async function main() {
  const rootDir = process.cwd();
  console.log(`Searching for files in ${rootDir}...`);
  
  const files = await findAllFiles(rootDir);
  console.log(`Found ${files.length} files to process.`);
  
  let allMinifiedCode = '// Minified JavaScript/TypeScript with preserved variable names\n';
  let processedCount = 0;
  
  for (const file of files) {
    process.stdout.write(`Processing file ${++processedCount}/${files.length}: ${file}...\r`);
    const minifiedCode = await minifyFile(file);
    allMinifiedCode += minifiedCode;
  }
  
  const outputPath = path.join(rootDir, 'all-minified-code.js');
  await writeFileAsync(outputPath, allMinifiedCode, 'utf8');
  
  console.log(`\nAll files processed. Minified code saved to ${outputPath}`);
  console.log(`Total size: ${(allMinifiedCode.length / 1024).toFixed(2)} KB`);
}

main().catch(console.error);
