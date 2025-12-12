import config from "@/config";

export interface StudentProfile {
    student_id: string;
    email: string | null;
    name: string;
    department: string;
    bio: string;
}

export interface ApiResponse<T> {
    status: string;
    data: T;
}

/**
 * Fetches the student profile by ID.
 * @param studentId The unique identifier for the student.
 * @returns An ApiResponse containing the StudentProfile.
 */
export const fetchStudentProfile = async (studentId: string): Promise<ApiResponse<StudentProfile>> => {
    const res = await fetch(`${config.API_BASE_URL}/student/profile/${studentId}`, {
        headers: {
            "ngrok-skip-browser-warning": "true",
        },
    });
    if (!res.ok) {
        throw new Error(`Failed to fetch profile: ${res.statusText}`);
    }
    return res.json();
};

/**
 * Updates the student profile.
 * @param profile The partial or full student profile data to update.
 * @returns The server response (often the updated profile or a success message).
 */
export const updateStudentProfile = async (profile: StudentProfile): Promise<any> => {
    const res = await fetch(`${config.API_BASE_URL}/student/profile`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(profile),
    });

    if (!res.ok) {
        throw new Error(`Failed to update profile: ${res.statusText}`);
    }

    // Depending on your API, this might return JSON or just 200 OK.
    // Safely attempting to parse JSON if available, otherwise return null.
    try {
        return await res.json();
    } catch {
        return null;
    }
};
