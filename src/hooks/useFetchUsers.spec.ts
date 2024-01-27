import { http, HttpResponse } from "msw";
import { renderHook, act, waitFor } from "@testing-library/react";

import { server } from "../../mocks/node";
import { useFetchUsers } from "./useFetchUsers";
import quantity10Stub from "./stubs/quantity-10.json";
import quantity20Stub from "./stubs/quantity-20.json";

describe("App", () => {
  it("load users and fetch more users", async () => {
    server.use(
      http.get("https://fakerapi.it/api/v1/users", ({ request }) => {
        const url = new URL(request.url);
        const quantity = url.searchParams.get("_quantity");

        switch (quantity) {
          case "10":
            return HttpResponse.json(quantity10Stub);
          default:
            return HttpResponse.json(quantity20Stub);
        }
      })
    );

    const { result } = renderHook(useFetchUsers);

    expect(result.current[1].data).toBeNull();

    const loadUsers = result.current[0];

    act(() => {
      loadUsers({});
    });

    expect(result.current[1].state).toBe("loading");

    await waitFor(() => {
      expect(result.current[1].data).toEqual(quantity20Stub.data);
    });

    expect(result.current[1].state).toBe("ready");

    const fetchMoreUsers = result.current[1].fetchMoreUsers;

    act(() => {
      fetchMoreUsers({ quantity: 10 });
    });

    expect(result.current[1].state).toBe("fetchMore");

    await waitFor(() => {
      expect(result.current[1].data).toEqual([
        ...quantity20Stub.data,
        ...quantity10Stub.data,
      ]);
    });

    expect(result.current[1].state).toBe("ready");
  });
});
