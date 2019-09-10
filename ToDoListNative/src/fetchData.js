fetchData = async (endpoint, method, headerType, body) => {
    const baseUrl = 'http://localhost:8000/';
    const url = baseUrl+endpoint;
    let header = {};

    if (headerType.toLowerCase() === 'application/json') {
        header = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    }
    try {
        let response = await fetch(url, {
            method: method,
            headers: header,
            body: body
        })
            .then(response => response.json());
        return response
    }
    catch (err) {
        console.log('new error: ', err)
    }
}

export default fetchData;