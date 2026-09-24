import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IdentifyFigureDto } from './dto/identify-figure.dto';
import { AiService } from './ai.service';
import { AuthThrottleGuard } from '../auth/guards/auth-throttle.guard';

@ApiTags('AI Identification')
@ApiBearerAuth('access-token')
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}
  @Post('identify-figure')
  @UseGuards(AuthThrottleGuard)
  identifyFigure(@Body() dto: IdentifyFigureDto) { return this.aiService.identifyFigure(dto); }
}
