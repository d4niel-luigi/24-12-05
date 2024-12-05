import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker';
import { connect } from 'http2';
const prisma = new PrismaClient()
async function main() {
  for (let i = 0; i < 50; i++) {
    await prisma.jatek.create({
      data: {
        megnevezes: faker.commerce.productName(),
        anyag: faker.commerce.productMaterial(),
        suly: faker.number.int({ min: 1, max: 10 }),
        gyerek: {},
      }
    })
  }
  for (let i = 0; i < 10; i++) {
    const gyerek = await prisma.gyerek.create({
      data: {
        nev: faker.person.firstName(),
        cim: faker.location.country() + faker.location.city() + faker.location.streetAddress(),
        jovolte: faker.datatype.boolean()
      },
    })
  }
}
main()
.catch(e => {
throw e
})
