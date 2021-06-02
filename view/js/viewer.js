let app_data, interval_object
let image_count = 0;

main_img = document.getElementById('main_img');

function flipImage() {
  h_scale = app_data.flip_h ? -1 : 1
  v_scale = app_data.flip_v ? -1 : 1
  h_rand = app_data.flip_h_rand ? Math.random() - 0.5 : 1
  v_rand = app_data.flip_v_rand ? Math.random() - 0.5 : 1

  h_scale *= h_rand
  v_scale *= v_rand
  if (h_scale < 0 & v_scale < 0) {
    main_img.setAttribute('class', 'flip-both');
  } else if (h_scale >= 0 & v_scale < 0) {
    main_img.setAttribute('class', 'flip-vertical');
  } else if (h_scale < 0 & v_scale >= 0) {
    main_img.setAttribute('class', 'flip-horizontal');
  }
}

function changeImage(i) {
  main_img.setAttribute('src', app_data.img_files[i]);
}

function startChangeImage() {
  flipImage()
  changeImage(image_count)
  image_count++
  if (image_count == app_data.image_num) {
    clearInterval(interval_object)
  }
}

(async () => {
  app_data = await window.api.get('app_data')
  changeImage(0)
  image_count++
  interval_object = setInterval(startChangeImage, app_data.interval * 1000);
})()