import "bootstrap/dist/css/bootstrap.min.css";
import {
  useCallback,
  useEffect,
  useState,
  ChangeEventHandler,
  FormEventHandler,
} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";

import { useFetchUsers } from "@/hooks/useFetchUsers";

import styles from "./App.module.css";

export default function App() {
  const [formData, setFormData] = useState({
    quantity: 20,
  });

  const [fetchUsers, { data, state, fetchMoreUsers }] = useFetchUsers();

  useEffect(() => {
    void fetchUsers(formData);
  }, []);

  const onQuantityChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => {
      setFormData({ quantity: Number(value) });
    },
    []
  );

  const onSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    event => {
      event.preventDefault();
      void fetchUsers(formData);
    },
    [formData]
  );

  const fetchMore = useCallback(() => {
    void fetchMoreUsers(formData);
  }, [formData]);

  const isLoading = state === "fetchMore" || state === "loading";

  return (
    <main className={styles.main}>
      <Container>
        <h1>Generate users</h1>
        <Form
          onSubmit={onSubmit}
          className="d-flex align-items-center flex-column my-3 w-100"
        >
          <Form.Label className="">
            Quantity
            <Form.Control
              id="quantity-field"
              type="number"
              value={formData.quantity}
              disabled={isLoading}
              onChange={onQuantityChange}
            />
          </Form.Label>
          <Button
            type="submit"
            className="mt-3"
            variant="outline-secondary"
            disabled={isLoading}
          >
            Generate
          </Button>
        </Form>
        <section>
          {state === "loading" ? (
            <Spinner animation="border" role="status" className="mt-5">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <div>
              {data?.map(user => (
                <Card key={user.id}>
                  <Card.Body>
                    <Card.Title>{user.username}</Card.Title>
                    <Card.Text>{user.website}</Card.Text>
                    <Button variant="primary">Go to profile</Button>
                  </Card.Body>
                </Card>
              ))}
              <Button
                variant="primary"
                className="my-5"
                onClick={fetchMore}
                disabled={state === "fetchMore"}
              >
                Fetch more users
              </Button>
            </div>
          )}
        </section>
      </Container>
    </main>
  );
}
