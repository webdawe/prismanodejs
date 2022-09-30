export interface CRUD {
  list: (limit: number, page: number) => Promise<any>
  create: (resource: any) => Promise<any>
  update: (id: number, resource: any) => Promise<any>
  show: (id: number) => Promise<any>
  destroy: (id: number) => Promise<any>
}
