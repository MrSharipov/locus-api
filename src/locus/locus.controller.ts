import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetLocusQueryDto } from './dto/get-locus-query.dto';
import { LocusService } from './locus.service';

@ApiTags('Locus')
@ApiBearerAuth()
@Controller('locus')
export class LocusController {
  constructor(private readonly locusService: LocusService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get locus list',
  })
  async getLocus(@Query() query: GetLocusQueryDto, @Req() req) {
    return this.locusService.getLocus(query, req.user);
  }
}
