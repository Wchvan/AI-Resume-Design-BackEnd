import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileUploadDto } from './dto';
import { Response } from 'src/utils/api/types';
import { responseMessage } from 'src/utils/api';

@Controller('upload')
export class FileUploadController {
  /**
   * @description: 上传单个文件
   */
  @UseInterceptors(FileInterceptor('file'))
  @Post('single-file')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '单个文件上传',
    type: FileUploadDto,
  })
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ): Response<Express.Multer.File> {
    // 获取客户端域名端口
    let hostname = req.headers['x-forwarded-host'] || req.hostname;
    if (Array.isArray(hostname)) hostname = hostname.join(',');

    let port = req.headers['x-forwarded-port'] || req.socket.localPort;
    if (Array.isArray(port)) port = port.join(',');

    let protocol = req.headers['x-forwarded-proto'] || req.protocol;
    if (Array.isArray(protocol)) protocol = protocol.join(',');
    file.path = `${protocol}://${hostname}:${port}/static${file.path.replace(/\\/g, '/').replace(/upload/g, '')}`;
    return responseMessage(file);
  }
}
