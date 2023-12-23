import React, { useState, useEffect } from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import { pharmacyAxios } from '../../utils/AxiosConfig';

import AltMedicinesList from './AltMedicinesList';
import MedicineDetails from './MedicineDetails';
import Message from 'ui-component/Message';

const AltMedicines = ({ activeIngerdients, handleAddToCart, addToCartAlert, medicineIsBeingAddedToCart, errorAddingToCart }) => {

    const [medicines, setMedicines] = useState([]);
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const medicinalUses = [];


    useEffect(() => {
        pharmacyAxios
            .get('/medicines')
            .then((response) => {
                for (let i = 0; i < response.data.medicines.length; i++) {
                    if (response.data.medicines[i].activeIngerdients === activeIngerdients && response.data.medicines[i].quantity != 0) {
                        setMedicines(oldArray => [...oldArray, response.data.medicines[i]]);
                    }
                }
                for (let i = 0; i < response.data.medicines.length; i++) {
                    const medicine = response.data.medicines[i];
                    if (!medicinalUses.includes(medicine.medicinalUse))
                        medicinalUses.push(medicine.medicinalUse);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleDialogClose = () => {
        setSelectedMedicine(null);
    };

    // const handleAddToCart = (medicine) => {
    //     setErrorAddingToCart(false);
    //     setMedicineIsBeingAddedToCart(true);
    //     pharmacyAxios
    //         .post(`/cart/users/${userId}/medicines`, { medicine })
    //         .then((response) => {
    //             console.log(response.data);
    //             setMedicineIsBeingAddedToCart(false);
    //             setAddToCartAlert(true);
    //             setTimeout(() => {
    //                 setAddToCartAlert(false);
    //             }, 1000);
    //         })
    //         .catch((error) => {
    //             setMedicineIsBeingAddedToCart(false);
    //             errorAddingToCart(true);
    //             console.log(error);
    //         });
    // };

    return (
        <MainCard title='Alternative Medicines'>
            <AltMedicinesList
                medicines={medicines}
                setSelectedMedicine={setSelectedMedicine}
                handleAddToCart={handleAddToCart}
                medicineIsBeingAddedToCart={medicineIsBeingAddedToCart}
            />
            {addToCartAlert && (
                <Message
                    message={'Medicine added to cart successfully!'}
                    type={'success'}
                    time={1000}
                    vertical={'bottom'}
                    horizontal={'right'}
                />
            )}

            {medicineIsBeingAddedToCart && (
                <Message
                    message={'Adding medicine to cart...'}
                    type={'info'}
                    time={1000}
                    vertical={'bottom'}
                    horizontal={'right'}
                />
            )}

            {errorAddingToCart && (
                <Message
                    message={'Error adding medicine to cart'}
                    type={'error'}
                    time={1000}
                    vertical={'bottom'}
                    horizontal={'right'}
                />
            )}
            <MedicineDetails
                selectedMedicine={selectedMedicine}
                handleDialogClose={handleDialogClose}
            />
        </MainCard>
    );
};

export default AltMedicines;
