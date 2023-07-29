import { Box, Button, Stack, TextField, Typography, styled } from "@mui/material";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSnackbar } from 'notistack';
import initializeFirebaseClient from 'src/lib/initFirebase';

// ---------------------------------------------------------------------------------------

const RootStyle = styled(Box)(({ theme }) => ({
  '.MuiFormControl-root': {
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },

  '.MuiInputBase-root': {
    borderRadius: theme.spacing('15px'),
    backgroundColor: theme.palette.background.default,
    boxShadow: `inset -3px -3px 5px ${theme.palette.shadow.topLeft}, inset 2px 2px 5px ${theme.palette.shadow.bottomRight}`,
    '&.MuiInputBase-multiline': {
      paddingTop: 0,
    },

    'input:-internal-autofill-selected, input:-internal-autofill-selected:focus': {
      backgroundColor: `${theme.palette.background.default} !important`,
      boxShadow: `inset -3px -3px 5px ${theme.palette.shadow.topLeft}, inset 2px 2px 5px ${theme.palette.shadow.bottomRight}`,
      borderRadius: '10px',
    },
  },
  '.MuiInputBase-input': {
    padding: theme.spacing(2),
  },
  '.searchAdornment': {
    height: 21,
    width: 21,
    color: theme.palette.text.secondary,
  },

  '.SubmitButton': {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));

const validationSchema = yup.object().shape({
  walletAddress: yup.string().required('Wallet address is required.'),
  email: yup.string().email('Invalid email type.').required('Email is required.'),
});

// ---------------------------------------------------------------------------------------

export default function CrystalListForm() {
  const { db } = initializeFirebaseClient();
  const { enqueueSnackbar } = useSnackbar();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      walletAddress: '',
      email: '',
      phone: '',
    },
  });

  const submitHandler = async (values) => {
    const crystalListCollection = collection(db, 'crystalList');
    await addDoc(crystalListCollection, { ...values, createdAt: serverTimestamp() });
    enqueueSnackbar('You have been listed.');
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <RootStyle>
        <Stack spacing={4} p={4} alignItems="center">
          <Typography variant="title4025" component="h1">
            Crystal List
          </Typography>
          <TextField
            {...register('walletAddress')}
            variant="filled"
            InputProps={{
              autoComplete: 'off',
              placeholder: 'Enter Wallet Address',
            }}
            error={Boolean(errors?.walletAddress?.message)}
            helperText={errors?.walletAddress?.message}
          />
          <TextField
            {...register('email')}
            variant="filled"
            InputProps={{
              autoComplete: 'off',
              placeholder: 'Your email',
            }}
            error={Boolean(errors?.email?.message)}
            helperText={errors?.email?.message}
          />
          <TextField
            {...register('phone')}
            variant="filled"
            InputProps={{
              autoComplete: 'off',
              placeholder: 'Your phone number (optional)',
            }}
          />
          <Button type="submit" variant="gradient" className="SubmitButton">
            Register
          </Button>
        </Stack>
      </RootStyle>
    </form>

  );
}