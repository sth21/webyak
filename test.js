const fs = require('fs');
const path = require('path');

try {
  // Define the directory path
  const directoryPath = path.join(__dirname, "server/controllers/authentication", "/../../cryptography");

  // Read the contents of the directory synchronously
  const directoryContents = fs.readdirSync(directoryPath);

  // Log the contents to the console
  console.log('Contents of the directory:');
  directoryContents.forEach(item => {
    console.log(item);
  });
} catch (error) {
  console.error('Error reading directory:', error);
}