import BreadcumbComponent from "@/components/products/BreadcumbComponent";
import {breadcrumbPages} from "@/config/site";

export default function IntroducePage() {
    return (
        <main>
            <div className={"flex flex-col items-center mt-20"}>
                <div className={"w-3/4"}>
                    <BreadcumbComponent breadcrumbPages={breadcrumbPages}/>
                </div>
            </div>
        </main>
    )
}