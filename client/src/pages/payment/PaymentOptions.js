import React, { useEffect, useState } from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';



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
                onChange={handleChange }
                sx={{ my: 1 }}
            >
                <Radio value='credit-card' label='Credit Card' />
                <Radio value='wallet' label= {`My Wallet  ${amountInWallet}`} />
                <Radio value='cash' label='Cash on deleviry' />
            </RadioGroup>
        </FormControl>
    );
}

export default PaymentOptions;
