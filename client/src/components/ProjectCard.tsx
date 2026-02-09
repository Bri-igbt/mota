import { useNavigate } from "react-router-dom"
import type { Project } from "../types"
import { useState } from "react";
import { aspectRatio } from "framer-motion";
import { Loader2Icon } from "lucide-react";

const ProjectCard = ({ gen, setGeneration, forCommunity = false }: {gen: Project, setGeneration: React.Dispatch<React.SetStateAction<Project[]>>, forCommunity?: boolean}) => {

    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <div key={gen.id} className="mb-4 break-inside-avoid">
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition group">
                {/* Prwview */}
                <div className={`${gen.aspectRatio ==='9:16' ? 'aspect-9/16' : 'aspect-video'} relative overflow-hidden`}>
                    {gen.generatedImage && (
                        <img
                            src={gen.generatedImage}
                            alt={gen.productName}
                            className={`absolute inset-0 w-full h-full object-cover transition duration-500 ${gen.generatedVideo ? "group-hover:opacity-0" : "group-hover:scale-105"} transition`}
                        />
                    )}

                    {gen.generatedVideo && (
                        <video
                            src={gen.generatedVideo}
                            playsInline
                            loop
                            muted
                            className="absolute inset-0 w-full h-full object-cover transition duration-500 opacity-0 group-hover:opacity-100"
                            onMouseEnter={(e) => (e.currentTarget.play())}
                            onMouseLeave={(e) => (e.currentTarget.pause())}
                        />
                    )}

                    {(!gen.generatedImage && !gen.generatedVideo) && (
                        <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-black/20">
                            <Loader2Icon className="size-5 animate-spin" />
                        </div>
                    )}

                    {/* Status Badge */}
                    <div className='absolute left-3 top-3 flex gap-2 items-center'>
                        {gen.isGenerating && (
                            <span className="text-xs px-2 py-1 bg-yellow-600/30 rounded-full">Generating</span>
                        )}

                        {gen.isPublished && (
                            <span className="text-xs px-2 py-1 bg-green-600/30 rounded-full">Published</span>
                        )}
                    </div>

                    {/* Source Images */}
                    <div className=""></div>
                </div>

                {/* Details */}
                <div></div>
            </div>
        </div>
    )
}

export default ProjectCard