import { db } from "../src/common/db.client"
import { faker } from '@faker-js/faker';

type Author = {
    name: string,
};

type Book = {
    title: string,
    type: string
}

const booksCount = 10;
const authorsCount = 10;

async function seed() {

    Array.from({ length: authorsCount }).forEach(async () => {
        const author = await db.author.create({
            data: {
                name: faker.name.firstName('male')
            }
        })

        Array.from({ length: booksCount }).forEach(async () => {
            await db.book.create({
                data: {
                    title: faker.word.noun(),
                    type: 'classic',
                    authorId: author.id
                }
            })
        });
    });
}

seed();

