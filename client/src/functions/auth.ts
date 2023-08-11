import axios, {AxiosResponse} from 'axios';

export const createOrUpdateUserRequest = async (authtoken?: string | undefined): Promise<AxiosResponse> => {
    return await axios.post(
        'http://localhost:8000/api/create-or-update-user',
        {},
        {
            headers: {
                authtoken,
            }
        });
};

export const currentUserRequest = async (authtoken?: string | undefined): Promise<AxiosResponse> => {
    return await axios.post(
        'http://localhost:8000/api/current-user',
        {},
        {
            headers: {
                authtoken,
            }
        });
};

export const currentAdminRequest = async (authtoken?: string | undefined): Promise<AxiosResponse> => {
    return await axios.post(
        'http://localhost:8000/api/current-admin',
        {},
        {
            headers: {
                authtoken,
            }
        });
};


