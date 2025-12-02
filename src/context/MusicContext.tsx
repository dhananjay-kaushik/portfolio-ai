"use client";

import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { siteConfig } from "@/config";

interface MusicContextType {
    isPlaying: boolean;
    toggleMusic: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: React.ReactNode }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Auto-play music on mount (if allowed by browser)
        setIsPlaying(true);
        if (audioRef.current) {
            audioRef.current.play().catch(() => {
                setIsPlaying(false);
            });
        }
    }, []);

    const toggleMusic = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(e => console.log("Audio play failed:", e));
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <MusicContext.Provider value={{ isPlaying, toggleMusic }}>
            {children}
            <audio ref={audioRef} loop>
                <source src={siteConfig.music.path} type="audio/mpeg" />
            </audio>
        </MusicContext.Provider>
    );
}

export function useMusic() {
    const context = useContext(MusicContext);
    if (context === undefined) {
        throw new Error("useMusic must be used within a MusicProvider");
    }
    return context;
}
