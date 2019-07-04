const day = new Date();

const properties = [
    {
        id: 1,
        owner: 5,
        status: 'sold',
        state: 'Enugu',
        type: '2 bedroom flat',
        city: 'Nsukka',
        address: 'No 1 prisons road',
        price: 15000,
        created_on: day.toLocaleString(),
        image_url: 'http://cloudinary.com',
    },
];
module.exports = properties;
