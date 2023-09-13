import { useEffect, useMemo, useCallback, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, Card, Stack, Divider } from '@mui/material';
import Identicons from 'react-identicons';
import { useAddress } from '@thirdweb-dev/react';
import { sumBy } from 'lodash';

import Avatar from 'src/components/Avatar';
import Image from 'src/components/Image';
import { decimalPrecision, fNumber } from 'src/utils/formatNumber';
import EditProfileDialog from 'src/components/dialogs/EditProfileDialog';
import useFirebaseDocument from 'src/lib/useFirebaseUserDocument';
import { truncateMiddle } from 'src/utils/text';
import initializeFirebaseClient from 'src/lib/initFirebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import nftsApi from 'pages/api/nfts';
import history from 'page/api/history'

const RootStyle = styled('section')(({ theme }) => ({
  padding: theme.spacing('180px', 0, '100px'),
  position: 'relative',
  backgroundColor: theme.palette.background.default,
  background: 'url(/img/bg-hero.png) no-repeat',
  backgroundSize: '100% 550px',
  backgroundPosition: 'top',
  // backgroundAttachment: 'fixed',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  [theme.breakpoints.up('lg')]: {
    minHeight: 550,
  },

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing('120px', 0, '30px'),
  },

  '.DiscordButton': {
    height: 30,
    width: 30,
    padding: theme.spacing('5px'),
  },

  '.EditButton': {
    height: 50,
    padding: theme.spacing('13px'),
    [theme.breakpoints.down('md')]: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      gap: theme.spacing('10px'),
      alignItems: 'center',
    },
  },

  '.EditContent': {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row',
      flexGrow: 1,
      textAlign: 'center',
    },
  },

  '.StatGrid': {
    [theme.breakpoints.up('sm')]: {
      width: '24%',
    },
    paddingTop: 0,
    '&:first-of-type': {
      borderLeft: 0,
    },
  },
}));

const CardHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing('30px', 5),
  minHeight: '200px',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'row',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: theme.spacing('20px'),
    padding: theme.spacing('30px', '20px'),
  },
}));

const CardFooter = styled(Box)(({ theme }) => ({
  padding: theme.spacing('30px'),
  minHeight: '120px',
  backgroundColor: theme.palette.background.lighter,
  boxShadow: `0px -1px 0px #E0E0E9`,
  [theme.breakpoints.down('md')]: {
    minHeight: '90px',
    padding: theme.spacing('25px', '10px', '10px', '10px'),
  },
}));

const ProfileLeft = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing('20px'),
  alignItems: 'center',
}));

const avatarSize = 100;

const HeroProfile = () => {
  const [totalBuying, setTotalBuying] = useState(0);
  const [totalSelling, setTotalSelling] = useState(0);
  const [sellingTransactions, setSellingTransactions] = useState([]);
  const [buyingTransactions, setBuyingTransactions] = useState([]);
  const { db } = initializeFirebaseClient();
  const address = useAddress();
  const { document: user } = useFirebaseDocument();

  // const fetchToTransactions = useCallback(async () => {
  //   let data = await nftsApi({
  //     page: 1,
  //     limit: 100,
  //     sortBy: "MOST_RECENT",
  //     owner: address
  //   });
  //   let transactions = []
  //   data.records.forEach(async (item) => {
  //     let transaction = {
  //       price: parseFloat(item.buyFor) * 10 / 11
  //     }
  //     transactions.push(transaction)
  //   })
  //   setTotalBuying(data.records.length)
  //   setBuyingTransactions(transactions);
  // }, [address, db]);

  const fetchToTransactions = useCallback(async () => {
    let data = await history({
      address: address
    });

    let transactions = []
    
    data.bought.forEach(async (item) => {
      let transaction = {
        price: parseFloat(item.price)
      }
      transactions.push(transaction)
    })
    setTotalBuying(data.bought.length)
    setBuyingTransactions(transactions);
  }, [address, db]);
  
  // const fetchFromTransactions = useCallback(async () => {
  //   let transactions = [];
  //   const transactionCollection = collection(db, 'transactions');
  //   const transactionQuery = query(transactionCollection, where('from', '==', address), where('action', '==', 'sold'));
  //   const querySnapshot = await getDocs(transactionQuery);
  //   querySnapshot.forEach(async (snap) => {
  //     if (snap.exists()) {
  //       const data = snap.data();
  //       transactions.push(data);
  //     }
  //   });
  //   setSellingTransactions(transactions);
  //   setTotalSelling(transactions.length);
  // }, [address, db]);

  const fetchFromTransactions = useCallback(async () => {
    let data = await history({
      address: address
    });

    let transactions = []
    
    data.sold.forEach(async (item) => {
      let transaction = {
        price: parseFloat(item.price)
      }
      transactions.push(transaction)
    })
    setSellingTransactions(transactions);
    setTotalSelling(data.sold.length);
  }, [address, db]);

  useEffect(() => {
    if (address) {
      fetchFromTransactions();
      fetchToTransactions();
    }
  }, [address, fetchFromTransactions, fetchToTransactions]);

  const totalProfit = useMemo(() => {
    const totalSelling = sumBy(sellingTransactions.map((sell) => parseFloat(sell.price)));
    // const soldListingIds = sellingTransactions.map((st) => st?.listingId);
    // const filteredSold = buyingTransactions.filter((bt) => soldListingIds.includes(bt?.listingId));
    const totalBuying = sumBy(buyingTransactions.map((buy) => parseFloat(buy.price)));
    // const totalFilteredBuying = sumBy(filteredSold.map((buy) => parseFloat(buy.price)));
    // const profit = totalSelling - totalFilteredBuying;
    const profit = (totalSelling - totalBuying) * Math.pow(10, -18);
    return profit > 0 ? profit : 0;
  }, [sellingTransactions, buyingTransactions]);

  return (
    <RootStyle>
      <Container>
        <Card variant="default">
          <CardHeader>
            <ProfileLeft>
              <Avatar sx={{ width: avatarSize, height: avatarSize }}>
                {user?.avatar && (
                  <Image
                    src={user?.avatar}
                    alt={user?.username}
                    width={avatarSize}
                    ratio="1/1"
                    height={avatarSize}
                    sx={{ width: avatarSize, height: avatarSize }}
                  />
                )}
              </Avatar>
              <Box display="flex" flexDirection="column" gap={'10px'}>
                <Typography variant="title3020">@{user?.username || truncateMiddle(address, 10, '...', 5)}</Typography>
              </Box>
            </ProfileLeft>
            <EditProfileDialog isForcedOpen={Boolean(user?.id && !user?.username)} />
          </CardHeader>
          <CardFooter>
            <Stack
              spacing={0}
              direction="row"
              justifyContent="space-evenly"
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Box xs={4} className="StatGrid">
                <Box
                  display="flex"
                  flexDirection="column"
                  gap={'10px'}
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                >
                  <Typography variant="title2012">{fNumber(totalBuying || 0)}</Typography>
                  <Typography variant="text1412" color="text.tertiary">
                    NFTs Bought
                  </Typography>
                </Box>
              </Box>
              <Box xs={4} className="StatGrid">
                <Box
                  display="flex"
                  flexDirection="column"
                  gap={'10px'}
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                >
                  <Typography variant="title2012">{fNumber(totalSelling || 0)}</Typography>
                  <Typography variant="text1412" color="text.tertiary">
                    NFTs Sold
                  </Typography>
                </Box>
              </Box>
              <Box xs={4} className="StatGrid">
                <Box
                  display="flex"
                  flexDirection="column"
                  gap={'10px'}
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                >
                  <Typography variant="title2012">{decimalPrecision(totalProfit || 0, '0')} MATIC</Typography>
                  <Typography variant="text1412" color="text.tertiary">
                    Total Profit
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </CardFooter>
        </Card>
      </Container>
    </RootStyle>
  );
};

export default HeroProfile;
