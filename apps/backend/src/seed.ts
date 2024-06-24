import { makeUser } from './auth/controller';
import prisma from './repositories/prisma_client';
import {
  cateogiries,
  filmParticipants,
  films,
  participants,
  seats,
  users,
} from './seed_data';

export async function seed() {
  await makeUser({
    email: 'admin2@email.com',
    name: 'admin',
    isAdmin: true,
    password: 'adminek',
  });
  users.forEach(async (user) => await makeUser(user));
  await prisma.$transaction(async (tx) => {
    await tx.category.createMany({
      data: cateogiries,
      skipDuplicates: true,
    });
    await tx.seat.createMany({
      data: seats,
      skipDuplicates: true,
    });
    await tx.film.createMany({
      data: films,
      skipDuplicates: true,
    });
    await tx.participant.createMany({
      data: participants,
      skipDuplicates: true,
    });
    // await tx.review.createMany({
    //   data: reviews,
    //   skipDuplicates: true,
    // });
    await tx.filmParticipant.createMany({
      data: filmParticipants,
      skipDuplicates: true,
    });
    console.log('done');
  });
}
seed();
