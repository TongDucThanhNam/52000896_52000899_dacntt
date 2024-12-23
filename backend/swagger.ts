require("dotenv").config();

// const options = {
//     openapi: true,     // Enable/Disable OpenAPI.                        By default is null
//     language: 'en-US',     // Change response language.                      By default is 'en-US'
//     disableLogs: true,       // Enable/Disable logs.                           By default is false
//     autoHeaders: true,        // Enable/Disable automatic headers recognition.  By default is true
//     autoQuery: true,        // Enable/Disable automatic query recognition.    By default is true
//     autoBody: true,        // Enable/Disable automatic body recognition.     By default is true
//     writeOutputFile: true         // Enable/Disable writing the output file.        By default is true
// };
import swaggerAutogen from 'swagger-autogen';

const outputFile = "./swagger_output.json";
const endpointsFiles = ['./Api/Routes/*.ts'];
// const endpointsFiles = ['./index.ts'];

// const doc = {
//     info: {
//         verson: "1.0.0",
//         title: 'fashionAI API',
//         description: 'API documentation for fashionAI',
//     },
//     host: `${process.env.HOST}:${process.env.PORT}/api`,
//     basePath: '/',
//     schemes: ['http'],
//     consumes: ['application/json'],
//     produces: ['application/json'],
//     tags: [
//     ],
//     definitions: {
//     }
// };

const doc = {
    info: {
        version: "1.0.0", // Phiên bản API [1]
        title: 'fashionAI API', // Tên API [1]
        description: 'API documentation for fashionAI', // Mô tả API [1]
    },
    host: `${process.env.HOST}:${process.env.PORT}/api`, // Địa chỉ host API [1]
    basePath: '/', // Đường dẫn cơ sở [1]
    schemes: ['http'], // Giao thức [1]
    consumes: ['application/json'], // Kiểu dữ liệu API tiêu thụ [1]
    produces: ['application/json'], // Kiểu dữ liệu API tạo ra [1]
    tags: [
        {
            name: 'Users', // Tên tag [1]
            description: 'Các endpoints liên quan đến người dùng' // Mô tả tag [1]
        },
        {
            name: 'Carts', // Tên tag [1]
            description: 'Các endpoints liên quan đến giỏ hàng' // Mô tả tag [1]
        },
        {
            name: 'Products', // Tên tag [1]
            description: 'Các endpoints liên quan đến sản phẩm' // Mô tả tag [1]
        },
        {
            name: 'Interactions', // Tên tag [1]
            description: 'Các endpoints liên quan đến tương tác' // Mô tả tag [1]
        },
        {
            name: 'Transactions', // Tên tag [1]
            description: 'Các endpoints liên quan đến mua hàng' // Mô tả tag [1]
        },
    ], // Danh sách tags, mỗi tag mô tả một nhóm endpoints [1]
    securityDefinitions: {
        // apiKeyAuth: { // Định nghĩa API Key [2]
        //   type: 'apiKey', // Loại xác thực [2]
        //   in: 'header', // Vị trí của API Key [2]
        //   name: 'X-API-KEY', // Tên header chứa API Key [2]
        //   description: 'Some description...' // Mô tả [2]
        // },
        // OAuth2: { // Định nghĩa OAuth2 [3]
        //   type: 'oauth2', // Loại xác thực [3]
        //   flows: { // Luồng xác thực [3]
        //     authorizationCode: { // Loại luồng [3]
        //       authorizationUrl: 'https://example.com/oauth/authorize', // URL xác thực [3]
        //       tokenUrl: 'https://example.com/oauth/token', // URL lấy token [3]
        //       scopes: { // Phạm vi truy cập [3]
        //         read: 'Grants read access', // Mô tả phạm vi [3]
        //         write: 'Grants write access', // Mô tả phạm vi [3]
        //         admin: 'Grants access to admin operations' // Mô tả phạm vi [3]
        //       }
        //     }
        //   }
        // },
        // bearerAuth: { // Định nghĩa Bearer Auth [4]
        //   type: 'http', // Loại xác thực [4]
        //   scheme: 'bearer' // Loại lược đồ [4]
        // }
    }, // Định nghĩa cách thức xác thực API [1]
    definitions: {}, // Định nghĩa các mô hình dữ liệu [1]
    components: {
        // schemas: {}, // Định nghĩa schemas cho OpenAPI 3.x [6]
        // examples: {}, // Định nghĩa examples cho OpenAPI 3.x [7]
        // securitySchemes: {} // Định nghĩa cách thức xác thực cho OpenAPI 3.x [6]
    } // Các thành phần bổ sung cho OpenAPI 3.x [8]
};

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
    console.log('Swagger documentation generated successfully');
});
