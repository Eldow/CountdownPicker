export interface Group {
  _id: string;
  name: string;
  people: Array<string>;
  owner: any;
  createdAt: Date;
}
