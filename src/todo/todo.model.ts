export enum TodoStatusEnum {
  'actif' = 'En cours',
  'waiting' = 'En attente',
  'done' = 'Finalisé',
}
export class TodoModel {
  constructor(
    public id = '',
    public name = '',
    public description = '',
    public date = new Date(),
    public status = TodoStatusEnum.waiting,
  ) {}
}
