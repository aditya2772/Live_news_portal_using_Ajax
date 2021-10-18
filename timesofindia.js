console.log("index.js");

//initialize variable
let source = 'the-times-of-india';
let apiKey = '4b9c22c130c14a5684ad56fde841fd22';
let accordion= document.getElementById('accordion');

//create a ajax get request
const xhr = new XMLHttpRequest();
xhr.open('GET',`https://newsapi.org/v2/top-headlines?sources=${source}&apikey=${apiKey}`, true);

xhr.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        console.log(articles); 
        let newsHtml ="";
        articles.forEach(function (element,index) {
              
            let news = `
                <div class="card">
                <div class="card-header" id="heading${index}">
                    <h5 class="mb-0">
                        <button class="btn btn-link" data-toggle="collapse" data-target="#collapse${index}"
                            aria-expanded="true" aria-controls="collapse${index}">
                            <b>Breaking News ${index+1}:</b> ${element.title}
                        </button>
                    </h5>
                </div>

                <div id="collapse${index}" class="collapse " aria-labelledby="heading${index}" data-parent="#accordion">
                    <div class="card-body">
                        ${element.content}.<a href="${element.url}" target="_blank">Read More</a>
                    </div>
                </div>
                </div>
            `;
            newsHtml += news;
        });
        accordion.innerHTML=newsHtml;

    } else {
        console.log('error occured ');
    }
}

xhr.send();

