import {fetchUser} from './user';

test('the user data fetched correct', () => {
    return fetchUser().then((data) => {
      expect(data).toEqual({id: 2, name: 'Araya', email: 'arya@gmail.com'});
    });
});

const checkEmailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

test('check user schema', async () => {
    const user = await fetchUser();

    expect(user).toEqual({
        id: expect.any(Number),
        name: expect.any(String),
        email: expect.stringMatching(checkEmailRegExp)
    });
});

test('check user schema', async () => {
    const user = await fetchUser();

    expect(user).toEqual({
        id: expect.any(Number),
        name: expect.any(String),
        email: expect.stringMatching(checkEmailRegExp)
    });
});

const fakeFetchUserWithError = () => {
    return Promise.reject('Some error');
}

test('promise rejected', async () => {
    return expect(fakeFetchUserWithError()).rejects.toMatch('Some error');
})

test('promise rejected with try/catch', async () => {
    try {
        await fakeFetchUserWithError();
    } catch (err) {
        expect(err).toMatch('Some error');
    }
})
  
  