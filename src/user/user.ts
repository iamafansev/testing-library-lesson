const userStub = {id: 2, name: 'Araya', email: 'arya@gmail.com'};

export const fetchUser = () => {
    return new Promise<typeof userStub>((res) => {
        setTimeout(res, 200, userStub);
    })
};