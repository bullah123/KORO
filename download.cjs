const https = require('https');
const fs = require('fs');
const path = require('path');

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        // Handle redirects
        return downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
      }
      const file = fs.createWriteStream(filepath);
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
      file.on('error', (err) => {
        fs.unlink(filepath, () => reject(err));
      });
    }).on('error', reject);
  });
};

const images = {
  "chocolate-crunch.jpg": "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?auto=format&fit=crop&w=600&q=80",
  "cookies-supreme.jpg": "https://images.unsplash.com/photo-1550505095-81378a675071?auto=format&fit=crop&w=600&q=80"
};

async function run() {
  for (const [name, url] of Object.entries(images)) {
    const p = path.join(__dirname, 'public', 'assets', 'drinks', name);
    console.log(`Downloading ${name}...`);
    try {
      await downloadImage(url, p);
      console.log(`Successfully downloaded ${name}`);
    } catch (e) {
      console.error(`Error downloading ${name}:`, e.message);
    }
  }
}

run();
