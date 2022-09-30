
import { CRUD } from '../../common/interfaces/crud.interface'
import { PrismaService} from '../../common/services/prisma.service'

class AuthorsService extends PrismaService {
  constructor() {
    super();
    this.model = this.db.author;
    this.extraOptions = {
      include: {
        books:true
      }
    }
  }  
}

export default new AuthorsService()
