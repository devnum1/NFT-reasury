import API from './base';

const nftsApi = async ({ page, limit = 12, name, category, isListed, sortBy, likedBy, owner, isProfile }) =>
  API()
    .request({
      url: 'crystals',
      method: 'GET',
      params: {
        page,
        limit,
        name,
        category,
        isListed,
        sortBy,
        likedBy,
        owner,
        isProfile,
      },
    })
    .then((response) => response.data)
    .catch((error) => error);

export default nftsApi;

// export const data = nfts.map((source, index) => {
//   const price = random(0.001, 0.3);
//   const sellPrice = price + 0.05;
//   const imgId = faker.random.numeric(9);
//   const firstName = faker.name.firstName();
//   const lastName = faker.name.lastName();
//   return {
//     id: faker.datatype.uuid(),
//     num: index + 1,
//     name: source?.name,
//     description: source?.description,
//     category: source?.category,
//     image: source?.image,
//     price: price,
//     sell_price: sellPrice,
//     currency: 'ETH',
//     created_at: faker.datatype.datetime({
//       min: +new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
//       max: +new Date(),
//     }),
//     owner: {
//       username: replace(lowerCase(faker.internet.userName(firstName, lastName)), /\s/g, '_'),
//       avatar: {
//         medium: `https://i.pravatar.cc/312?u=${imgId}`,
//         small: `https://i.pravatar.cc/80?u=${imgId}`,
//         tiny: `https://i.pravatar.cc/8?u=${imgId}`,
//       },
//       wallet_address: faker.finance.bitcoinAddress(),
//     },
//   };
// });

// const orders = async (req, res) => {
//   const { page, order_by, dir, filter, search } = req.query;
//   const givenFilter = !includes(['all', 'popular'], filter) ? filter : null;
//   const givenSearch = search !== '' ? search : null;
//   const by = order_by || 'sell_price';
//   const direction = dir || 'desc';

//   const filtered = givenFilter ? data.filter((d) => d?.category === givenFilter) : data;
//   const searched = givenSearch
//     ? filtered.filter((f) => includes(lowerCase(f?.name), lowerCase(givenSearch)))
//     : filtered;
//   const ordered = orderBy(searched, [by], [direction]);
//   const chuncked = chunk(ordered, 12);

//   return res.json({
//     data: chuncked[Number(page) - 1],
//   });
// };

// export default orders;
