import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileUploadModule } from './file-upload/file-upload.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DATABASE_URL } from './config';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    FileUploadModule,
    UserModule,
    MongooseModule.forRoot(DATABASE_URL),
    AuthModule,
  ],
})
export class AppModule {}
