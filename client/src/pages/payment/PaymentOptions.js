import React, { useState } from 'react';
import { Radio, FormControlLabel  , RadioGroup, FormLabel, FormControl } from '@mui/material';
import { patientAxios } from 'utils/AxiosConfig.js';

const PaymentOptions = ({ handleChange, value }) => {
    const [amountInWallet, setAmountInWallet] = useState(0);
    patientAxios.get('/wallet').then((response) => {
        setAmountInWallet(response.data.amountInWallet);
    });


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
                <FormControlLabel  value='credit-card' control={<Radio />} label='Credit Card' />
                <FormControlLabel  value='wallet' control={<Radio />} label={`My Wallet  ${amountInWallet}`} />
                <FormControlLabel  value='cash' control={<Radio />} label='Cash on deleviry' />
            </RadioGroup>
        </FormControl>
    );
};

export default PaymentOptions;
