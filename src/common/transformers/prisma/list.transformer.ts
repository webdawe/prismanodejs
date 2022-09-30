export class PrismaListTransformer {
  options: any
  transformed: any
  constructor(options: any) {
    this.options ={
        limit: options.limit ?? process.env.limit,
        page: options.page ?? 1,
        include: options.include ?? undefined,
        where: options.where ?? undefined
      }
  }

  transform() {
    return {
      skip: parseInt(this.options.limit) * (this.options.page - 1),
      take: parseInt(this.options.limit),
      include: this.options.include || undefined,
      where: this.options.where || undefined
    }
  }
}
