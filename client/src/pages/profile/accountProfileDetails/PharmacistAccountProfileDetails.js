import { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    TextField,
    Unstable_Grid2 as Grid,
} from '@mui/material';
import { useUserContext } from 'hooks/useUserContext';
import format from 'date-fns/format';
import { pharmacyAxios } from 'utils/AxiosConfig';

export const PharmacistAccountProfileDetails = () => {
    const [values, setValues] = useState({
        name: '',
        userName: '',
        dateOfBirth: '',
        email: '',
        hourlyRate: '',
        affiliation: '',
        educationalBackground: '',
    });
    const { user } = useUserContext();
    useEffect(() => {
        const getUsersURL = '/pharmacists/' + user.id;
        pharmacyAxios
            .get(getUsersURL)
            .then((response) => {
                const values = response.data.doctor;
                setValues({
                    name: values.userData.name,
                    userName: values.userData.userName,
                    dateOfBirth: format(new Date(values.userData.dateOfBirth), 'yyyy-MM-dd'),
                    email: values.userData.email,
                    hourlyRate: values.hourlyRate,
                    affiliation: values.affiliation,
                    educationalBackground: values.educationalBackground,
                });
            })
            .catch((err) => {
                console.log('here', err);
            });
    }, []);


    return (
        <form autoComplete='off' >
            <Card>
                <CardHeader
                    subheader='The information can be edited'
                    title='Profile'
                />
                <CardContent sx={{ pt: 0 }}>
                    <Box sx={{ m: -1.5 }}>
                        <Grid container spacing={3}>
                            <Grid xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label='name'
                                    name='name'
                                    required
                                    disabled
                                    value={values.name}
                                />
                            </Grid>
                            <Grid xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label='username'
                                    name='userName'
                                    required
                                    disabled
                                    value={values.userName}
                                />
                            </Grid>
                            <Grid xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label='dateOfBirth'
                                    name='dateOfBirth'
                                    required
                                    disabled
                                    value={values.dateOfBirth}
                                />
                            </Grid>
                            <Grid xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label='email'
                                    name='email'
                                    required
                                    disabled
                                    type='email'
                                    value={values.email}
                                />
                            </Grid>
                            <Grid xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label='hourlyRate'
                                    name='hourlyRate'
                                    type='number'
                                    inputProps={{
                                        min:0
                                    }}
                                    disabled
                                    required
                                    value={values.hourlyRate}
                                />
                            </Grid>
                            <Grid xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label='affiliation'
                                    name='affiliation'
                                    disabled
                                    required
                                    value={values.affiliation}
                                />
                            </Grid>
                            <Grid
                                xs={12}
                                // md={6}
                            >
                                <TextField
                                    fullWidth
                                    label='educationalBackground'
                                    name='educationalBackground'
                                    disabled
                                    required
                                    value={values.educationalBackground}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>
        </form>
    );
};

export default PharmacistAccountProfileDetails;