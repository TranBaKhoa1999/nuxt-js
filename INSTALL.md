# Hướng Dẫn Cài Đặt

Hướng dẫn chi tiết để cài đặt và chạy dự án Nuxt.js này.

## Yêu Cầu Hệ Thống

- **Node.js**: Phiên bản 18.x trở lên
- **pnpm**: Phiên bản 10.18.3 trở lên (được chỉ định trong `package.json`)
- **Git**: Để clone repository

## Cài Đặt pnpm (Nếu Chưa Có)

Nếu bạn chưa cài đặt pnpm, có thể cài đặt bằng một trong các cách sau:

```bash
# Sử dụng npm
npm install -g pnpm

# Sử dụng Homebrew (macOS)
brew install pnpm

# Sử dụng PowerShell (Windows)
iwr https://get.pnpm.io/install.ps1 -useb | iex
```

## Các Bước Cài Đặt

### 1. Clone Repository

```bash
git clone <repository-url>
cd nuxt-js
```

### 2. Cài Đặt Dependencies

```bash
pnpm install
```

Lệnh này sẽ:

- Cài đặt tất cả các dependencies từ `package.json`
- Tự động chạy `nuxt prepare` sau khi cài đặt (theo `postinstall` script)

### 3. Cấu Hình Environment Variables

Sao chép file `.env.example` thành `.env`:

```bash
# Windows
copy .env.example .env

# Linux/macOS
cp .env.example .env
```

Chỉnh sửa file `.env` với các giá trị phù hợp:

```env
NUXT_PUBLIC_API_BASE_URL=http://localhost:8000
NUXT_PUBLIC_API_PREFIX=api
```

**Giải thích các biến môi trường:**

- `NUXT_PUBLIC_API_BASE_URL`: URL base của API backend (mặc định: `localhost`)
- `NUXT_PUBLIC_API_PREFIX`: Prefix cho các API endpoints (mặc định: `prefix`)

### 4. Chạy Development Server

```bash
pnpm dev
```

Ứng dụng sẽ chạy tại: `http://localhost:3000`

## Các Lệnh Khác

### Build cho Production

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

### Generate Static Site

```bash
pnpm generate
```

## Cấu Trúc Dự Án

```
nuxt-js/
├── assets/          # CSS và các file tĩnh
├── components/      # Vue components
├── composables/     # Reusable logic (useApi, useAuth, etc.)
├── constants/       # Constants và config
├── layouts/         # Layout templates
├── middleware/      # Route middleware
├── pages/           # File-based routing
├── plugins/         # Nuxt plugins
├── server/          # Server API routes
├── types/           # TypeScript types và interfaces
└── utils/           # Utility functions
```

## Công Nghệ Sử Dụng

- **Nuxt 3**: Framework Vue.js
- **Vue 3**: Progressive JavaScript framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS framework
- **Flowbite**: Component library cho Tailwind CSS

## Xử Lý Lỗi Thường Gặp

### Lỗi: pnpm không được tìm thấy

**Giải pháp**: Cài đặt pnpm theo hướng dẫn ở trên.

### Lỗi: Port 3000 đã được sử dụng

**Giải pháp**: Thay đổi port bằng cách thêm vào `.env`:

```env
PORT=3001
```

Hoặc chỉ định port khi chạy:

```bash
pnpm dev --port 3001
```

### Lỗi: API không kết nối được

**Giải pháp**:

- Kiểm tra `NUXT_PUBLIC_API_BASE_URL` trong file `.env`
- Đảm bảo backend API đang chạy
- Kiểm tra CORS settings trên backend

### Lỗi: Module không tìm thấy

**Giải pháp**:

```bash
# Xóa node_modules và cài đặt lại
rm -rf node_modules .nuxt
pnpm install
```

## Lưu Ý

- Dự án sử dụng **pnpm** làm package manager chính, không nên sử dụng npm hoặc yarn
- File `.env` không được commit vào git (đã có trong `.gitignore`)
- Đảm bảo backend API đang chạy trước khi start development server nếu cần test các tính năng liên quan đến API

## Hỗ Trợ

Nếu gặp vấn đề trong quá trình cài đặt, vui lòng:

1. Kiểm tra lại các yêu cầu hệ thống
2. Xem lại các bước cài đặt
3. Kiểm tra log lỗi chi tiết trong terminal
4. Tạo issue trên repository nếu vấn đề vẫn chưa được giải quyết


