import { lowerCase } from 'lodash';
import { countBy } from 'lodash';

export const getCountsPerCategory = (nfts) => countBy(nfts.detail, 'category');

export const getFilteredNFTsByCategory = (nfts, category) => {
  if (category === 'all') return nfts;
  if (category === 'popular') return nfts.filter((nft) => nft?.likes > 0);
  return nfts.filter((nft) => lowerCase(nft?.category) === lowerCase(category));
};
