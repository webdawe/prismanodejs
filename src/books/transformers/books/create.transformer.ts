export class BookCreateTransformer {
    params: any
    constructor (params: any) {
        this.params = params
    }

    transform() {        
        return {
            title: this.params.title,
            type: this.params.type,
            authorId: this.params.authorId
        }       
    }
}