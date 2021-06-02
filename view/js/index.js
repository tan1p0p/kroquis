// file selector func
const fileInput = document.getElementById('fileInput');
const imgFiles = []
const handleFileSelect = () => {
  const files = fileInput.files;
  for (let i = 0; i < files.length; i++) {
    imgFiles.push(files[i].path)
  }
  console.log(imgFiles);
}
fileInput.addEventListener('change', handleFileSelect);

// start_button func
const startButton = document.getElementById('startButton');
startButton.addEventListener('click', (event) => {
  window.api.send('img_files', imgFiles)
});