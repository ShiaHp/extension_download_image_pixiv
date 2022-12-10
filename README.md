# Project Extension download pixiv

## Dự án này là gì?

_Đây là một pet project để học hỏi, cải thiện và vọc vạch những kiến thức đã học_

## Ý tưởng :

- Đây là project được truyền cảm hứng và tham khảo từ extension PixivBatchDownloader
- Vốn ban đầu mình có ý tưởng làm pj này khi lướt nghe nhạc trên youtobe thì thấy những ảnh nền video có link
  từ pixiv. Cảm thấy việc phải click từng cái link rồi vào thẳng web rồi tải tay từng cái rất là mệt mỏi nên mình đã thử viết 1 cái extension

## Những gì đã học được khi thực hiện dự án này :

- Cải thiện kỹ năng code với Javasciprt và typescript
- Tăng trình sử dụng kĩ năng tra google với stackoverflow :V (đùa chút)

## Những chức năng chính của dự án :

- Tải ảnh khi nhấn vào nút trên ảnh ( lưu ý phải hover vào ảnh trước dù nút tải nằm trong ảnh rồi):
  
  ![ezgif com-gif-maker](https://user-images.githubusercontent.com/88889182/188258459-801c4ff6-dd80-4d95-82a2-e8ed24b2e5ef.gif)

- Tải nhiều ảnh một lúc khi lựa chọn những bức ảnh mong muốn tải và nhấn vào nút "Download all" bên phải màn hình

    ![ezgif com-gif-maker (2)](https://user-images.githubusercontent.com/88889182/188258468-e324c2d6-66ec-435b-8378-5b8a98522a6d.gif)

- Tải tất cả ảnh của 1 tác giả bất kỳ
- Tải tất cả ảnh từ bookmarks của người dùng

  ![ezgif com-gif-maker (3)](https://user-images.githubusercontent.com/88889182/188258662-56a1fbe1-8f2a-42cb-af1a-2cefb5ec6ec1.gif)

  
- Tải ảnh từ link ở bất cứ nguồn nào như : youtobe,facebook,
  
  ![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/88889182/188258474-582f23db-8537-41ec-9564-5f29c079133f.gif)

## Bug:
- Không hiểu tự dưng lòi ra cái bug hiện dialog lúc batch download nhưng có vẻ lỗi bên api của Chrome nên giờ chủ tus cũng bó tay @@
## Để chạy dự án :
 - Bạn cần cài đặt môi trường node. Khuyến khích sử dụng node version 16 vì hiện tại đang có lỗi với v18
 - Sau khi git clone về thì bạn hãy chạy dòng lệnh :  `npm i` 
 - Tiếp đến là : `npm start` để khởi chạy chương trình
 - Sau khi khởi chạy thì chương trình sẽ build ra file `dist`. Lúc này bạn hãy `Load unpacked` trên môi trường phát triển exension chrome để sử dụng
