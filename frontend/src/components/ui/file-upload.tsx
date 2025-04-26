import React, {useState} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

interface FileUploadProps {
    imageUrls: string[],
    productAttributes: any,
    setProductAttributes: React.Dispatch<React.SetStateAction<any>>;
}

export const FileUpload = (
    {
        imageUrls,
        productAttributes,
        setProductAttributes,
    }: FileUploadProps
) => {
    const [uploadedImages, setUploadedImages] = useState<string[]>(imageUrls)
    const [imageUrl, setImageUrl] = useState('')


    return (
        <div className="w-full">
            <Card className="overflow-hidden  mx-auto">
                <CardHeader className="text-center">
                    <CardTitle>Ảnh sản phẩm</CardTitle>
                    <CardDescription>
                        Nhập các ảnh sản phẩm, sử dụng imageURL hoặc tải lên từ máy.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-1/2">
                            <Image
                                unoptimized={true}
                                alt="Main product image"
                                className="aspect-square w-full rounded-md object-cover"
                                height={400}
                                src={uploadedImages[0] ?? "https://placehold.co/400x400"}
                                width={400}
                            />
                            <div className="grid grid-cols-3 gap-2 mt-4">
                                {uploadedImages.slice(1, 4).map((img, index) => (
                                    <button key={index}
                                            className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md">
                                        <Image
                                            unoptimized={true}
                                            alt={`Product image ${index + 1}`}
                                            className="aspect-square w-full rounded-md object-cover"
                                            height={84}
                                            src={img}
                                            width={84}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            {/*<UploadDropzone*/}
                            {/*    appearance={{*/}
                            {/*        button:*/}
                            {/*            "shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-md text-white font-light transition duration-200 ease-linear ut-ready:bg-green-500 ut-uploading:cursor-not-allowed  after:bg-orange-400",*/}
                            {/*        container: "p-4 flex-row rounded-md border-sky-400 ",*/}
                            {/*        allowedContent:*/}
                            {/*            "flex h-8 flex-col items-center justify-center px-2 text-white",*/}
                            {/*    }}*/}
                            {/*    content={{*/}
                            {/*        button({ ready }) {*/}
                            {/*            if (ready) return <div>Tải ảnh sản phẩm</div>;*/}

                            {/*            return "Đang upload...";*/}
                            {/*        },*/}
                            {/*    }}*/}
                            {/*    endpoint="imageUploader"*/}
                            {/*    onClientUploadComplete={(res: any) => {*/}
                            {/*        // Do something with the response*/}
                            {/*        console.log("Files: ", res);*/}
                            {/*        alert("Upload Completed");*/}
                            {/*        //add to uploadedImages*/}

                            {/*        setProductAttributes({*/}
                            {/*            ...productAttributes,*/}
                            {/*            imageUrls: [...uploadedImages, ...res.map((img: any) => img.url)]*/}
                            {/*        })*/}
                            {/*        setUploadedImages((prevImages) => [...prevImages, ...res.map((img: any) => img.url)]);*/}
                            {/*    }}*/}
                            {/*    onUploadError={(error: Error) => {*/}
                            {/*        alert(`ERROR! ${error.message}`);*/}
                            {/*    }}*/}
                            {/*    onUploadBegin={(name) => {*/}
                            {/*        // Do something once upload begins*/}
                            {/*        console.log("Uploading: ", name);*/}
                            {/*    }}*/}
                            {/*    onDrop={(acceptedFiles) => {*/}
                            {/*        // Do something with the accepted files*/}
                            {/*        console.log("Accepted files: ", acceptedFiles);*/}
                            {/*    }}*/}
                            {/*/>*/}

                            <div className="mb-6">
                                <p className="w-full text-center my-4 text-gray-500">Hoặc</p>

                                <div className="flex gap-2">
                                    <Input
                                        type="url"
                                        placeholder="Nhập đường dẫn ảnh"
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                        className="flex-grow"
                                    />
                                    <Button onClick={
                                        () => {
                                            setProductAttributes({
                                                ...productAttributes,
                                                imageUrls: [...uploadedImages, imageUrl]
                                            })
                                            setUploadedImages((prevImages) => [...prevImages, imageUrl]);
                                            setImageUrl('');
                                        }
                                    }>
                                        Thêm
                                    </Button>
                                </div>
                            </div>
                            <div className="mt-6">
                                <h4 className="font-semibold mb-2">Ảnh đã tải lên:</h4>
                                <ul className="h-48 space-y-2 overflow-y-scroll">
                                    {uploadedImages.map((img, index) => (
                                        <li key={index}
                                            className="text-sm text-gray-600 truncate bg-gray-100 p-2 rounded-md">
                                            <div className={"flex flex-row justify-between items-center"}>
                                                <a
                                                    href={img}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:underline flex items-center"
                                                >
                                                    <Image
                                                        unoptimized={true}
                                                        src={img}
                                                        alt={`Thumbnail ${index + 1}`}
                                                        width={40}
                                                        height={40}
                                                        className="mr-2 rounded-sm object-cover"
                                                    />
                                                    <span className="flex-grow w-[300px] truncate ">{img}</span>
                                                </a>
                                                <Button size="sm"
                                                        onClick={() => {
                                                            setProductAttributes({
                                                                ...productAttributes,
                                                                imageUrls: uploadedImages.filter((_, i) => i !== index)
                                                            })
                                                            setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));
                                                        }}
                                                        variant="destructive"
                                                >
                                                    Xóa
                                                </Button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};