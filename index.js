const https = require('https');

function callAPI(pageNumber) {
    var options = {
      hostname: 'jsonmock.hackerrank.com',
      port: 443,
      path: '/api/countries?page=' + pageNumber,
      method: 'GET',
    };
  
    return new Promise((resolve, reject) => {
      console.log('pageNumber ' + pageNumber);
  
      const req = https.request(options, (resp) => {
        let data = '';
  
        // Un fragmento de datos ha sido recibido.
        resp.on('data', (chunk) => {
          data = data + chunk;
        });
  
        // Toda la respuesta ha sido recibida. Imprimir el resultado.
        resp.on('end', () => {
          const countries = JSON.parse(data);
          resolve(countries);
        });
      });
  
      req.on('error', (error) => {
        reject(error);
      });
  
      req.end();
    });
}

async function main(countryCode) {
    for(let i = 1; i <= 25; i++){
       let res = await callAPI(i)
       countries = res.data
       const selectedCountry = countries.filter(country => {
            return country.alpha2Code == countryCode
        })
        if(selectedCountry.length > 0){
            console.log('selected country',selectedCountry[0].name)
            break
        }
        else {
            continue
        }
    }
}

main('IM')

//cual es el país ?

