import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IoSend } from "react-icons/io5";
import { Users, X, Mail, Hash, Briefcase } from 'lucide-react';

const Project = () => {
    const location = useLocation();
    const project = location.state;
    const [isSliderOpen, setIsSliderOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const openUserModal = (user) => {
        setSelectedUser(user);
    };

    return (
        <div className="w-full h-screen flex font-serif relative">
            {/* User Modal */}
            {selectedUser && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20">
                    <div className="bg-zinc-900 rounded-xl p-6 w-96 space-y-6 relative shadow-2xl border border-zinc-700">
                        <button 
                            onClick={() => setSelectedUser(null)}
                            className="absolute right-4 top-4 text-zinc-400 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex flex-col items-center gap-4">
                            {selectedUser.profilePic ? (
                                <img 
                                    src={selectedUser.profilePic} 
                                    alt={selectedUser.email}
                                    className="w-24 h-24 rounded-full object-cover border-4 border-zinc-700"
                                />
                            ) : (
                                <div className="w-24 h-24 rounded-full bg-zinc-700 flex items-center justify-center border-4 border-zinc-600">
                                    <span className="text-zinc-300 text-3xl uppercase">
                                        {selectedUser.email[0]}
                                    </span>
                                </div>
                            )}
                            
                            <div className="space-y-4 w-full">
                                <div className="flex items-center gap-3 text-zinc-300">
                                    <Mail className="w-5 h-5" />
                                    <span>{selectedUser.email}</span>
                                </div>
                                
                                <div className="flex items-center gap-3 text-zinc-300">
                                    <Hash className="w-5 h-5" />
                                    <span>ID: {selectedUser._id}</span>
                                </div>
                                
                                <div className="flex items-center gap-3 text-zinc-300">
                                    <Briefcase className="w-5 h-5" />
                                    <span>Collaborator in {project?.name}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Collaborators Slider */}
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
                                {user.profilePic ? (
                                    <img 
                                        src={user.profilePic} 
                                        alt={user.email}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center">
                                        <span className="text-zinc-300 text-lg uppercase">
                                            {user.email[0]}
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

            {/* Main Layout */}
            <div className="w-[30%] h-full bg-zinc-900 flex flex-col">
                <div className="p-4 bg-zinc-800 flex justify-between">
                    <h2 className="text-white text-xl font-serif">{project?.name || 'Messages'}</h2>
                    <button 
                        onClick={() => setIsSliderOpen(true)}
                        className="hover:text-white transition-colors"
                    >
                        <Users className="text-zinc-400 mt-1 hover:text-white transition-colors" />
                    </button>
                </div>
                
                <div className="flex-1 flex-col message_box overflow-y-auto text-white pt-2 pr-4 tracking-tighter">
                    <div className='incoming message flex flex-col  '>
                    <small
                    className='opacity-65 text-xs'
                    >example@gmail.com</small>
                        <p className='bg-zinc-700 p-1 rounded-r-[0.7vw] px-2 w-fit'>
                        incoming message
                         </p> 
                         
                    </div>
                    
                 
                </div>

                <div className="p-4 bg-zinc-800/50 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="flex-1 bg-zinc-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 font-serif"
                        />
                        <button className="bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-700 flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-blue-500/20 h-10 w-10">
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