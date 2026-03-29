import { fetchWithAuth, apiBaseURL } from "@/utils";

export const fetchUserDetails = async () => {
    try {
        const response = await fetchWithAuth(`${apiBaseURL}/user/detail`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch user details');
        }

        const data = await response.json();

        if (data.status === 'success') {
            return data.user_details;
        }

        throw new Error('Error fetching user details');
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
};

export const fetchUserReports = async () => {
    try {
        
        const response = await fetchWithAuth(`${apiBaseURL}/user/reports`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch user reports');
        }

        const data = await response.json();

        if (data.status === 'success') {
            return data.reports;
        }

        throw new Error('Error fetching user reports');
    } catch (error) {
        console.error('Error fetching user reports:', error);
        throw error;
    }
};