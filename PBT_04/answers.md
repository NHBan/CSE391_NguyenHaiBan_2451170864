
| Position  |  Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí                 | Cuộn theo trang? | Use case phổ biến |
| static    | Có                         | Không dùng                        | Có               | Bố cục mặc định. |
| relative  | Có                         | Vị trí gốc của nó                 | Có               | Làm anchor cho absolute con, dịch nhẹ |
| absolute  | Không                      | Vị trí relative gần nhất          | Có               | Popup, icon đè lên ản. |
| fixed     | Không                      | Viewport                          | Không            | cookie banner, header cố định |
| sticky    | Có                         | Viewport (Khi dính)               | Có               | Tiêu đề bảng, thanh menu dính |
Câu hỏi thêm: Khi nào absolute tham chiếu body? Khi nào tham chiếu parent? Giải thích khái niệm "nearest positioned ancestor".
1 absolute tham chiếu đến body khi trên nó không có position khác static
2 absolute tham chiếu parent khi cha của nó có kiểu position khác static
3 "nearest positioned ancestor": là quy tắc để xác định absolute sẽ lấy mốc tọa độ từ đâu để hiển thị
Câu A2:
/* Trường hợp 1 */
.container { display: flex; }
.item { flex: 1; }
/* 4 items → Bố cục = 1 hàng 4 cột mỗi item chiếm 25% do thuộc tính flex:1 chia đều không gian cho các item */
+---------------------------------------------------------+
| +----------+  +----------+  +----------+  +----------+  |
| |  Item 1  |  |  Item 2  |  |  Item 3  |  |  Item 4  |  |
| +----------+  +----------+  +----------+  +----------+  |
+---------------------------------------------------------+

/* Trường hợp 2 */
.container { display: flex; flex-wrap: wrap; }
.item { width: 45%; margin: 2.5%; }
/* 6 items → Bố cục = 3 hàng 2 cột do cộng chiều rộng và 2 bên margin:45%+5%=50% nên chỉ được 2 cột 1 hàng và do flex-wrap có thể xuống dòng */
+-------------------------------------------------+
|  +--------------------+  +--------------------+ |
|  |       Item 1       |  |       Item 2       | |
|  +--------------------+  +--------------------+ |
|                                                 |
|  +--------------------+  +--------------------+ |
|  |       Item 3       |  |       Item 4       | |
|  +--------------------+  +--------------------+ |
|                                                 |
|  +--------------------+  +--------------------+ |
|  |       Item 5       |  |       Item 6       | |
|  +--------------------+  +--------------------+ |
+-------------------------------------------------+

/* Trường hợp 3 */
.container { display: flex; justify-content: space-between; align-items: center; }
/* 3 items → Bố cục = 1 hàng 3 cột các item 1 và 3 đứng sát 2 lề và item 2 nằm chính giữa, cả 3 item được căn giữa theo chiều dọc */
+-----------------------------------------------------------------+
|                                                                 |
|  +--------+                +--------+               +--------+  |
|  | Item 1 |                | Item 2 |               | Item 3 |  |
|  +--------+                +--------+               +--------+  |
|                                                                 |
+-----------------------------------------------------------------+
/* Trường hợp 4 */
.container { display: grid; grid-template-columns: 200px 1fr 200px; gap: 20px; }
/* 3 items → Bố cục = 1 hàng và 3 cột, item 1 và 3 có width =200px item 2 co giản lấp đầy khoảng trống còn lại, các item cách nhau 20px */
+---------------------------------------------------------+
| +--------+  +-------------------------------+  +--------+ |
| | 200px  |  |              1fr              |  | 200px  | |
| | Item 1 |  |             Item 2            |  | Item 3 | |
| +--------+  +-------------------------------+  +--------+ |
+---------------------------------------------------------+

/* Trường hợp 5 */
.container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
/* 7 items → Bố cục = 3 hàng và 3 cột , mỗi hàng có độ rộng của các item bẳng nhau và cách nhau 10px, item cuối cùng nằm ở hàng thứ 3 */
+---------------------------------------------------------+
| +--------------+   +--------------+   +--------------+  |
| |    Item 1    |   |    Item 2    |   |    Item 3    |  |
| +--------------+   +--------------+   +--------------+  |
|                                                         |
| +--------------+   +--------------+   +--------------+  |
| |    Item 4    |   |    Item 5    |   |    Item 6    |  |
| +--------------+   +--------------+   +--------------+  |
|                                                         |
| +--------------+                                        |
| |    Item 7    |                                        |
| +--------------+                                        |
+---------------------------------------------------------+