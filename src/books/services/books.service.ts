
import { CRUD } from '../../common/interfaces/crud.interface'
import { PrismaService} from '../../common/services/prisma.service'

class BooksService extends PrismaService {
  constructor() {
    super();
    this.model = this.db.book;
  }
}

export default new BooksService()
