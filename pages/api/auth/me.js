import { faker } from '@faker-js/faker';
import { join, replace } from 'lodash';
import { lowerCase } from 'lodash';

const me = async (req, res) => {
  const imgId = faker.random.numeric(9);
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const fullName = `${firstName} ${lastName}`;
  return res.json({
    data: {
      id: faker.datatype.uuid(),
      name: fullName,
      username: replace(lowerCase(faker.internet.userName(firstName, lastName)), /\s/g, '_'),
      discord: join(
        [
          replace(lowerCase(faker.internet.userName(firstName, lastName)), /\s/g, '_'),
          faker.random.numeric(4, { allowLeadingZeros: true }),
        ],
        '#'
      ),
      show_discord: true,
      email_notification: faker.datatype.boolean(),
      avatar: {
        medium: `https://i.pravatar.cc/312?u=${imgId}`,
        small: `https://i.pravatar.cc/80?u=${imgId}`,
        tiny: `https://i.pravatar.cc/8?u=${imgId}`,
      },
      wallet_address: faker.finance.bitcoinAddress(),
      stats: {
        nft_bought: faker.datatype.number({ max: 1523 }),
        nft_sold: faker.datatype.number({ max: 123 }),
        total_traded: faker.datatype.number({ min: 0.1, max: 0.7, precision: 0.001 }),
        total_profit: faker.datatype.number({ max: 0.01, precision: 0.001 }),
      },
    },
  });
};

export default me;
