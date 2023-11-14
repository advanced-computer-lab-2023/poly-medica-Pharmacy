import { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    TextField,
    Unstable_Grid2 as Grid,
} from '@mui/material';
import { useUserContext } from 'hooks/useUserContext';
import format from 'date-fns/format';
import { patientAxios } from 'utils/AxiosConfig';

export const PatientAccountProfileDetails = () => {
    const [values, setValues] = useState({
        name: '',
        userName: '',
        dateOfBirth: '',
        email: '',
        mobileNumber: '',
        gender: '',
        emergencyName: '',
        emergencyMobile: '',
        emergencyRelation: ''
    });
    const { user } = useUserContext();
    useEffect(() => {

        const getPatientsURL = `/patients/${user.id}`;
        
        patientAxios
            .get(getPatientsURL)
            .then((response) => {
                const patientData = response.data.patient;
                setValues({
                    name: patientData.name,
                    userName: patientData.userName,
                    dateOfBirth: format(new Date(patientData.dateOfBirth), 'yyyy-MM-dd'),
                    email: patientData.email,
                    mobileNumber: patientData.mobileNumber,
                    gender: patientData.gender.toLowerCase(),
                    emergencyName: patientData.emergencyContact.name,
                    emergencyMobile: patientData.emergencyContact.mobile,
                    emergencyRelation: patientData.emergencyContact.relation,
                });
            })
            .catch((err) => {
                console.log(err);
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
                                    label='mobile number'
                                    name='mobileNumber'
                                    required
                                    disabled
                                    value={values.mobileNumber}
                                />
                            </Grid>

                            <Grid xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label='gender'
                                    name='gender'
                                    required
                                    disabled
                                    value={values.gender}
                                />
                            </Grid>
                                                        
                        </Grid>
                        <Divider sx={{ mt:5 }}/>
                        <CardHeader
                    title='Emergency contact'
                />
                <Grid container spacing={3}>
                <Grid xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label='name'
                                    name='emergencyName'
                                    required
                                    disabled
                                    value={values.emergencyName}
                                />
                            </Grid>

                            <Grid xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label='mobile'
                                    name='emergencyMobile'
                                    required
                                    disabled
                                    value={values.emergencyMobile}
                                />
                            </Grid>

                            <Grid xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label='relation'
                                    name='emergencyRelation'
                                    required
                                    disabled
                                    value={values.emergencyRelation}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>
        </form>
    );
};

export default PatientAccountProfileDetails;