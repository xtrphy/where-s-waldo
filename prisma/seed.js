const prisma = require('./client');

async function main() {
    const image = await prisma.image.create({
        data: {
            id: 1,
            url: 'https://i.pinimg.com/1200x/41/8c/ee/418ceef250922368052c4d1bba17453c.jpg',
        },
    });

    await prisma.character.createMany({
        data: [
            {
                id: 1,
                name: 'Waldo',
                xStart: 1146,
                yStart: 34,
                xEnd: 1159,
                yEnd: 69,
                imageId: image.id,
            },
            {
                id: 2,
                name: 'Odlaw',
                xStart: 1096,
                yStart: 429,
                xEnd: 1110,
                yEnd: 468,
                imageId: image.id,
            },
        ],
        skipDuplicates: true,
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });