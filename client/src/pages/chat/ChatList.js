import { useRef } from 'react';
import {
    Divider,
    List,
    ListItemButton,
    Card,
    CardHeader,
    IconButton,
} from '@mui/material';
import { useUserContext } from 'hooks/useUserContext';
import ChatListCard from './ChatListCard';
import { useChat } from 'contexts/ChatContext';
import {
    DOCTOR_TYPE_ENUM,
    PHARMACIST_TYPE_ENUM,
    PHARMACY_MONGO_ID,
} from '../../utils/Constants.js';
import CloseIcon from '@mui/icons-material/Close';
import PerfectScrollbar from 'react-perfect-scrollbar';

const ChatList = ({ setChatOpen }) => {
    const { user } = useUserContext();
    const userType = user.type;
    const userId = user.type === PHARMACIST_TYPE_ENUM ? PHARMACY_MONGO_ID : user.id;

    const { socket, setSelectedChat, chats, updateChat } = useChat();
    const socketRef = useRef(socket);

    const handleSelectChat = (chat) => {
        chat.users.map(user => {
            if(user.id === userId) {
                user.unseen = 0;
            }
            return user;
        });
        socketRef.current.emit('message_seen', {
            sender: userId,
            chat,
        });
        updateChat(chat, null, 2);
        setSelectedChat((prevChat) => {
            if (prevChat) {
                socketRef.current.emit('leave_room', prevChat._id);
            }
            return chat;
        });
        socketRef.current.emit('join_room', chat._id);
    };

    return (
        <Card
            elevation={5}
            style={{
                height: '100%',
                maxHeight: '560px',
                width: '92%',
                padding: '0px',
            }}>
            <CardHeader
                action={
                    <IconButton aria-label="settings" onClick={() => setChatOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                }
                title= 'My Chats'
            />
            <Divider />
            <PerfectScrollbar>
            <List
                style={{
                    width: '100%',
                    padding: 0,
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: '78vh',
                }}>
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
                                        {chat && <ChatListCard chat={chat} />}
                                    </ListItemButton>
                                )}
                            </div>
                        );
                    })}
            </List>
            </PerfectScrollbar>
        </Card>
    );
};

export default ChatList;
