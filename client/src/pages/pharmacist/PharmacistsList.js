import React from 'react';
import { List } from '@mui/material';
import { useUserContext } from 'hooks/useUserContext';
import PharmacistCard from './PharmacistCard';

const PharmacistsList = ({
	pharmacists,
	handleRemovePharmacist,
	setSelectedPharmacist,
}) => {
	const { user } = useUserContext();
	console.log({ user });
	return (
		<List>
			{Array.isArray(pharmacists) &&
				pharmacists.map((pharmacist, index) => {
					return (
						<div key={index}>
							<div key={index}>
								<PharmacistCard
									pharmacist={pharmacist}
									handleRemovePharmacist={handleRemovePharmacist}
									setSelectedPharmacist={setSelectedPharmacist}
								></PharmacistCard>
							</div>
						</div>
					);
				})}
		</List>
	);
};

export default PharmacistsList;
