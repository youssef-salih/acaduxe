import React from 'react';
import { useNavigate } from 'react-router-dom';
import USERS from '../../../../common/data/userDummyData';
import { demoPagesMenu } from '../../../../menu';
import UserContact from '../../../../components/UserContact';

const CommonDashboardUserCard = () => {
	const navigate = useNavigate();

	return (
		<UserContact
			name={`${USERS.JOHN.name} ${USERS.JOHN.surname}`}
			mail={`${USERS.SAM.username}@site.com`}
			phone='1234567'
			onChat={() => navigate(`../${demoPagesMenu.chat.subMenu.withListChat.path}`)}
			src={USERS.SAM.src}
			srcSet={USERS.SAM.srcSet}
			color={USERS.SAM.color}
		/>
	);
};

export default CommonDashboardUserCard;
