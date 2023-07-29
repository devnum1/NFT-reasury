import { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Container,
  Grid,
  Typography,
  Accordion as MuiAccordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

import Iconify from 'src/components/Iconify';
import QuestionForm from './QuestionForm';

const RootStyle = styled('section')(({ theme }) => ({
  margin: theme.spacing('60px', 0, '100px', 0),
}));

const FaqCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing('100px', '75px'),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing('40px', '20px'),
  },

  h1: {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      fontSize: '25px',
    },
  },
}));

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  '&:first-of-type': {
    borderTop: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const faqs = [
  {
    id: 1,
    question: 'What is theNFtreasury?',
    answer:
      'theNFtreasury is a revolutionary DAO that brings profit to all who use it. We use the Polygon blockchain and revolutionary smart contracts to automatically increase the value of your crystal once you buy it by 10%, so you can then sell it right away for a profit.',
  },
  {
    id: 2,
    question: 'How do I use theNFtreasury?',
    answer:
      'Simply connect your crypto wallet to create an account with us. Find a crystal you like and buy it. Then check it out on your profile and sell it right away for a profit!',
  },
  {
    id: 3,
    question: 'What are the fees?',
    answer: 'You only pay a sales fee of 2.5% once you have sold your crystal. We use the Polygon network so we have almost no gas fees.',
  },
  {
    id: 4,
    question: 'Can I get any bonuses?',
    answer:
      'Of course! After buying just 5 crystals you can receive 100 USD in bonus crystals, with more bonuses to come. Just join our Discord to learn more and keep track of new crystal collection launches, along with many other benefits.',
  },
  {
    id: 5,
    question: 'How do I get a wallet?',
    answer:
      'You need to go the correct website or browser extension of our accepted wallets and make sure to follow instructions clearly. We accept Metamask, Coinbase, and WalletConnect wallets. The most common and trusted. You can deposit FIAT funds directly into your wallet using one of their payment methods.',
  },
];

export default function FaqSection() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <RootStyle>
      <Container>
        <FaqCard>
          <Grid container spacing={12}>
            <Grid item xs={12} sm={12} md={6}>
              <Typography variant="title4025" component="h1">
                Frequently Asked Questions
              </Typography>
              <Box sx={{ py: 4 }}>
                {faqs.map((faq) => (
                  <Accordion
                    expanded={expanded === faq?.id}
                    onChange={handleChange(faq?.id)}
                    key={faq?.id}
                    variant="no-shadow"
                  >
                    <AccordionSummary
                      expandIcon={<Iconify icon="nft:caret-down" sx={{ width: 18, height: 18 }} />}
                      aria-controls={`${faq?.id}-content`}
                      id={`${faq?.id}-header`}
                      sx={{ pt: 3, pb: 4 }}
                    >
                      <Typography variant="title2012">{faq?.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="text1412">{faq?.answer}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Typography variant="title4025" component="h1">
                Have Another Question?
              </Typography>
              <QuestionForm />
            </Grid>
          </Grid>
        </FaqCard>
      </Container>
    </RootStyle>
  );
}
