import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mysql: {schema: 'testsearch', table: 'menu'}}})
export class Menu extends Entity {
  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    id: 1,
    mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  id: number;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    mysql: {columnName: 'menu_item_category_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y'},
  })
  menuItemCategoryId?: number;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    mysql: {columnName: 'restaurants_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y'},
  })
  restaurantsId?: number;

  @property({
    type: 'string',
    required: true,
    length: 200,
    mysql: {columnName: 'item_name', dataType: 'varchar', dataLength: 200, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  itemName: string;

  @property({
    type: 'string',
    required: true,
    length: 800,
    mysql: {columnName: 'item_description', dataType: 'varchar', dataLength: 800, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  itemDescription: string;

  @property({
    type: 'number',
    required: true,
    precision: 5,
    scale: 2,
    mysql: {columnName: 'item_cost', dataType: 'decimal', dataLength: null, dataPrecision: 5, dataScale: 2, nullable: 'N'},
  })
  itemCost: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 2,
    mysql: {columnName: 'item_calories', dataType: 'decimal', dataLength: null, dataPrecision: 10, dataScale: 2, nullable: 'N'},
  })
  itemCalories: number;

  @property({
    type: 'string',
    required: true,
    length: 200,
    mysql: {columnName: 'image', dataType: 'varchar', dataLength: 200, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  image: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Menu>) {
    super(data);
  }
}

export interface MenuRelations {
  // describe navigational properties here
}

export type MenuWithRelations = Menu & MenuRelations;
