const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

// Extensões de arquivos a serem processados
const extensions = ['.js', '.jsx', '.ts', '.tsx'];

// Diretórios a serem ignorados
const ignoreDirs = ['node_modules', '.next', '.git', '.vscode'];

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

// Função para processar um arquivo
async function processFile(filePath) {
  try {
    const content = await readFileAsync(filePath, 'utf8');
    
    // Remover comentários e espaços em branco extras (minificação básica)
    let processedContent = content
      .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '') // Remove comentários
      .replace(/\s+/g, ' ') // Reduz múltiplos espaços para um único espaço
      .replace(/\s*{\s*/g, '{') // Remove espaços antes e depois de chaves
      .replace(/\s*}\s*/g, '}') // Remove espaços antes e depois de chaves
      .replace(/\s*;\s*/g, ';') // Remove espaços antes e depois de ponto e vírgula
      .replace(/\s*:\s*/g, ':') // Remove espaços antes e depois de dois pontos
      .replace(/\s*,\s*/g, ',') // Remove espaços antes e depois de vírgulas
      .trim();
    
    // Adicionar comentário com o caminho do arquivo original
    return `\n// File: ${filePath}\n${processedContent}`;
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
  
  let allCode = '// Concatenated JavaScript/TypeScript with preserved variable names\n';
  let processedCount = 0;
  
  for (const file of files) {
    process.stdout.write(`Processing file ${++processedCount}/${files.length}: ${file}...\r`);
    const processedCode = await processFile(file);
    allCode += processedCode;
  }
  
  const outputPath = path.join(rootDir, 'all-code-concatenated.js');
  await writeFileAsync(outputPath, allCode, 'utf8');
  
  console.log(`\nAll files processed. Concatenated code saved to ${outputPath}`);
  console.log(`Total size: ${(allCode.length / 1024).toFixed(2)} KB`);
}

main().catch(console.error);
