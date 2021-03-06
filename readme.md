## Template for [fan-stack](https://github.com/ClassFunc/fan-stack)

## How to use:

1. Mở terminal
2. Copy đường dẫn tới thư mục project này
3. `npx create-react-app [tên dự án] --template file:[đường dẫn vừa copy]`
4. Điền thông tin setting firebase vào file `firebase/clientApp.js`.

Nếu dự án cho trang admin:

- Chỉnh sửa `NEXT_PUBLIC_ADMIN_PAGE=true` và điền thông tin vào `firebase/nodeApp_service_account.json`.

5. Run `next dev` để bắt đầu dự án.
