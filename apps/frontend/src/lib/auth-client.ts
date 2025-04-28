import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,

	plugins: [inferAdditionalFields({
		user: {
			role: {
				type: "string",
				required: false,
				defaultValue: "user",
				input: false, // không cho phép người dùng đặt vai trò
			},
			phone: {
				type: "string",
				required: false, // Đặt thành true nếu bắt buộc
				input: true,
			},
			height: {
				type: "number",
				required: false,
				input: true,
			},
			weight: {
				type: "number",
				required: false,
				input: true,
			},
			dateOfBirth: {
				type: "string", // Giả sử ngày sinh được lưu dưới dạng chuỗi
				required: false,
				input: true,
			},
			address: {
				type: "string",
				required: false,
				input: true,
			},
			imageUrl: {
				type: "string",
				required: false,
				input: true,
			},
			gender: {
				type: "string",
				required: false,
				input: true,
			},
			job: {
				type: "string",
				required: false,
				input: true,
			},
			city: {
				type: "string",
				required: false,
				input: true,
			},
		}
	})],
});
