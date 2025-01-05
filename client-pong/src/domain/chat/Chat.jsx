import React, { useEffect, useState } from "react";
import Navbar from "../template/Navbar";
import "../../assets/styles/chat.css";

import useUserActions from "./assets/useUserActions";
import useFetchUsers from "./assets/useFetchUsers";
import PlayerLists from "./components/PlayerLists";
import ChatWindow from "./components/ChatWindow";
import { useWebSocket } from "../webSocket/WebSocketProvider.jsx";

import "react-toastify/dist/ReactToastify.css";

const Chat = () => {
  const {
    wsSendNotification,
    notifications,
  } = useWebSocket();

  const [friends, setFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [nonFriends, setNonFriends] = useState([]);
  const [error, setError] = useState(null);

  // Estado para armazenar o display_name e avatar
  const [userInfo, setUserInfo] = useState({
    display_name: "",
    avatar: "",
  });

  // Gerenciamento das abas de chat
  const [chatTabs, setChatTabs] = useState([{ id: "global", name: "Chat Global" }]);
  const [activeTab, setActiveTab] = useState("global"); // Aba ativa

  // Função para abrir um chat privado
  const openChatWithUser = (friend) => {
    const roomId = `room_${[localStorage.getItem("id"), friend.id].sort().join("_")}`;
    const chatId = `private_${friend.id}`;
    
    if (!chatTabs.some((tab) => tab.id === chatId)) {
      setChatTabs((prevTabs) => [
        ...prevTabs,
        { id: chatId, name: friend.display_name, roomId, friend },
      ]);
    }
    setActiveTab(chatId); // Define a aba recém-aberta como ativa
  };
  

  // Função para fechar uma aba de chat
  const closeChatTab = (chatId) => {
    setChatTabs((prevTabs) => prevTabs.filter((tab) => tab.id !== chatId));
    if (activeTab === chatId) {
      setActiveTab("global"); // Volta para o global ao fechar a aba ativa
    }
  };

  useFetchUsers({
    setFriends,
    setPendingRequests,
    setBlockedUsers,
    setNonFriends,
    setError,
    notifications,
  });

  const {
    addFriend,
    blockUser,
    unblockUser,
    acceptFriendRequest,
    rejectFriendRequest,
    removeFriend,
  } = useUserActions(wsSendNotification);

  return (
    <>
      <Navbar onUserInfoLoaded={(userInfo) => setUserInfo(userInfo)} />
      <div className="chat-container">
        <PlayerLists
          friends={friends}
          pendingRequests={pendingRequests}
          blockedUsers={blockedUsers}
          nonFriends={nonFriends}
          setFriends={setFriends}
          setPendingRequests={setPendingRequests}
          setBlockedUsers={setBlockedUsers}
          setNonFriends={setNonFriends}
          addFriend={addFriend}
          blockUser={blockUser}
          unblockUser={unblockUser}
          acceptFriendRequest={acceptFriendRequest}
          rejectFriendRequest={rejectFriendRequest}
          removeFriend={removeFriend}
          openChatWithUser={openChatWithUser} // Passa a função para abrir o chat privado
          error={error}
        />
        <ChatWindow
          chatTabs={chatTabs} // Passa as abas
          activeTab={activeTab} // Aba ativa
          setActiveTab={setActiveTab} // Função para definir a aba ativa
          closeChatTab={closeChatTab} // Passa a função para fechar as abas
          userInfo={userInfo} // Passa os dados do usuário para o ChatWindow
        />
      </div>
    </>
  );
};

export default Chat;
