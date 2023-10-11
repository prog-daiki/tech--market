"use client"

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary"

type ImageUploadProps = {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [])

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <div className="bg-white p-4">
        <CldUploadWidget onUpload={onUpload} uploadPreset="acbammdn">
          {({ open }) => {
            const onClick = () => {
              open();
            };
            return (
              <Button type="button" variant="secondary" disabled={disabled} onClick={onClick}>
                <ImagePlus className="mr-2 h-4 w-4" />
                画像をアップロード
              </Button>
            )
          }}
        </CldUploadWidget>
        <div className="flex items-center gap-4 mt-4 flex-wrap">
          {value.map((url) => (
            <div key={url} className="relative w-[120px] h-[120px] rounded-md overflow-hidden">
              <div className="z-10 absolute top-2 right-2">
                <Button type="button" onClick={() => onRemove(url)} variant="destructive" size="sm">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              <Image
                fill
                className="object-cover"
                alt="Image"
                src={url}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ImageUpload
