import {useState, useCallback} from 'react';

type FetchUsersOptions = {
    quantity?: number;
    gender?: 'male' | 'female';
}

type User = {
    id: number;
    uuid: string;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    email: string;
    ip: string;
    macAddress: string;
    website: string;
    image: string;
}

type UsersResponse = {
    status: "OK";
    code: number;
    total: number;
    data: User[];
} | {
    status: "ERROR";
    code: number;
    total?: number;
    data?: User[];
}

const fetchUsers = (options?: FetchUsersOptions): Promise<User[]> => {
    const params = new URLSearchParams({});

    if (options?.quantity !== undefined) {
        params.append('_quantity', String(options.quantity));
    }

    if (options?.gender) {
        params.append('_gender', options.gender);
    }

    return fetch(`https://fakerapi.it/api/v1/users?${params}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return response.json() as Promise<UsersResponse>;
        })
        .then((response) => {
            if (response.status !== "OK") {
                throw new Error(`Somthing went wrong. statusCode: ${response.code}`);
            }

            return response.data;
        });
};

type State = 'ready' | 'loading' | 'fetchMore' | 'error';
type FetchData = (options?: FetchUsersOptions) => Promise<{data?: User[], error?: unknown}>;
type ResultOptions = {
    state: State;
    data?: User[] | null;
    fetchMoreUsers: FetchData;
}

export const useFetchUsers = (): [FetchData, ResultOptions] => {
    const [state, setState] = useState<State>('ready');
    const [data, setData] = useState<User[] | null>(null);

    const fetchBase = useCallback<FetchData>(async (options) => {
        try {
            const users = await fetchUsers(options);
            setState('ready');
            setData(users);
            return {data: users};
        } catch (err) {
            setState('error');
            setData(null);
            return {error: err};
        }
    }, []);

    const fetchData = useCallback<FetchData>((options) => {
        setState('loading');
        return fetchBase(options);
    }, []);

    const fetchMoreUsers = useCallback<FetchData>((options) => {
        setState('fetchMore');
        return fetchBase(options);
    }, []);

    return [fetchData, {state, data, fetchMoreUsers}];
};
