import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import config from "@/config";

interface ProfileData {
    name: string;
    department: string;
    initials: string;
}

interface ProfileContextType {
    profileData: ProfileData;
    isInitialLoading: boolean;
    refetchProfile: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
    const [profileData, setProfileData] = useState<ProfileData>({
        name: "",
        department: "",
        initials: "--",
    });
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

    const fetchProfile = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                if (!hasLoadedOnce) setIsInitialLoading(false);
                return;
            }

            const res = await fetch(`${config.API_BASE_URL}/student/profile/${user.id}`, {
                method: "GET",
                headers: {
                    accept: "application/json",
                    "ngrok-skip-browser-warning": "true",
                },
            });

            if (!res.ok) {
                console.error("Failed to fetch profile:", await res.text());
                if (!hasLoadedOnce) setIsInitialLoading(false);
                return;
            }

            const json = await res.json();

            if (json.data) {
                const { name, department } = json.data;

                if (name) {
                    const parts = name.trim().split(" ");
                    const initials =
                        parts.length >= 2
                            ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
                            : parts[0].substring(0, 2).toUpperCase();

                    setProfileData({
                        name,
                        department: department || "",
                        initials,
                    });
                }
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
        } finally {
            if (!hasLoadedOnce) {
                setIsInitialLoading(false);
                setHasLoadedOnce(true);
            }
        }
    };

    const refetchProfile = async () => {
        // Refetch without showing loading state - keep existing data visible
        await fetchProfile();
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <ProfileContext.Provider value={{ profileData, isInitialLoading, refetchProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (context === undefined) {
        throw new Error("useProfile must be used within a ProfileProvider");
    }
    return context;
};
