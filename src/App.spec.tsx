import {
  act,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";

import { server } from "../mocks/node";
import quantity10Stub from "../stubs/quantity-10.json";
import quantity20Stub from "../stubs/quantity-20.json";
import App from "./App";

describe("App", () => {
  it("should generate users", async () => {
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

    userEvent.setup();

    render(<App />);

    const title = screen.getByText("Generate users");
    expect(title).toBeInTheDocument();

    const quantityField = screen.getByLabelText("Quantity");
    expect(quantityField).toBeDisabled();
    expect(quantityField).toHaveValue(20);

    const spinner = screen.getByRole("status");
    expect(spinner).toHaveTextContent(/Loading/);

    const button = screen.getByRole("button", { name: "Generate" });
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toBeDisabled();

    await waitForElementToBeRemoved(screen.queryByRole("status"));

    expect(quantityField).toBeEnabled();
    expect(button).toBeEnabled();

    const userCards = screen.getAllByTestId(/user-card-/);
    expect(userCards).toHaveLength(20);

    expect(userCards[0]).toMatchInlineSnapshot(`
      <div
        class="card"
        data-testid="user-card-1"
      >
        <div
          class="card-body"
        >
          <div
            class="card-title h5"
          >
            genevieve.rodriguez
          </div>
          <p
            class="card-text"
          >
            http://kohler.com
          </p>
          <button
            class="btn btn-primary"
            type="button"
          >
            Go to profile
          </button>
        </div>
      </div>
    `);

    await act(() => userEvent.clear(quantityField));
    await act(() => userEvent.type(quantityField, "10"));

    expect(quantityField).toHaveValue(10);

    const moreButton = screen.getByRole("button", { name: "Fetch more users" });

    await act(() => userEvent.click(moreButton));

    // Моки отрабатывают быстро, поэтому на момент завершение вышестоящего await,
    // не получается проверить элемента на toBeDisabled, потому что данные уже пришли

    // expect(moreButton).toBeDisabled();
    // expect(quantityField).toBeDisabled();
    // expect(button).toBeDisabled();

    expect(screen.getAllByTestId(/user-card-/)).toHaveLength(30);

    await act(() => userEvent.click(button));

    // Проверка на то, что перегенерация списка перезатирает предыдущие результаты
    expect(screen.getAllByTestId(/user-card-/)).toHaveLength(10);
  });
});
