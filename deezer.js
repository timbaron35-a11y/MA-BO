const https = require('https');

exports.handler = async function(event) {
  const q = event.queryStringParameters && event.queryStringParameters.q;
  if (!q) return { statusCode: 400, body: 'Missing q' };

  return new Promise((resolve) => {
    const url = `https://api.deezer.com/search?q=${encodeURIComponent(q)}&limit=8`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: data
      }));
    }).on('error', () => resolve({ statusCode: 500, body: JSON.stringify({error:'Deezer unreachable'}) }));
  });
};
