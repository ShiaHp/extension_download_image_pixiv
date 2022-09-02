# Project Extension download pixiv

## Dự án này là gì?

_Đây là một pet project để học hỏi, cải thiện và vọc vạch những kiến thức đã học_

## Ý tưởng :

- Đây là project được truyền cảm hứng và tham khảo từ extension PixivBatchDownloader
- Vốn ban đầu mình có ý tưởng làm pj này khi lướt nghe nhạc trên youtobe thì thấy những ảnh nền video có link
  từ pixiv. Cảm thấy việc phải click từng cái link rồi vào thẳng web rất là mệt mỏi nên mình đã thử viết 1 cái extension
- Sau khi tu xong khóa học cấp tốc extenison thì mình bắt tay vào viết luôn và đã đạt được mục đích ban đầu tuy nhiên lại không hài lòng lắm. https://github.com/ShiaHp/extension_download_pixiv
- Thời điểm đó mình có sử dụng extension PixivBatchDownloader và rất ưng ý vì sự tiện lợi của nó, cảm thấy mình có thể viết 1 cái tương tự nên đã bắt đầu viết lại bằng typesciprt và react

## Những gì đã học được khi thực hiện dự án này :

- Biết hơn và viết được Regex, cách hoạt động của 1 extension
- Cải thiện kỹ năng code với Javasciprt và typescript
- Cải thiện cách viết code
- Tăng trình sử dụng kĩ năng tra google với stackoverflow :V (đùa chút)

## Những chức năng chính của dự án :

- Tải ảnh khi nhấn vào nút trên ảnh ( lưu ý phải hover vào ảnh trước dù nút tải nằm trong ảnh rồi):
  ![alt text](https://github.com/ShiaHp/extension_download_image_pixiv/blob/main/src/img/icon.png)

- Tải nhiều ảnh một lúc khi lựa chọn những bức ảnh mong muốn tải và nhấn vào nút "Download all" bên phải màn hình
  ![alt text](https://github.com/ShiaHp/extension_download_image_pixiv/blob/main/src/img/img2.png)
- Tải tất cả ảnh của 1 tác giả bất kỳ
- Tải tất cả ảnh từ bookmarks của người dùng
  ![alt text](https://github.com/ShiaHp/extension_download_image_pixiv/blob/main/src/img/img3.png)
- Tải ảnh từ link ở bất cứ nguồn nào như : youtobe,facebook,
  ![alt text](https://github.com/ShiaHp/extension_download_pixiv/blob/main/img/1.png)
  ![alt text](https://github.com/ShiaHp/extension_download_pixiv/blob/main/img/4.png)



## Để chạy dự án :
 - Bạn cần cài đặt môi trường node. Khuyến khích sử dụng node version 16 vì hiện tại đang có lỗi với v18
 - Sau khi git clone về thì bạn hãy chạy dòng lệnh :  `npm i` 
 - Tiếp đến là : `npm start` để khởi chạy chương trình
 - Sau khi khởi chạy thì chương trình sẽ build ra file `dist`. Lúc này bạn hãy `Load unpacked` trên môi trường phát triển exension chrome để sử dụng
