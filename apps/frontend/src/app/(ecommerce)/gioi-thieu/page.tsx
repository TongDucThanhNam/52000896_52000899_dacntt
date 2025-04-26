import BreadcumbComponent from "@/components/products/BreadcumbComponent";
import {breadcrumbPages} from "@/config/site";

export default function IntroducePage() {
    return (
        <main>
            <div className={"flex flex-col items-center mt-20"}>
                <div className={"w-3/4"}>
                    <BreadcumbComponent breadcrumbPages={breadcrumbPages}/>

                    <p>
                        Chào mừng bạn đến với trang web của chúng tôi.
                    </p>
                    <p>
                        Chúc bạn có những trải nghiệm tuyệt vời khi mua sắm.
                    </p>
                </div>
            </div>
        </main>
    )
}