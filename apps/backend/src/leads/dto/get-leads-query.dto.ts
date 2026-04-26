import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { LeadStatusDto } from './create-lead.dto';

export enum LeadsSortFieldDto {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export enum SortOrderDto {
  ASC = 'asc',
  DESC = 'desc',
}

export class GetLeadsQueryDto {
  @ApiPropertyOptional({ example: 1, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ example: 10, minimum: 1, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;

  @ApiPropertyOptional({ enum: LeadStatusDto, example: LeadStatusDto.NEW })
  @IsOptional()
  @IsEnum(LeadStatusDto)
  status?: LeadStatusDto;

  @ApiPropertyOptional({ example: 'acme' })
  @IsOptional()
  @IsString()
  q?: string;

  @ApiPropertyOptional({
    enum: LeadsSortFieldDto,
    example: LeadsSortFieldDto.CREATED_AT,
  })
  @IsOptional()
  @IsEnum(LeadsSortFieldDto)
  sort?: LeadsSortFieldDto;

  @ApiPropertyOptional({ enum: SortOrderDto, example: SortOrderDto.DESC })
  @IsOptional()
  @IsEnum(SortOrderDto)
  order?: SortOrderDto;
}
