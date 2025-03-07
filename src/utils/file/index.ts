import { existsSync, mkdirSync } from 'fs';

export function checkDirAndCreate(folderPath: string) {
  if (!existsSync(folderPath)) {
    try {
      mkdirSync(folderPath, { recursive: true });
      console.log('文件夹已成功创建:', folderPath);
    } catch (err) {
      console.error('创建文件夹失败:', err);
    }
  }
}
