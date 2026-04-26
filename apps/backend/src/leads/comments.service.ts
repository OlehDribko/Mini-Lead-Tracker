import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findByLeadId(leadId: string) {
    await this.ensureLeadExists(leadId);

    return this.prisma.comment.findMany({
      where: { leadId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(leadId: string, createCommentDto: CreateCommentDto) {
    await this.ensureLeadExists(leadId);

    return this.prisma.comment.create({
      data: {
        leadId,
        text: createCommentDto.text,
      },
    });
  }

  private async ensureLeadExists(leadId: string) {
    const lead = await this.prisma.lead.findUnique({
      where: { id: leadId },
      select: { id: true },
    });

    if (!lead) {
      throw new NotFoundException('Lead not found');
    }
  }
}
