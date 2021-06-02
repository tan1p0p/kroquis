(async ()=>{
  const imgFiles = await window.api.get('img_files')
  mainImg = document.getElementById('mainImg')
  mainImg.setAttribute('src', imgFiles[0]);
})()