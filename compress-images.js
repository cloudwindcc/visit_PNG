const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 图片压缩配置
const config = {
  quality: 80,
  maxWidth: 1920,
  maxHeight: 1080,
  outputDir: './public/images/compressed',
  formats: ['webp', 'jpg']
};

// 确保输出目录存在
if (!fs.existsSync(config.outputDir)) {
  fs.mkdirSync(config.outputDir, { recursive: true });
}

// 源图片目录
const sourceDir = './public/images';

// 压缩函数
async function compressImage(inputPath, outputPath, format, options = {}) {
  try {
    let transformer = sharp(inputPath);
    
    // 调整大小
    transformer = transformer.resize(config.maxWidth, config.maxHeight, {
      fit: 'inside',
      withoutEnlargement: true
    });
    
    // 根据格式处理
    switch (format) {
      case 'webp':
        transformer = transformer.webp({ 
          quality: config.quality,
          effort: 6,
          ...options 
        });
        break;
      case 'jpg':
      case 'jpeg':
        transformer = transformer.jpeg({ 
          quality: config.quality,
          progressive: true,
          ...options 
        });
        break;
    }
    
    await transformer.toFile(outputPath);
    console.log(`✅ 压缩完成: ${outputPath}`);
    
    // 获取文件大小信息
    const stats = fs.statSync(outputPath);
    const sizeInKB = (stats.size / 1024).toFixed(2);
    console.log(`📊 文件大小: ${sizeInKB} KB`);
    
  } catch (error) {
    console.error(`❌ 压缩失败: ${inputPath}`, error.message);
  }
}

// 处理单个文件
async function processImage(filePath) {
  const fileName = path.basename(filePath, path.extname(filePath));
  
  for (const format of config.formats) {
    const outputPath = path.join(config.outputDir, `${fileName}.${format}`);
    await compressImage(filePath, outputPath, format);
  }
}

// 扫描并处理所有图片
async function processAllImages() {
  console.log('🚀 开始图片压缩优化...\n');
  
  try {
    const files = fs.readdirSync(sourceDir);
    const imageFiles = files.filter(file => 
      ['.jpg', '.jpeg', '.png', '.tiff', '.tif'].includes(
        path.extname(file).toLowerCase()
      )
    );
    
    console.log(`📁 发现 ${imageFiles.length} 张图片需要压缩\n`);
    
    for (const file of imageFiles) {
      const filePath = path.join(sourceDir, file);
      await processImage(filePath);
    }
    
    console.log('\n🎉 所有图片压缩完成！');
    console.log('📂 压缩后的图片保存在:', config.outputDir);
    
  } catch (error) {
    console.error('❌ 处理过程中出现错误:', error.message);
  }
}

// 生成不同尺寸的响应式图片
async function generateResponsiveImages(inputPath, baseName) {
  const sizes = [320, 640, 768, 1024, 1440, 1920];
  
  for (const size of sizes) {
    for (const format of config.formats) {
      const outputPath = path.join(
        config.outputDir, 
        `${baseName}-${size}w.${format}`
      );
      
      try {
        await sharp(inputPath)
          .resize(size, null, { 
            fit: 'inside',
            withoutEnlargement: true 
          })
          .toFormat(format, { quality: config.quality })
          .toFile(outputPath);
          
        console.log(`🖼️  生成响应式图片: ${outputPath}`);
      } catch (error) {
        console.error(`❌ 生成失败: ${outputPath}`, error.message);
      }
    }
  }
}

// 命令行参数处理
const args = process.argv.slice(2);

if (args.includes('--responsive')) {
  // 生成响应式图片
  (async () => {
    const files = fs.readdirSync(sourceDir);
    const imageFiles = files.filter(file => 
      ['.jpg', '.jpeg', '.png', '.tiff', '.tif'].includes(
        path.extname(file).toLowerCase()
      )
    );
    
    for (const file of imageFiles) {
      const filePath = path.join(sourceDir, file);
      const baseName = path.basename(file, path.extname(file));
      await generateResponsiveImages(filePath, baseName);
    }
  })();
} else {
  // 标准压缩
  processAllImages();
}