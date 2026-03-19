import { useEffect, useState } from "react";
import type { Project } from "../types";
import { Loader2Icon } from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import { PrimaryButton } from "../components/Buttons";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const MyGenerations = () => {

    const {user, isLoaded} = useUser(); 
    const {getToken} = useAuth();
    const navigate = useNavigate()

    const [generations, setGenerations] = useState<Project[]>([])
    const [loading, setLoading] = useState(true);

    const fetchMyGenerations = async () => {
        try {
            
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error.message)   
        }
    }

    useEffect(() => {
        fetchMyGenerations()
    }, [])
    
    return loading ? (
        <div className='min-h-screen flex items-center justify-center'>
            <Loader2Icon className="size-5 animate-spin text-indigo-400" />
        </div>
    ) : (
        <div className="min-h-screen text-white p-6 md:p-12 my-28">
            <div className='max-w-6xl mx-auto'>
                <header className="mb-12">
                    <h1 className='text-3xl md:text-4xl font-semibold mb-4'>My Generation</h1>
                    <p className="text-gray-400">View and manage your AI-generated content.</p>
                </header>

                
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
                    {generations.map((gen) => (
                    <ProjectCard key={gen.id} gen={gen} setGeneration={setGenerations} />
                    ))}
                </div>

                {generations.length === 0 && (
                    <div className="text-center py-20 bg-white/5 rounded-xl border border-white/10">
                        <p className="text-xl font-medium mb-2">No generations yet</p>
                        <p className="text-gray-400 mb-6">Start creating stunning product photos today</p>

                        <PrimaryButton onClick={() => window.location.href = '/generate'} className="mt-6">
                            Create New Generation
                        </PrimaryButton>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyGenerations