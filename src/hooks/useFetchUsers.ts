import { useCallback, useState } from "react";

type FetchUsersOptions = {
  quantity?: number;
  gender?: "male" | "female";
};

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
};

type UsersResponse =
  | {
      status: "OK";
      code: number;
      total: number;
      data: User[];
    }
  | {
      status: "ERROR";
      code: number;
      total?: number;
      data?: User[];
    };

const fetchUsers = (options?: FetchUsersOptions): Promise<User[]> => {
  const params = new URLSearchParams({});

  if (options?.quantity !== undefined) {
    params.append("_quantity", String(options.quantity));
  }

  if (options?.gender) {
    params.append("_gender", options.gender);
  }

  // Docs https://fakerapi.it/en
  return fetch(`https://fakerapi.it/api/v1/users?${params}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.json() as Promise<UsersResponse>;
    })
    .then(response => {
      if (response.status !== "OK") {
        throw new Error(`Somthing went wrong. statusCode: ${response.code}`);
      }

      return response.data;
    });
};

type State = "ready" | "loading" | "fetchMore" | "error";
type FetchData = (
  options: FetchUsersOptions,
  onCompleted?: (users: User[]) => void,
  onError?: (error: unknown) => void
) => Promise<{ data?: User[]; error?: unknown }>;
type ResultOptions = {
  state: State;
  data?: User[] | null;
  fetchMoreUsers: FetchData;
};

const fetchBase: FetchData = async (options, onCompleted, onError) => {
  try {
    const users = await fetchUsers(options);
    onCompleted?.(users);
    return { data: users };
  } catch (err) {
    onError?.(err);
    return { error: err };
  }
};

export const useFetchUsers = (): [FetchData, ResultOptions] => {
  const [state, setState] = useState<State>("ready");
  const [data, setData] = useState<User[] | null>(null);

  const fetchData = useCallback<FetchData>(async (options = {}) => {
    setState("loading");
    const result = await fetchBase(
      options,
      users => {
        setState("ready");
        setData(users);
      },
      error => {
        setState("error");
        setData(null);
      }
    );

    return result;
  }, []);

  const fetchMoreUsers = useCallback<FetchData>(async (options = {}) => {
    setState("fetchMore");
    const result = await fetchBase(
      options,
      users => {
        setState("ready");
        setData(prevUsers => [...(prevUsers || []), ...users]);
      },
      () => {
        setState("error");
        setData(null);
      }
    );

    return result;
  }, []);

  return [fetchData, { state, data, fetchMoreUsers }];
};
