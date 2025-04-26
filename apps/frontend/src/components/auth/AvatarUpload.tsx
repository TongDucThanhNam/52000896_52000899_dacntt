"use client";
import {Fragment} from "react";

interface AvatarUploadProps {
    setAvatarUrl: (url: string) => void;
}

export default function AvatarUpload(
    {
        setAvatarUrl,
    }: AvatarUploadProps
) {
    return (
        <Fragment>
            {/* */}
            {/*<UploadButton*/}
            {/*    content={{*/}
            {/*        button({ready}) {*/}
            {/*            if (ready) return <div>Tải Avatar</div>;*/}

            {/*            return "Đang upload...";*/}
            {/*        },*/}
            {/*    }}*/}

            {/*    endpoint="imageUploader"*/}
            {/*    onClientUploadComplete={(res: any) => {*/}
            {/*        console.log("url: ", res[0].url);*/}
            {/*        setAvatarUrl(res[0].url);*/}
            {/*    }}*/}
            {/*    onUploadError={(error: Error) => {*/}
            {/*        // Do something with the error.*/}
            {/*        alert(`Lỗi! ${error.message}`);*/}
            {/*    }}*/}
            {/*/>*/}
        </Fragment>
    );
}