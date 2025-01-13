import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { IoSend } from "react-icons/io5";
import { Users, X, FileText } from 'lucide-react';
import { BsPersonFillAdd } from "react-icons/bs";
import axios from '../config/axios.js';
import Selectedusermodal from '../modals/Selectedusermodal.jsx';
import { initializesocket, sendmessage, recievemessage } from '../config/socket.js';
import { UserContext } from "../context/Usercontext.jsx";
import Markdown from 'markdown-to-jsx'
import { get_web_container } from "../config/webcontainer.js"
const MessageBubble = ({ message, isOutgoing, isAI }) => {
    const baseClasses = "flex flex-col w-fit max-w-[75%] mt-1";
    const bubbleClasses = `rounded-2xl ${isAI
        ? "bg-purple-900/40 text-white rounded-tl-none"
        : isOutgoing
            ? "bg-blue-600/30 text-white rounded-tr-none"
            : "bg-gray-700 text-white rounded-tl-none"
        }`;

    return (
        <div className={`${baseClasses} ${isOutgoing ? "ml-auto" : ""}`}>
            <div className={bubbleClasses}>
                <div className="px-3 pt-2 pb-1">
                    <small className="text-gray-300/60 text-xs">
                        {message?.sender?.email}
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
    const [openFiles, setOpenFIles] = useState([])
    const [webcontainer, setWebcontainer] = useState();
    const [fileTree, setFileTree] = useState({
        "app.js": {
            file: {
                contents: `const express = require('express');`,
            },
        },
        "package.json": {
            file: {
                contents: `temp_server`
            },
        },
    });
    const [currentFile, setCurrentFile] = useState();
    const [iframeurl, setIframeurl] = useState(null);
    const [runprocess, setRunprocess] = useState(null);
    const messageBoxRef = useRef(null);
    const webcontainerprocess = async () => {

        await webcontainer?.mount(fileTree);

        const install_process = await webcontainer?.spawn("npm", ["install"]);
        install_process.output.pipeTo(new WritableStream({
            write(chunk) {
                console.log(chunk);
            }
        }))
        if(runprocess){
            runprocess.kill();
        }
        let temprunprocess = await webcontainer?.spawn("npm", ["start"]);
        temprunprocess.output.pipeTo(new WritableStream({
            write(chunk) {
                console.log(chunk);
            }
        }))
        setRunprocess(temprunprocess);
        webcontainer.on("server-ready", (port, url) => {
            console.log("server ready at port : ", port, "and url : ", url);
            setIframeurl(url);
        });
    }

    const scrollToBottom = () => {
        if (messageBoxRef.current) {
            messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
        }
    };

    const avunu_ra_naayana = (file) => {
        setCurrentFile(file);
        if (!openFiles.includes(file)) {
            setOpenFIles((prev) => [...prev, file])
        }
    }

    const del_file = (file) => {
        const idx = openFiles.indexOf(file);
        if (idx !== -1) {

            setOpenFIles(prevFiles => prevFiles.filter(f => f !== file));

            if (openFiles.length > 1) {
                let nextFileIdx;
                if (idx === openFiles.length - 1) {
                    nextFileIdx = idx - 1;
                } else {
                    nextFileIdx = idx;
                }
                setCurrentFile(openFiles[nextFileIdx]);
            } else {

                setCurrentFile();
            }
        }
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleIncomingMessage = async (data) => {
        // console.log("data : ",data.message.fileTree);
        try {
            const isAIMessage = data.sender?._id === 'ai';
            const messageObj = JSON.parse(data.message);
            console.log("message obj", messageObj.fileTree);
            setFileTree(messageObj.fileTree);
            await webcontainer?.mount(messageObj.fileTree);
            console.log(" file tree after update : ", fileTree);

            if (isAIMessage) {



                setMessages(prev => [
                    ...prev,
                    {
                        ...data,
                        message: <Markdown children={messageObj.text} />,
                        isAI: true
                    }
                ]);
            } else {
                setMessages(prev => [
                    ...prev,
                    {
                        ...data,
                        isOutgoing: false,
                        isAI: false
                    }
                ]);
            }
        } catch (error) {
            console.error('Error processing message:', error);
            // Fallback for parsing errors
            setMessages(prev => [
                ...prev,
                {
                    ...data,
                    message: String(data.message),
                    isOutgoing: false,
                    isAI: false
                }
            ]);
        }
    };

    const handleSend = () => {
        const trimmedMessage = message.trim();
        if (!trimmedMessage) return;

        const newMessage = {
            message: trimmedMessage,
            sender: user,
            isOutgoing: true
        };

        sendmessage("project-message", {
            message: trimmedMessage,
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
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchProjectData = async () => {
        try {
            const res = await axios.get(`/projects/get-project/${project._id}`);
            setProject(res.data);
        } catch (error) {
            console.error('Error fetching project:', error);
        }
    };

    useEffect(() => {
        if (!project?._id) return;

        // Check if WebContainer is already running in another tab/window
        if (!webcontainer && !window.__WC_LOADING) {
            window.__WC_LOADING = true; // Set a flag to prevent parallel boots

            get_web_container()
                .then(container => {
                    window.__WC_LOADING = false;
                    if (!webcontainer) {
                        setWebcontainer(container);
                        console.log("web container booted");
                    }
                })
                .catch(error => {
                    window.__WC_LOADING = false;
                    console.error("Failed to boot WebContainer:", error);
                    alert("Another WebContainer instance is already running. Please close other tabs/windows using WebContainer.");
                });
        }

        const socket = initializesocket(project._id);
        socket.on("project-message", handleIncomingMessage);

        fetchAllUsers();
        fetchProjectData();

        return () => {
            socket.off("project-message", handleIncomingMessage);
            socket.disconnect();
        };
    }, []);

    const toggleUserSelection = (userId) => {
        setSelectedUsers(prev =>
            prev.includes(userId)
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        );
    };

    const addUsersToProject = async () => {
        if (!selectedUsers.length) return;

        try {
            await axios.put('/projects/add-user', {
                projectid: project._id,
                users: selectedUsers,
            });

            await fetchProjectData();
            setIsAddUserOpen(false);
            setSelectedUsers([]);
        } catch (error) {
            console.error('Error adding users:', error);
        }
    };

    const openUserModal = (user) => {
        setSelectedUser(user);
    };
    const handleBlur = useCallback((e) => {
        const updatedContent = e.target.innerText;

        // Only update if content actually changed
        if (fileTree[currentFile]?.file.contents !== updatedContent) {
            const ft = {
                ...fileTree,
                [currentFile]: {
                    file: {
                        contents: updatedContent
                    }
                }
            };
            setFileTree(ft);
        }
    }, [currentFile, fileTree]);

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

            <div className="w-[30%] h-full bg-gray-800 flex flex-col">
                <div className="p-4 bg-gray-800 flex justify-between">
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
                    className="flex-1 bg-gray-700/30 rounded-lg flex flex-col message_box overflow-y-auto text-white pt-2 gap-y-1 scrollbar-hide p-4 ml-1 "
                >
                    {messages.map((msg, index) => (
                        <MessageBubble
                            key={index}
                            message={msg}
                            isOutgoing={msg?.isOutgoing}
                            isAI={msg?.sender?._id === 'ai'}
                        />
                    ))}
                </div>

                <div className="p-4 bg-gray-800/50 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                        <input
                            name='message'
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
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

            <div className="w-[70%] h-full flex flex-grow bg-gradient-to-br from-gray-900 to-gray-800">
                <div className="w-full file_shower flex bg-gray-800 h-full p-4">
                    <div className="filenames h-full w-[20%] bg-gray-700/30 rounded-lg">
                        {Object.keys(fileTree).map((file, index) => (
                            <div
                                key={index}
                                className="flex items-center space-x-2 text-gray-300 hover:bg-gray-600/50 p-2 rounded cursor-pointer"
                                onClick={() => { avunu_ra_naayana(file) }}
                            >
                                <FileText size={16} />
                                <span className="text-sm">{file}</span>
                            </div>
                        ))}
                    </div>

                    <div className={`content_shower ${iframeurl && webcontainer ? 'w-[60%]' : 'w-[80%]'} bg-gray-800 rounded-lg ml-1 text-white h-full`}>
                        <div className="top bg-gray-700/30 text-white p-2 px-4 h-[7%] rounded-lg mb-1 flex items-center">
                            <div className="flex-1 flex items-center space-x-2">
                                {openFiles.map((file, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center space-x-1 bg-gray-600/50 px-2 py-1 rounded text-sm"
                                    >
                                        <FileText size={14} />
                                        <span>{file}</span>
                                        <button onClick={() => del_file(file)}>
                                            <X
                                                size={14}
                                                className="hover:text-red-400 cursor-pointer"
                                            />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    className="bg-gray-600/50 px-2 py-1 rounded text-sm"
                                    onClick={webcontainerprocess}
                                >run process</button>
                            </div>
                        </div>

                        <div className="bottom text-white p-2 px-4 h-[92.5%] bg-gray-700/30 rounded-lg overflow-auto scrollbar-hide">
                            <pre>
                                <code
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={handleBlur}
                                >
                                    {currentFile && (
                                        fileTree[`${currentFile}`]?.file?.contents
                                    )}
                                </code>
                            </pre>
                        </div>
                    </div>

                    {iframeurl && webcontainer && (
                        <div className="preview-container w-[20%] ml-1 flex flex-col bg-gray-700/30 rounded-lg">
                            <div className="preview-url p-2 bg-gray-600/50 rounded-t-lg">
                                <input
                                    type="text"
                                    value={iframeurl}
                                    onChange={(e) => {
                                        setIframeurl(e.target.value);
                                    }}
                                    className="w-full px-2 py-1 text-sm bg-gray-700 text-white rounded border border-gray-600"
                                />
                            </div>
                            <div className="preview-frame flex-grow text-white">
                                <iframe src={iframeurl} className="w-full h-full rounded-b-lg " />
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default Project;