/* eslint-disable react/prop-types */
import { useState, forwardRef, Fragment, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import Identicons from 'react-identicons';
import { getAuth, updateProfile } from 'firebase/auth';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  IconButton,
  Typography,
  Zoom,
  Grid,
  TextField,
  FormGroup,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';

// components
import Iconify from 'src/components/Iconify';
import Avatar from 'src/components/Avatar';
import Image from 'src/components/Image';
import { isEmpty } from 'lodash';
import useFirebaseDocument from 'src/lib/useFirebaseUserDocument';
import useFirebaseUser from 'src/lib/useFirebaseUser';
import initializeFirebaseClient from 'src/lib/initFirebase';
import { firebaseStorageUpload } from 'src/lib/firebaseStorage';

// ----------------------------------------------------------------------

const ContentStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(0, 3),

  '.MuiFormControl-root': {
    width: '100%',
  },

  '.MuiInputBase-root': {
    borderRadius: theme.spacing('15px'),
    backgroundColor: theme.palette.background.default,
    boxShadow: `inset -3px -3px 5px ${theme.palette.shadow.topLeft}, inset 2px 2px 5px ${theme.palette.shadow.bottomRight}`,
    '&:before, &:after': {
      border: 'none',
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

  '.MuiCheckbox-root': {
    width: 20,
    height: 20,
    borderRadius: '5px',
    boxShadow: `inset -3px -3px 5px ${theme.palette.shadow.topLeft}, inset 2px 2px 5px ${theme.palette.shadow.bottomRight}`,
    color: 'transparent',
    margin: theme.spacing('10px'),

    '&.Mui-checked': {
      color: theme.palette.primary.main,
    },
  },
}));

const FormContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing('20px'),

  '.LabelWrapper': {
    height: '55px',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
    },
  },
}));

const AvatarBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing('20px', 0),
  gap: '10px',
}));

const Hairline = styled(Box)(({ theme }) => ({
  height: '2px',
  position: 'absolute',
  boxShadow: '0px 1px 2px #E0E0E9',
  width: '100%',
  top: '150px',
  left: 0,
  [theme.breakpoints.down('sm')]: {
    top: '135px',
  },
}));

const Transition = forwardRef((props, ref) => <Zoom ref={ref} {...props} />);

const avatarSize = 100;

const profileScheme = yup
  .object()
  .shape({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Email is invalid').required('Email is required'),
    email_notification: yup.boolean().nullable(),
  })
  .required();

export default function EditProfileDialog({ onSubmitCallback = () => {}, isForcedOpen }) {
  // get firebase user
  const { user } = useFirebaseUser();
  // get firebase auth
  const auth = getAuth();
  // get user's document from firebase
  const { document } = useFirebaseDocument();
  // initiate firebase db for edit
  const { db, storage } = initializeFirebaseClient();
  // deconstruct data from document
  const { id: wallet_address, username, email, email_notification, avatar } = document || {};

  const {
    handleSubmit,
    setValue,
    watch,
    register,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(profileScheme),
    defaultValues: useMemo(() => ({
      username,
      email_notification: email_notification || false,
      wallet_address,
      email,
      avatar: avatar || '',
    })),
  });

  useEffect(() => {
    if (!isEmpty(document)) {
      const { username, email, email_notification } = document || {};
      reset({
        username,
        email_notification: email_notification || false,
        wallet_address,
        email,
        avatar: avatar || '',
      });
    }
  }, [document]);

  const isMobile = useResponsive('down', 'sm');
  const [open, setOpen] = useState(isForcedOpen);
  const [tempAvatar, setTempAvatar] = useState(null);
  const [isUploading, setUploading] = useState(false);

  useEffect(() => {
    if (isForcedOpen) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isForcedOpen]);

  /**
   * Submit Edit Profile
   * @param {*} values
   */
  const onSubmit = async (values) => {
    const usersRef = doc(db, 'users', user?.uid);
    const currentDocument = await getDoc(usersRef);
    if (currentDocument.exists()) {
      await setDoc(usersRef, { ...values }, { merge: true });
    }
    updateProfile(user, {
      displayName: values?.username,
      email: values?.email,
      ...(values?.avatar && { photoURL: values?.avatar }),
    });

    onSubmitCallback(values);
    setOpen(false);
  };
  const userValues = watch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (isForcedOpen) return;
    setOpen(false);
  };

  const convertBase64 = (file) =>
    new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

  const handleUpload = async (file) => {
    try {
      const uploadResponse = await firebaseStorageUpload(file, user, setUploading);
      setValue('avatar', uploadResponse?.url);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangeAvatar = async (e) => {
    const file = e?.target?.files[0];
    const base64 = await convertBase64(file);
    setTempAvatar(base64);
    handleUpload(file);
  };

  return (
    <Fragment>
      <Button variant="default" type="button" className="EditButton" onClick={handleClickOpen} disabled={isEmpty(user)}>
        <Iconify icon="mingcute:pencil-fill" sx={{ width: 24, height: 24 }} />
        <Typography variant="text1412" className="EditContent">
          Edit Profile
        </Typography>
      </Button>
      <Dialog
        TransitionComponent={Transition}
        open={open}
        maxWidth={'md'}
        onClose={handleClose}
        fullWidth={true}
        BackdropProps={{ className: 'blurred-backdrop' }}
        PaperProps={{ style: { borderRadius: '40px', boxShadow: 'none' }, className: 'edit-dialog' }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Hairline />
          <DialogTitle>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ position: 'relative' }}
            >
              <Box display="flex" flexGrow={1} flexDirection="row" justifyContent="center">
                <Typography variant="title20" textAlign="center">
                  {isForcedOpen ? 'Create' : 'Edit'} Profile
                </Typography>
              </Box>
              {!isForcedOpen && (
                <IconButton
                  type="button"
                  onClick={handleClose}
                  aria-label="close"
                  sx={{ position: 'absolute', top: '-10px', right: '-10px' }}
                >
                  <Iconify icon="prime:times" sx={{ width: 30, height: 30 }} />
                </IconButton>
              )}
            </Box>
          </DialogTitle>
          <ContentStyle>
            <AvatarBox>
              <Avatar sx={{ width: avatarSize, height: avatarSize }}>
                {(tempAvatar || avatar) && (
                  <Image
                    src={tempAvatar || avatar}
                    alt={username || '--'}
                    width={avatarSize}
                    ratio="1/1"
                    height={avatarSize}
                    sx={{ width: avatarSize, height: avatarSize }}
                  />
                )}
              </Avatar>
              <Button component="label">
                Change Profile Picture
                <input hidden accept="image/*" type="file" onChange={handleChangeAvatar} />
              </Button>
            </AvatarBox>
            <FormContent>
              <Grid container spacing={'10px'}>
                <Grid item xs={12} md={5} lg={3} className="LabelWrapper">
                  <label htmlFor="username">
                    <Typography variant="text1412" fontWeight={600}>
                      Username
                    </Typography>
                  </label>
                </Grid>
                <Grid item xs={12} md={7} lg={9}>
                  <TextField
                    variant="filled"
                    InputProps={{
                      autoComplete: 'off',
                      placeholder: 'Username',
                    }}
                    error={Boolean(errors?.username?.message)}
                    helperText={errors?.username?.message}
                    {...register('username')}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={'10px'}>
                <Grid item xs={12} md={5} lg={3} className="LabelWrapper">
                  <label htmlFor="wallet_address">
                    <Typography variant="text1412" fontWeight={600}>
                      Wallet Address
                    </Typography>
                  </label>
                </Grid>
                <Grid item xs={12} md={7} lg={9}>
                  <TextField
                    variant="filled"
                    InputProps={{
                      autoComplete: 'off',
                      placeholder: 'Wallet Address',
                      disabled: true,
                    }}
                    {...register('wallet_address')}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={'10px'}>
                <Grid item xs={12} md={5} lg={3} className="LabelWrapper">
                  <label htmlFor="email">
                    <Typography variant="text1412" fontWeight={600}>
                      Email Address
                    </Typography>
                  </label>
                </Grid>
                <Grid item xs={12} md={7} lg={9}>
                  <TextField
                    variant="filled"
                    type="email"
                    InputProps={{
                      autoComplete: 'off',
                      placeholder: 'email@example.com',
                    }}
                    error={Boolean(errors?.email?.message)}
                    helperText={errors?.email?.message}
                    {...register('email')}
                  />
                  {/* <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Boolean(userValues?.email_notification)}
                          onChange={() => setValue('email_notification', Boolean(!userValues?.email_notification))}
                        />
                      }
                      label="Email Notifications"
                    />
                  </FormGroup> */}
                </Grid>
              </Grid>
            </FormContent>
          </ContentStyle>
          <DialogActions sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: '20px' }}>
            <Button variant="gradient" type="submit" sx={{ width: '100%', fontWeight: 600 }}>
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  );
}
