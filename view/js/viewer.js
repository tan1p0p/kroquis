let app_data, interval_object
let image_i = 1;

main_img = document.getElementById('main_img');

function changeImage(i) {
  main_img.setAttribute('src', app_data.img_files[i]);
}

function startChangeImage() {
  changeImage(image_i)
  image_i++
  if (image_i == app_data.image_num) {clearInterval(interval_object)}
}

(async () => {
  app_data = await window.api.get('app_data')
  changeImage(0)
  interval_object = setInterval(startChangeImage, app_data.interval * 1000);
})()