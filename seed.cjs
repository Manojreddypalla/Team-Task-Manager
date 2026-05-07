const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
const hash = bcrypt.hashSync('password', 10);

await prisma.user.create({
data: {
name: 'Admin',
email: 'admin@test.com',
password: hash,
role: 'ADMIN'
}
});

console.log('Admin created successfully');
}

main()
.catch((e) => {
console.error(e);
})
.finally(async () => {
await prisma.$disconnect();
});