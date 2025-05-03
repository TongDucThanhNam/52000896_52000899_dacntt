import BreadcumbComponent from "@/components/products/BreadcumbComponent";
import { breadcrumbPages } from "@/config/site";

export default function IntroducePage() {
    return (
        <main>
            <div className={"flex flex-col items-center mt-20"}>
                <div className={"w-3/4"}>
                    <BreadcumbComponent breadcrumbPages={breadcrumbPages} />
                    <div className="space-y-8">
                        <section className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold mb-4">Thông tin cửa hàng</h2>
                            <p className="text-gray-700">
                                Chúng tôi là cửa hàng thương mại điện tử chuyên cung cấp các sản phẩm chất lượng cao với giá cả hợp lý.
                            </p>
                        </section>

                        <section className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold mb-4">Lịch sử hình thành</h2>
                            <p className="text-gray-700">
                                Được thành lập từ năm 2020, chúng tôi đã không ngừng phát triển và mang đến cho khách hàng những trải nghiệm mua sắm tốt nhất.
                            </p>
                        </section>

                        <section className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold mb-4">Tầm nhìn sứ mệnh</h2>
                            <p className="text-gray-700">
                                Sứ mệnh của chúng tôi là mang lại sự hài lòng tuyệt đối cho khách hàng thông qua chất lượng sản phẩm và dịch vụ.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    )
}