import { ApiProperty } from '@nestjs/swagger';

export class LocationDto {
  @ApiProperty({ example: 32.0853 })
  latitude: number;

  @ApiProperty({ example: 34.7818 })
  longitude: number;
}

export class UpdateDto {
  @ApiProperty({ example: 1, description: 'Unique record ID' })
  id: number;

  @ApiProperty({ example: 'Record1', description: 'Alphanumeric name' })
  name: string;

  @ApiProperty({
    example: '2025-09-15T09:00:00Z',
    description: 'Record creation date',
  })
  create_date: Date;

  @ApiProperty({ type: LocationDto, description: 'Location in Israel' })
  location: LocationDto;

  @ApiProperty({ example: [101, 102], description: 'List of alerts' })
  alerts: number[];

  @ApiProperty({ example: 1, description: 'Record status (1-6)' })
  status: number;

  @ApiProperty({ example: 'Test record', description: 'Free text description' })
  description: string;
}
