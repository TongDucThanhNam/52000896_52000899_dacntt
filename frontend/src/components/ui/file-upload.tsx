import {cn} from "@/lib/utils";
import React, {useRef, useState} from "react";
import {motion} from "framer-motion";
import {IconUpload} from "@tabler/icons-react";
import {useDropzone} from "react-dropzone";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

const mainVariant = {
    initial: {
        x: 0,
        y: 0,
    },
    animate: {
        x: 20,
        y: -20,
        opacity: 0.9,
    },
};

const secondaryVariant = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
};

export const FileUpload = ({
                               onChange,
                           }: {
    onChange?: (files: File[]) => void;
}) => {
    const [files, setFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (newFiles: File[]) => {
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
        onChange && onChange(newFiles);
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const {getRootProps, isDragActive} = useDropzone({
        multiple: false,
        noClick: true,
        onDrop: handleFileChange,
        onDropRejected: (error) => {
            console.log(error);
        },
    });

    const [mainImage, setMainImage] = useState('https://placehold.co/400x400')
    const [uploadedImages, setUploadedImages] = useState<string[]>([
        'https://placehold.co/400x400',
        'https://placehold.co/400x400',
        'https://placehold.co/400x400',
        'https://placehold.co/400x400',
        'https://placehold.co/400x400',
        'https://placehold.co/400x400',
        'https://placehold.co/400x400',
        'https://placehold.co/400x400',
        'https://placehold.co/400x400',


    ])
    const [imageUrl, setImageUrl] = useState('')
    const handleFileUpload = (files: File[]) => {
        setFiles(files);
        console.log(files);
    };

    function handleUrlSubmit() {

    }

    return (
        <div className="w-full" {...getRootProps()}>
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
                                src={mainImage}
                                width={400}
                            />
                            <div className="grid grid-cols-3 gap-2 mt-4">
                                {uploadedImages.slice(0, 3).map((img, index) => (
                                    <button key={index} onClick={() => setMainImage(img)}
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
                            <form onSubmit={handleUrlSubmit} className="mb-6">
                                <motion.div
                                    onClick={handleClick}
                                    whileHover="animate"
                                    className="p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
                                >
                                    <input
                                        ref={fileInputRef}
                                        id="file-upload-handle"
                                        type="file"
                                        onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
                                        className="hidden"
                                    />
                                    <div
                                        className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
                                        <GridPattern/>
                                    </div>
                                    <div className="flex flex-col items-center justify-center">
                                        <p className="relative z-20 font-sans font-bold text-neutral-700 dark:text-neutral-300 text-base">
                                            Tải file ảnh lên
                                        </p>
                                        <p className="relative z-20 font-sans font-normal text-neutral-400 dark:text-neutral-400 text-base mt-2">
                                            Kéo thả hoặc chọn file từ máy
                                        </p>
                                        <div className="relative w-full mt-10 max-w-xl mx-auto">
                                            {files.length > 0 &&
                                                files.map((file, idx) => (
                                                    <motion.div
                                                        key={"file" + idx}
                                                        layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                                                        className={cn(
                                                            "relative overflow-hidden z-40 bg-white dark:bg-neutral-900 flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md",
                                                            "shadow-sm"
                                                        )}
                                                    >
                                                        <div className="flex justify-between w-full items-center gap-4">
                                                            <motion.p
                                                                initial={{opacity: 0}}
                                                                animate={{opacity: 1}}
                                                                layout
                                                                className="text-base text-neutral-700 dark:text-neutral-300 truncate max-w-xs"
                                                            >
                                                                {file.name}
                                                            </motion.p>
                                                            <motion.p
                                                                initial={{opacity: 0}}
                                                                animate={{opacity: 1}}
                                                                layout
                                                                className="rounded-lg px-2 py-1 w-fit flex-shrink-0 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input"
                                                            >
                                                                {(file.size / (1024 * 1024)).toFixed(2)} MB
                                                            </motion.p>
                                                        </div>

                                                        <div
                                                            className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                                                            <motion.p
                                                                initial={{opacity: 0}}
                                                                animate={{opacity: 1}}
                                                                layout
                                                                className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 "
                                                            >
                                                                {file.type}
                                                            </motion.p>

                                                            <motion.p
                                                                initial={{opacity: 0}}
                                                                animate={{opacity: 1}}
                                                                layout
                                                            >
                                                                modified{" "}
                                                                {new Date(file.lastModified).toLocaleDateString()}
                                                            </motion.p>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            {!files.length && (
                                                <motion.div
                                                    layoutId="file-upload"
                                                    variants={mainVariant}
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 300,
                                                        damping: 20,
                                                    }}
                                                    className={cn(
                                                        "relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
                                                        "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                                                    )}
                                                >
                                                    {isDragActive ? (
                                                        <motion.p
                                                            initial={{opacity: 0}}
                                                            animate={{opacity: 1}}
                                                            className="text-neutral-600 flex flex-col items-center"
                                                        >
                                                            Thả vào đây
                                                            <IconUpload
                                                                className="h-4 w-4 text-neutral-600 dark:text-neutral-400"
                                                            />
                                                        </motion.p>
                                                    ) : (
                                                        <IconUpload
                                                            className="h-4 w-4 text-neutral-600 dark:text-neutral-300"/>
                                                    )}
                                                </motion.div>
                                            )}

                                            {!files.length && (
                                                <motion.div
                                                    variants={secondaryVariant}
                                                    className="absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
                                                ></motion.div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>

                                <p className="w-full text-center my-4 text-gray-500">Hoặc</p>

                                <div className="flex gap-2">
                                    <Input
                                        type="url"
                                        placeholder="Nhập đường dẫn ảnh"
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                        className="flex-grow"
                                    />
                                    <Button type="submit">Thêm</Button>
                                </div>
                            </form>
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
                                                    <span className="flex-grow truncate">{img}</span>
                                                </a>
                                                <Button size="sm">
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

export function GridPattern() {
    const columns = 41;
    const rows = 11;
    return (
        <div
            className="flex bg-gray-100 dark:bg-neutral-900 flex-shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px  scale-105">
            {Array.from({length: rows}).map((_, row) =>
                Array.from({length: columns}).map((_, col) => {
                    const index = row * columns + col;
                    return (
                        <div
                            key={`${col}-${row}`}
                            className={`w-10 h-10 flex flex-shrink-0 rounded-[2px] ${
                                index % 2 === 0
                                    ? "bg-gray-50 dark:bg-neutral-950"
                                    : "bg-gray-50 dark:bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
                            }`}
                        />
                    );
                })
            )}
        </div>
    );
}