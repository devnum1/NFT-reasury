import { styled } from '@mui/material/styles';
import { TextField, Box, Grid, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import initializeFirebaseClient from 'src/lib/initFirebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSnackbar } from 'notistack';

const RootStyle = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(5),
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

const questionScheme = yup
  .object()
  .shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Email is invalid').required('Email is required'),
    question: yup.string().required('Question is required'),
  })
  .required();

export default function QuestionForm() {
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
    resolver: yupResolver(questionScheme),
    defaultValues: {
      name: '',
      email: '',
      question: '',
    },
  });

  const submitHandler = async (values) => {
    const questionCollections = collection(db, 'questions');
    await addDoc(questionCollections, { ...values, createdAt: serverTimestamp() });
    enqueueSnackbar('Question has been submitted');
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <RootStyle>
        <Grid container rowSpacing={'20px'} columnSpacing={'30px'}>
          <Grid item xs={12} md={6}>
            <TextField
              {...register('name')}
              variant="filled"
              InputProps={{
                autoComplete: 'off',
                placeholder: 'Name',
              }}
              error={Boolean(errors?.name?.message)}
              helperText={errors?.name?.message}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              {...register('email')}
              variant="filled"
              InputProps={{
                autoComplete: 'off',
                type: 'email',
                placeholder: 'Email',
              }}
              error={Boolean(errors?.email?.message)}
              helperText={errors?.email?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register('question')}
              variant="filled"
              multiline
              minRows={10}
              InputProps={{
                autoComplete: 'off',
                placeholder: 'Question',
              }}
              error={Boolean(errors?.question?.message)}
              helperText={errors?.question?.message}
            />
          </Grid>
        </Grid>
        <Box display="flex" sx={{ mt: 3 }}>
          <Button type="submit" variant="gradient" className="SubmitButton">
            Send
          </Button>
        </Box>
      </RootStyle>
    </form>
  );
}
