import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateLeadDto, LeadStatusDto } from './dto/create-lead.dto';
import {
  GetLeadsQueryDto,
  LeadsSortFieldDto,
  SortOrderDto,
} from './dto/get-leads-query.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { LeadsService } from './leads.service';

@ApiTags('Leads')
@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new lead' })
  @ApiBody({ type: CreateLeadDto })
  create(@Body() createLeadDto: CreateLeadDto) {
    return this.leadsService.create(createLeadDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get paginated leads list' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: LeadStatusDto,
    example: LeadStatusDto.NEW,
  })
  @ApiQuery({ name: 'q', required: false, type: String, example: 'acme' })
  @ApiQuery({
    name: 'sort',
    required: false,
    enum: LeadsSortFieldDto,
    example: LeadsSortFieldDto.CREATED_AT,
  })
  @ApiQuery({
    name: 'order',
    required: false,
    enum: SortOrderDto,
    example: SortOrderDto.DESC,
  })
  @ApiOkResponse({
    description: 'Paginated leads response',
    schema: {
      example: {
        items: [],
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
      },
    },
  })
  findAll(@Query() query: GetLeadsQueryDto) {
    return this.leadsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get lead by id' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiNotFoundResponse({ description: 'Lead not found' })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.leadsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update lead by id' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiBody({ type: UpdateLeadDto })
  @ApiNotFoundResponse({ description: 'Lead not found' })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateLeadDto: UpdateLeadDto,
  ) {
    return this.leadsService.update(id, updateLeadDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete lead by id' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiNotFoundResponse({ description: 'Lead not found' })
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.leadsService.remove(id);
  }
}
