import React, { useState, useEffect, useContext, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { IoSend } from "react-icons/io5";
import { Users, X, Mail, Hash, Briefcase } from 'lucide-react';
import { BsPersonFillAdd } from "react-icons/bs";
import axios from '../config/axios.js';
import Selectedusermodal from '../modals/Selectedusermodal.jsx';
import { initializesocket, sendmessage, recievemessage } from '../config/socket.js';
import { UserContext } from "../context/Usercontext.jsx";

const MessageBubble = ({ message, isOutgoing, isAI }) => {
    const baseClasses = "flex flex-col w-fit max-w-[75%] mt-1";
    const bubbleClasses = `rounded-2xl ${
        isAI ? "bg-purple-100 text-white rounded-tl-none" :
        isOutgoing ? "bg-blue-600 text-white rounded-tr-none" :
        "bg-gray-700 text-white rounded-tl-none"
    }`;

    return (
        <div className={`${baseClasses} ${isOutgoing ? "ml-auto" : ""}`}>
            <div className={bubbleClasses}>
                <div className="px-3 pt-2 pb-1">
                    <small className="text-gray-300 text-xs">
                        {message.sender.email}
                    </small>
                </div>
                <div className="px-3 pb-3 break-words">
                    {message.message}
                </div>
            </div>
        </div>
    );
};

const Project = () => {
    const { user } = useContext(UserContext);
    const location = useLocation();
    const pro = location.state;
    const [project, setProject] = useState(pro);
    const [isSliderOpen, setIsSliderOpen] = useState(false);
    const [isAddUserOpen, setIsAddUserOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const messageBoxRef = useRef(null);

    const scrollToBottom = () => {
        if (messageBoxRef.current) {
            messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleIncomingMessage = (data) => {
        setMessages(prev => [...prev, {
            ...data,
            isOutgoing: false,
            isAI: data.sender.isAI
        }]);
    };

    const handleSend = () => {
        if (!message.trim()) return;

        const newMessage = {
            message: message,
            sender: user,
            isOutgoing: true
        };

        sendmessage("project-message", {
            message: message,
            sender: user
        });

        setMessages(prev => [...prev, newMessage]);
        setMessage("");
    };

    const fetchAllUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/users/allusers');
            setAllUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchprojectdata = async () => {
        const res = await axios.get(`/projects/get-project/${project._id}`);
        setProject(res.data);
    };

    useEffect(() => {
        const socket = initializesocket(pro._id);
        socket.on("project-message", handleIncomingMessage);
        fetchAllUsers();

        return () => {
            socket.off("project-message", handleIncomingMessage);
            socket.disconnect();
        };
    }, []);

    const toggleUserSelection = (userId) => {
        setSelectedUsers(prev => {
            if (prev.includes(userId)) {
                return prev.filter(id => id !== userId);
            } else {
                return [...prev, userId];
            }
        });
    };

    const addUsersToProject = async () => {
        try {
            await axios.put('/projects/add-user', {
                projectid: project._id,
                users: selectedUsers,
            });
            fetchprojectdata();
            setIsAddUserOpen(false);
            setProject((prev) => {
                const updatedUsers = new Set([...prev.users]);
                selectedUsers.forEach((user) => updatedUsers.add(user));
                return {
                    ...prev,
                    users: Array.from(updatedUsers),
                };
            });
            setSelectedUsers([]);
        } catch (error) {
            console.error('Error adding users:', error.response?.data || error.message);
        }
    };

    const openUserModal = (user) => {
        setSelectedUser(user);
    };

    return (
        <div className="w-full h-screen flex font-serif relative">
            <Selectedusermodal
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                project={project}
            />

            {isAddUserOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-30">
                    <div className="bg-zinc-900 rounded-xl p-6 w-96 space-y-6 relative shadow-2xl border border-zinc-700">
                        <div className="flex justify-between items-center">
                            <h3 className="text-white text-lg">Add Collaborators</h3>
                            <button
                                onClick={() => setIsAddUserOpen(false)}
                                className="text-zinc-400 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="max-h-[40vh] overflow-y-auto space-y-4">
                            {loading ? (
                                <div className="text-center text-zinc-400">Loading users...</div>
                            ) : (
                                allUsers.map((user) => (
                                    <div
                                        key={user._id}
                                        className={`bg-zinc-800/50 rounded-lg p-1 px-2 w-[90%] cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-[1.02] hover:bg-zinc-800
                                            ${selectedUsers.includes(user._id)
                                                ? ' bg-blue-500/10 '
                                                : 'hover:shadow-lg hover:shadow-zinc-700/20'
                                            }`}
                                        onClick={() => toggleUserSelection(user._id)}
                                    >
                                        <div className="flex items-center gap-3">
                                            {user.profile ? (
                                                <img
                                                    src={user.profile}
                                                    alt={user.email}
                                                    className={`w-10 h-10 rounded-full object-cover transition-all duration-300 ${selectedUsers.includes(user._id)
                                                        ? 'ring-2 ring-blue-500 scale-110'
                                                        : ''
                                                    }`}
                                                />
                                            ) : (
                                                <div className={`w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center transition-all duration-300 ${selectedUsers.includes(user._id)
                                                    ? 'ring-2 ring-blue-500 scale-110 bg-blue-600'
                                                    : ''
                                                }`}>
                                                    <span className="text-zinc-300 text-lg uppercase">
                                                        {user.email[0]}
                                                    </span>
                                                </div>
                                            )}
                                            <p className={`text-white transition-all duration-300 ${selectedUsers.includes(user._id)
                                                ? 'font-medium scale-105'
                                                : ''
                                            }`}>{user.email}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setIsAddUserOpen(false)}
                                className="px-4 py-2 text-zinc-400 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={addUsersToProject}
                                disabled={selectedUsers.length === 0}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Add Selected Users
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div
                className={`absolute top-0 left-0 h-full bg-zinc-900/95 backdrop-blur-sm border-r border-zinc-700 transition-all duration-300 ease-in-out z-10 overflow-y-auto
                ${isSliderOpen ? 'w-[30%] opacity-100' : 'w-0 opacity-0'}`}
            >
                <div className="p-4 bg-zinc-800/50 flex justify-between items-center">
                    <h3 className="text-white text-lg">Collaborators</h3>
                    <button
                        onClick={() => setIsSliderOpen(false)}
                        className="text-zinc-400 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-4 space-y-4">
                    {project?.users?.map((user) => (
                        <div
                            key={user._id}
                            className="bg-zinc-800/50 rounded-lg p-4 space-y-3 cursor-pointer hover:bg-zinc-800 transition-colors"
                            onClick={() => openUserModal(user)}
                        >
                            <div className="flex items-center gap-3">
                                {user.profile ? (
                                    <img
                                        src={user.profile}
                                        alt={user.email}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center">
                                        <span className="text-zinc-300 text-lg uppercase">
                                            {user?.email?.[0]?.toUpperCase() || "?"}
                                        </span>
                                    </div>
                                )}
                                <div>
                                    <p className="text-white">{user.email}</p>
                                    <p className="text-zinc-400 text-sm">ID: {user._id}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-[30%] h-full bg-zinc-900 flex flex-col">
                <div className="p-4 bg-zinc-800 flex justify-between">
                    <h2 className="text-white text-xl font-serif">{project?.name || 'Messages'}</h2>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setIsAddUserOpen(true)}
                            className="hover:text-white transition-colors"
                        >
                            <BsPersonFillAdd className="text-zinc-400 mt-1 h-7 w-7 hover:text-white transition-colors" />
                        </button>
                        <button
                            onClick={() => setIsSliderOpen(true)}
                            className="hover:text-white transition-colors"
                        >
                            <Users className="text-zinc-400 mt-1 hover:text-white transition-colors" />
                        </button>
                    </div>
                </div>

                <div
                    ref={messageBoxRef}
                    className="flex-1 flex flex-col message_box overflow-y-auto text-white pt-2 gap-y-1 scrollbar-hide p-4"
                >
                    {messages.map((msg, index) => (
                        <MessageBubble
                            key={index}
                            message={msg}
                            isOutgoing={msg.isOutgoing}
                            isAI={msg.sender.isAI}
                        />
                    ))}
                </div>

                <div className="p-4 bg-zinc-800/50 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                        <input
                            name='message'
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            type="text"
                            placeholder="Type a message..."
                            className="flex-1 bg-zinc-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 font-serif"
                        />
                        <button
                            onClick={handleSend}
                            className="bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-700 flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-blue-500/20 h-10 w-10"
                        >
                            <IoSend className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-[70%] h-full bg-gradient-to-br from-zinc-800 to-zinc-900">
            </div>
        </div>
    );
};

export default Project;