//const classinateUrl = 'https://rccptdhzsa.execute-api.us-east-1.amazonaws.com/prod/bigfootClassinator';

const instance = axios.create({
  baseURL: 'https://ml.nexosis.com/v1/',
  timeout: 1000,
  headers: {'api-key': ''}
});

const classinateUrl ='https://ml.nexosis.com/v1/models/6dc983e1-1b23-462d-b9a5-74661c54fb71/predict'
const classMessages = {
    'Marty': 'Marty!',
    'Doc': 'Doc!',
};

const waitMessage = "Analyzing your quote...";
const errorMessage = "There was an error processing your quote =(.";

var length = function(quote){
    for (i = 0; i <= quote.length; i++){
        ;
    }
    return i;
}

var punctuation = function(quote){
    var punctuation = 0;
    for (i = 0; i < quote.length; i++){
        if(quote[i] != '"' && quote[i] === '!' || quote[i] === '?' || quote[i] ==='...'){
            punctuation++;
        }; 
    }
    return punctuation;
}

var caps = function(quote){
    var caps = 0;
    for (i = 0; i < quote.length; i++){
            if(quote[i] === quote[i].toUpperCase()){
                caps++;
            }
    }
    return caps;
}

var longestWord = function(quote){
    var words = quote.split(" ")
    var longest = 0;
    for (var i= 0; i < words.length; i++){
        if(words[i].length > longest)
            longest = words[i].length
    }
    return longest;
}
quoteText = "Hello Doc!"
var app = new Vue({
    el: '#app',
    data: {
        quoteText: '',
        length: length(quoteText),
        punctuation: punctuation(quoteText),
        longestWord: longestWord(quoteText),
        caps: caps(quoteText),
        classination: ''
    },
    methods: {
        classinate: function(quote) {
            this.classination = waitMessage;
            var data = {
                quoteText: this.quoteText,
                length,
                punctuation,
                longestWord,
                caps 
            };
            axios.post(classinateUrl, data)
                .then(response => {
                    var reportClass = response.data.reportClass;
                    this.classination = classMessages[reportClass];
                })
                .catch(error => {
                    console.log(error);
                    this.classination = errorMessage;
                });
        }
    }
});
