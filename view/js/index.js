// util
function isImage(filename) {
  const ext = filename.substring(filename.lastIndexOf('.') + 1);
  if (['png', 'jpeg', 'jpg'].includes(ext)) {
    return true
  } else {
    return false
  }
}

// file selector func
const file_input = document.getElementById('file_input');
const img_files = []
const handleFileSelect = () => {
  const files = file_input.files;
  for (const f of files) {
    if (isImage(f.path)) {
      img_files.push(f.path)
    }
  }
}
file_input.addEventListener('change', handleFileSelect);


function getInterval() {
  radio_buttons = document.getElementsByName('interval')
  for (const r of radio_buttons) {
    if (r.checked) {
      return r.value
    }
  }
}

function getImageNum() {
  return document.getElementById('image_num').value
}

function getFlip(axis) {
  return document.getElementById(`flip_${axis}`).checked
}

function getFlipRandomize(axis) {
  return document.getElementById(`flip_${axis}_rand`).checked
}

// start_button func
const start_button = document.getElementById('start_button');
start_button.addEventListener('click', () => {

  window.api.send('app_data', {
    'img_files': img_files,
    'image_num': getImageNum(),
    'interval': getInterval(),
    'flip_h': getFlip('h'),
    'flip_h_rand': getFlipRandomize('h'),
    'flip_v': getFlip('v'),
    'flip_v_rand': getFlipRandomize('v'),
  })
});