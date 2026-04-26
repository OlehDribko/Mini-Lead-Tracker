import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export enum LeadStatusDto {
  NEW = 'NEW',
  CONTACTED = 'CONTACTED',
  IN_PROGRESS = 'IN_PROGRESS',
  WON = 'WON',
  LOST = 'LOST',
}

export class CreateLeadDto {
  @ApiProperty({ example: 'John Doe' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'john@company.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: 'Acme Inc.' })
  @IsOptional()
  @IsString()
  company?: string;

  @ApiPropertyOptional({ enum: LeadStatusDto, example: LeadStatusDto.NEW })
  @IsOptional()
  @IsEnum(LeadStatusDto)
  status?: LeadStatusDto;

  @ApiPropertyOptional({ example: 2500 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  value?: number;

  @ApiPropertyOptional({ example: 'Interested in enterprise plan.' })
  @IsOptional()
  @IsString()
  notes?: string;
}
