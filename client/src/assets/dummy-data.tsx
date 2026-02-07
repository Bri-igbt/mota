import { UploadIcon, VideoIcon, ZapIcon } from 'lucide-react';

export const featuresData = [
    {
        icon: <UploadIcon className="w-6 h-6" />,
        title: 'Smart Upload',
        desc: 'Drag & drop your assets. We auto-optimize formats & size.'
    },
    {
        icon: <ZapIcon className="w-6 h-6" />,
        title: 'Instant Generation',
        desc: 'Optimized AI models create stunning visuals in seconds with great fidelity and consistency.'
    },
    {
        icon: <VideoIcon className="w-6 h-6" />,
        title: 'Video Synthesis',
        desc: 'Bring products to life with short-form video content that captivates across all channels.'
    }
];

export const plansData = [
    {
        id: "starter",
        name: "Launch",
        price: "$29",
        desc: "Perfect for creators and small brands getting started with AI ads.",
        credits: 50,
        features: [
        "AI-generated short video ads",
        "Text-to-video ad creation",
        "Auto captions & music",
        "HD exports",
        "Basic templates",
        "Email support",
        ],
    },
    {
        id: "pro",
        name: "Growth",
        price: "$79",
        desc: "For scaling brands running ads across multiple platforms.",
        credits: 100,
        features: [
        "Everything in Launch",
        "Advanced ad templates",
        "Brand kit (logo, colors, fonts)",
        "Multi-format exports (TikTok, Reels, Shorts)",
        "Faster generation speed",
        "Priority support",
        ],
        popular: true,
    },
    {
        id: "ultra",
        name: "Scale",
        price: "$199",
        desc: "Built for agencies and performance marketers.",
        credits: 300,
        features: [
        "Everything in Growth",
        "Unlimited AI video generation",
        "Bulk video creation",
        "Ad performance variations (A/B)",
        "Team collaboration",
        "Dedicated support",
        ],
    },
];


export const faqData = [
    {
        question: "What does the AI Short Video Ads Generator do?",
        answer:
        "Our AI instantly creates high-performing short video ads from your text, product, or idea. It automatically handles visuals, captions, music, and formatting for platforms like TikTok, Instagram Reels, and YouTube Shorts.",
    },
    {
        question: "Do I need video editing or design skills?",
        answer:
        "No. The platform is built for non-editors. Simply enter your content, choose a style, and let the AI generate ready-to-run ad videos in minutes.",
    },
    {
        question: "Which platforms are supported?",
        answer:
        "You can export videos optimized for TikTok Ads, Instagram Reels, Facebook Ads, and YouTube Shorts, with the correct aspect ratios and formats.",
    },
    {
        question: "How long does it take to generate a video?",
        answer:
        "Most videos are generated in under a minute. More advanced videos or bulk generations may take slightly longer depending on demand.",
    },
    {
        question: "Can I customize videos to match my brand?",
        answer:
        "Yes. You can apply your brand colors, fonts, logo, and messaging to keep all videos consistent with your brand identity.",
    },
    {
        question: "Is there a free trial or credit limit?",
        answer:
        "We offer flexible plans with monthly video credits. You can upgrade, downgrade, or cancel at any time as your needs change.",
    },
];


export const footerLinks = [
    {
        title: "Quick Links",
        links: [
            { name: "Home", url: "#" },
            { name: "Features", url: "#" },
            { name: "Pricing", url: "#" },
            { name: "FAQ", url: "#" }
        ]
    },
    {
        title: "Legal",
        links: [
            { name: "Privacy Policy", url: "#" },
            { name: "Terms of Service", url: "#" }
        ]
    },
    {
        title: "Connect",
        links: [
            { name: "Twitter", url: "#" },
            { name: "LinkedIn", url: "#" },
            { name: "GitHub", url: "#" }
        ]
    }
];