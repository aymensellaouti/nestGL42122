import { SelectQueryBuilder } from 'typeorm';

export const filterByDate = <Entity>(
  qb: SelectQueryBuilder<Entity>,
  propertyName: string,
  dateMin?: Date,
  dateMax?: Date,
) => {
  if (dateMin) {
    qb.andWhere(`${propertyName} > :dateMin`, { dateMin });
  }
  if (dateMax) {
    qb.andWhere(`${propertyName} < :dateMax`, { dateMax });
  }
};
