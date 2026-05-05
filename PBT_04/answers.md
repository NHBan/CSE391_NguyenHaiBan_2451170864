
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
