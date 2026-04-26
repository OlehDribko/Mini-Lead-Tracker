import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto, LeadStatusDto } from './dto/create-lead.dto';
import {
  GetLeadsQueryDto,
  LeadsSortFieldDto,
  SortOrderDto,
} from './dto/get-leads-query.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';

@Injectable()
export class LeadsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLeadDto: CreateLeadDto) {
    return this.prisma.lead.create({
      data: {
        ...createLeadDto,
        status: createLeadDto.status ?? LeadStatusDto.NEW,
      },
    });
  }

  async findAll(query: GetLeadsQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const sort = query.sort ?? LeadsSortFieldDto.CREATED_AT;
    const order = query.order ?? SortOrderDto.DESC;
    const where = this.buildLeadFilters(query);
    const skip = (page - 1) * limit;

    const [items, total] = await this.prisma.$transaction([
      this.prisma.lead.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sort]: order },
      }),
      this.prisma.lead.count({ where }),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: this.getTotalPages(total, limit),
    };
  }

  async findOne(id: string) {
    return this.findLeadOrThrow(id);
  }

  async update(id: string, updateLeadDto: UpdateLeadDto) {
    await this.findLeadOrThrow(id);

    if (Object.keys(updateLeadDto).length === 0) {
      return this.findLeadOrThrow(id);
    }

    return this.prisma.lead.update({
      where: { id },
      data: updateLeadDto,
    });
  }

  async remove(id: string) {
    await this.findLeadOrThrow(id);
    await this.prisma.lead.delete({
      where: { id },
    });

    return { success: true };
  }

  private async findLeadOrThrow(id: string) {
    const lead = await this.prisma.lead.findUnique({ where: { id } });
    if (!lead) {
      throw new NotFoundException('Lead not found');
    }

    return lead;
  }

  private buildLeadFilters(query: GetLeadsQueryDto): Prisma.LeadWhereInput {
    const where: Prisma.LeadWhereInput = {};

    if (query.status) {
      where.status = query.status;
    }

    if (query.q?.trim()) {
      const searchTerm = query.q.trim();
      where.OR = [
        { name: { contains: searchTerm, mode: 'insensitive' } },
        { email: { contains: searchTerm, mode: 'insensitive' } },
        { company: { contains: searchTerm, mode: 'insensitive' } },
      ];
    }

    return where;
  }

  private getTotalPages(total: number, limit: number) {
    return total === 0 ? 0 : Math.ceil(total / limit);
  }
}
