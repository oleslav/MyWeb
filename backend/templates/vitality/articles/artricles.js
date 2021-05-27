function fetchData() {
    const request = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa('Oleslav@gmail.com:Oleslav@gmail.com')
        }
    };

    fetch('http://127.0.0.1:5000/articles', request)
        .then(response => {
            if (!response.ok) {
                throw Error("ERROR");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            let text = '';
            for (let i = 0; i < data['articles'].length; i++) {
                var number = Math.floor(Math.random() * 3);
                let style;
                switch (number) {
                    case 0:
                        number = Math.floor(Math.random() * 3) + 1;
                        style = "identity";
                        break;
                    case 1:
                        number = Math.floor(Math.random() * 4) + 1;
                        style = "web";
                        break;
                    case 2:
                        number = Math.floor(Math.random() * 5) + 1;
                        style = "graphic";
                        break;
                }
                text += `
                    <a href="../article/article.html">
                        <div class="portfolio ${style} mix_all" data-cat="${style}" href="#portfolioModal4" data-toggle="modal" style="display: inline-block;  opacity: 1;">
                            <div class="portfolio-wrapper">
                                <img src="../assets/img/portfolio/grid/${style}/${number}.jpg" alt="">
                                <div class="caption">
                                    <div class="caption-text">
                                        <a class="text-title">${data['articles'][i].name}</a>
                                        <span class="text-category">Brand Identity</span>
                                    </div>
                                    <div class="caption-bg"></div>
                                </div>
                            </div>
                        </div>
                    </a>`;
            }

            document
                .querySelector('#portfoliolist')
                .insertAdjacentHTML('afterbegin', text)
        })
        .catch(error => {
            console.log(error);
        })
}

fetchData();