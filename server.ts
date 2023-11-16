import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const record = await prisma.post.create({
      data: {
// data to create new record
      },
    });
    console.log('Record created', record);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
