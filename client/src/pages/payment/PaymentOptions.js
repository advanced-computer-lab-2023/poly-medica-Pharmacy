import { Radio, FormControlLabel, RadioGroup, FormLabel, FormControl, Container, ListItemAvatar, Avatar, Typography } from '@mui/material';
import { patientAxios } from 'utils/AxiosConfig.js';
import { useUserContext } from 'hooks/useUserContext';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import '../../assets/css/swalStyle.css';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaymentsIcon from '@mui/icons-material/Payments';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';


const PaymentOptions = ({ handleChange, value }) => {
    const [amountInWallet, setAmountInWallet] = useState(0);
    const { user } = useUserContext();
    const userId = user.id;
    useEffect(
        () => {
            patientAxios.get(`/patients/${userId}/wallet`).then((response) => {
                setAmountInWallet(response.data.walletAmount);
            }).
                catch(error => {
                    Swal.fire('error', error, 'error');
                });
        }, []);

    return (
        <FormControl>
            <FormLabel>Payment Option</FormLabel>
            <RadioGroup
                defaultValue='credit card'
                name='controlled-radio-buttons-group'
                value={value}
                onChange={handleChange}
                sx={{ my: 1 }}
            >
                <FormControlLabel
                    value='credit-card'
                    control={<Radio />}
                    label={
                        <Container style={{ display: 'flex', alignItems: 'center', margin: '8px 0' }}>
                            <ListItemAvatar>
                                <Avatar>
                                    <CreditCardIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <Typography variant="body1" style={{ fontSize: '16px', marginLeft: '2' }}>CREDIT CARD</Typography>
                        </Container>
                    }
                />
                <FormControlLabel
                    value='wallet'
                    control={<Radio />}
                    label={(
                        <Container style={{ display: 'flex', alignItems: 'center', margin: '8px 0' }}>
                            <ListItemAvatar>
                                <Avatar>
                                    <AccountBalanceWalletIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <Typography variant="body1" style={{ fontSize: '16px', marginLeft: '2' }}>{`POLY-WALLET $ ${amountInWallet}`}</Typography>
                        </Container>
                    )}
                />
                <FormControlLabel
                    value='cash'
                    control={<Radio />}
                    label={(
                        <Container style={{ display: 'flex', alignItems: 'center', margin: '8px 0' }}>
                            <ListItemAvatar>
                                <Avatar>
                                    <PaymentsIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <Typography variant="body1" style={{ fontSize: '16px', marginLeft: '2' }}>CASH ON DELEVIRY</Typography>
                        </Container>
                    )}
                />
            </RadioGroup>
        </FormControl>
    );
};

export default PaymentOptions;
