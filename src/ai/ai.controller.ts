import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';
import { InputDto } from './dto/input.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post()
  getMessage(@Body() input: InputDto) {
    return this.aiService.getMessage(input);
  }
}
