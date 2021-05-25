function fetchData() {
    authorization = "Basic " + btoa("Oleslav@gmail.com:Oleslav@gmail.com");

    // JSON.parse(localStorage.getItem("token"))['access']

    fetch('http://127.0.0.1:5000/articles/4',
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: authorization
            }})
        .then(response => {
            if (!response.ok) {
                throw Error("ERROR");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            const title = `${data['article'][0].name}`;
            const text = `${data['article'][0].text}`;

            document
                .querySelector('#title')
                .insertAdjacentHTML('afterbegin', title)

            document
                .querySelector('#text')
                .insertAdjacentHTML('afterbegin', text)


        })
        .catch(error => {
            console.log(error);
        })
}

fetchData();