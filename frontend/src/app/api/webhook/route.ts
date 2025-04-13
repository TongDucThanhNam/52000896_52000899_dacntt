import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        // Lấy API Key từ header Authorization
        const authHeader = req.headers.get('Authorization');

        // Kiểm tra xem header Authorization có tồn tại không
        if (!authHeader) {
            console.error('Không có header Authorization');
            return NextResponse.json(
                { error: 'Unauthorized - Missing API Key' },
                { status: 401 }
            );
        }

        // Kiểm tra định dạng header: "Apikey API_KEY_CUA_BAN"
        const [authType, apiKey] = authHeader.split(' ');

        if (authType !== 'Apikey' || !apiKey) {
            console.error('Định dạng Authorization không hợp lệ');
            return NextResponse.json(
                { error: 'Unauthorized - Invalid Authorization format' },
                { status: 401 }
            );
        }

        // Kiểm tra API Key có hợp lệ không
        const validApiKey = process.env.WEB_HOOK_APIKEY;

        if (apiKey !== validApiKey) {
            console.error('API Key không hợp lệ');
            return NextResponse.json(
                { error: 'Unauthorized - Invalid API Key' },
                { status: 401 }
            );
        }

        // Lấy dữ liệu từ body request
        const body = await req.json();

        // Kiểm tra các trường bắt buộc
        const {
            id,
            gateway,
            transactionDate,
            accountNumber,
            content,
            transferType,
            transferAmount,
            accumulated,
            referenceCode
        } = body;

        if (!id || !transferAmount || !transferType) {
            console.error('Thiếu thông tin giao dịch bắt buộc');
            return NextResponse.json(
                { error: 'Bad Request - Missing required fields' },
                { status: 400 }
            );
        }

        console.log(`Nhận thông báo thanh toán từ SePay: ID=${id}, Amount=${transferAmount}, Type=${transferType}`);

        // Chỉ xử lý giao dịch tiền vào (transferType = "in")
        if (transferType !== 'in') {
            console.log(`Bỏ qua giao dịch không phải tiền vào: ${transferType}`);
            return NextResponse.json(
                { success: true, message: 'Ignored non-incoming transaction' },
                { status: 200 }
            );
        }

        // Trích xuất mã giao dịch từ nội dung chuyển khoản
        // Giả sử mã giao dịch được đặt trong nội dung chuyển khoản theo định dạng "FASHIONAI-XXXXX"
        const transactionIdMatch = content.match(/FASHIONAI-(\w+)/i);

        console.log("Transaction", transactionIdMatch)

        // Kiểm tra trùng lặp giao dịch

        // Xử lý giao dịch

        // Trả về phản hồi thành công theo yêu cầu của SePay
        return NextResponse.json(
            { success: true, message: 'Transaction processed successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Lỗi xử lý webhook:', error);
        // Vẫn trả về thành công để SePay không gửi lại webhook nếu lỗi xảy ra ở phía chúng ta
        return NextResponse.json(
            { success: true, message: 'Error occurred but acknowledged' },
            { status: 200 }
        );
    }
}