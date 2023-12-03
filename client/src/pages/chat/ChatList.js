import { useEffect, useRef } from 'react';
import {
    Divider,
    List,
    ListItemButton,
    ListSubheader,
    ListItemText,
    Paper,
} from '@mui/material';
import { useUserContext } from 'hooks/useUserContext';
import { communicationAxios, clinicAxios } from '../../utils/AxiosConfig';
import ChatCard from './ChatCard';
import { useChat } from 'contexts/ChatContext';
import {
    DOCTOR_TYPE_ENUM,
    PATIENT_TYPE_ENUM,
    PHARMACIST_TYPE_ENUM,
    PHARMACY_MONGO_ID,
} from '../../utils/Constants.js';
import { chatExist, areUsersEqual } from 'utils/ChatUtils';
import { isEqual } from 'lodash';

const ChatList = () => {
    const { user } = useUserContext();
    const userId = user.id,
        userType = user.type;
    const { socket, setSelectedChat, chats, setChats } = useChat();
    const socketRef = useRef(socket);

    const fetchDoctors = async () => {
        setChats((prevChats) => {
            clinicAxios
                .get('/doctors')
                .then((response) => {
                    const doctors = response.data;
                    for (let i = 0; i < doctors.length; i++) {
                        if (
                            !chatExist(
                                prevChats,
                                PHARMACY_MONGO_ID,
                                doctors[i]._id
                            ) &&
                            !chatExist(
                                prevChats,
                                doctors[i]._id,
                                PHARMACY_MONGO_ID
                            )
                        ) {
                            communicationAxios
                                .post('/chat', {
                                    chat: {
                                        chatName: 'Pharmacy',
                                        users: [
                                            {
                                                id: PHARMACY_MONGO_ID,
                                                userType: PHARMACIST_TYPE_ENUM,
                                            },
                                            {
                                                id: doctors[i]._id,
                                                userType: DOCTOR_TYPE_ENUM,
                                            },
                                        ],
                                    },
                                })
                                .then((res) => {
                                    prevChats.push(res.data);
                                })
                                .catch((err) => console.log(err));
                        }
                    }
                })
                .catch((err) => console.log(err));
            return prevChats;
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await communicationAxios.get(
                    `/chat/${
                        userType === PHARMACIST_TYPE_ENUM
                            ? PHARMACY_MONGO_ID
                            : userId
                    }`
                );
                if (
                    userType === PATIENT_TYPE_ENUM &&
                    !chatExist(response.data, userId, PHARMACY_MONGO_ID) &&
                    !chatExist(response.data, PHARMACY_MONGO_ID, userId)
                ) {
                    const res = await communicationAxios.post('/chat', {
                        chat: {
                            chatName: 'Pharmacy',
                            users: [
                                {
                                    id: PHARMACY_MONGO_ID,
                                    userType: PHARMACIST_TYPE_ENUM,
                                },
                                { id: userId, userType: PATIENT_TYPE_ENUM },
                            ],
                        },
                    });
                
                        setChats((prevChats) => {
                            if (
                                prevChats.some((c) =>
                                    areUsersEqual(c.users, res.data.users)
                                )
                            ) {
                                return prevChats;
                            }
                            return [...prevChats, res.data];
                        });
                } else {
                    if (!isEqual(response.data, chats)) {
                        setChats(response.data);
                    }
                }
                if (userType === PHARMACIST_TYPE_ENUM) {
                    await fetchDoctors(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [chats]);

    const handleSelectChat = (chat) => {
        setSelectedChat((prevChat) => {
            if (prevChat) {
                socketRef.current.emit('leave_room', prevChat._id);
            }
            return chat;
        });
        socketRef.current.emit('join_room', chat._id);
    };

    return (
        <Paper
            style={{
                width: '30%',
                height: '100%',
                padding: '0px',
            }}>
            <List
                style={{
                    width: '100%',
                    padding: 0,
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: '78vh',
                }}>
                <ListSubheader sx={{ borderTopLeftRadius: 10 }}>
                    <ListItemText
                        primary='My Chats'
                        primaryTypographyProps={{
                            fontSize: 20,
                            fontWeight: 'medium',
                            lineHeight: 3,
                            mb: '2px',
                            borderRadius: 50,
                        }}
                        sx={{ margin: 0 }}
                    />
                    <Divider></Divider>
                </ListSubheader>
                {chats &&
                    chats.map((chat, index) => {
                        return (
                            <div key={index}>
                                {(userType !== PHARMACIST_TYPE_ENUM ||
                                    chat.lastMessage ||
                                    (chat.users &&
                                        chat.users[1]?.userType ===
                                            DOCTOR_TYPE_ENUM)) && (
                                    <ListItemButton
                                        sx={{
                                            backgroundColor: '#fafafa',
                                            padding: '2px auto',
                                            marginLeft: 2,
                                            marginRight: 2,
                                            marginTop: 1,
                                        }}
                                        onClick={() => handleSelectChat(chat)}>
                                        {chat && <ChatCard chat={chat} />}
                                    </ListItemButton>
                                )}
                            </div>
                        );
                    })}
            </List>
        </Paper>
    );
};

export default ChatList;
