import React from 'react'
import { Users, X, Mail, Hash, Briefcase } from 'lucide-react';


function Selectedusermodal({selectedUser,setSelectedUser,project}) {
  return (
    <>
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
                            {selectedUser.profile ? (
                                <img
                                    src={selectedUser.profile}
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
    </>
  )
}

export default Selectedusermodal
