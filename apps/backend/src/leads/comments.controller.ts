import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiTags('Leads')
@Controller('leads/:id/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  @ApiOperation({ summary: 'Get comments for a lead' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiNotFoundResponse({ description: 'Lead not found' })
  @ApiOkResponse({
    description: 'Comments list for lead',
    schema: {
      example: [
        {
          id: '6ddc0808-cf22-4130-a705-9b0f8cb09047',
          leadId: 'f9c8aeb4-6a2f-4f25-9f8f-03a2ce3d3f98',
          text: 'Followed up with the client.',
          createdAt: '2026-04-24T12:00:00.000Z',
        },
      ],
    },
  })
  findByLeadId(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.commentsService.findByLeadId(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a comment for a lead' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiBody({ type: CreateCommentDto })
  @ApiNotFoundResponse({ description: 'Lead not found' })
  create(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.create(id, createCommentDto);
  }
}
