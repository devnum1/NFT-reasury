import { Card, Container, styled } from "@mui/material";
import CrystalListForm from "./CrystalListForm";

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

export default function CrystalListSection() {
  return (
    <RootStyle>
      <Container>
        <Card>
          <CrystalListForm />
        </Card>
      </Container>
    </RootStyle>
  );
}