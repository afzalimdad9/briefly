"use client";

import { Download, Loader2, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from 'react';
import { toast } from "sonner";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Skeleton } from "../../../components/ui/skeleton";
import { DEEPAI_API_KEY } from "@/config";


const Container = () => {

    const [prompt, setPrompt] = useState<string>("");

    const [imgUrl, setImgUrl] = useState<string>("");

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isModelLoading, setIsModelLoading] = useState<boolean>(false);

    const [retryCount, setRetryCount] = useState<number>(0);

    const handleDownload = () => {
        if (imgUrl) {
            const a = document.createElement('a');
            a.href = imgUrl;
            a.download = 'generated_image.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            toast.error("Image URL is not available for download.");
        }
    };

    const query = async () => {
        try {
            const response = await fetch("https://api.deepai.org/api/text2img", {
                // const response = await fetch("https://api-inference.huggingface.co/models/Melonie/text_to_image_finetuned", {
                headers: {
                    // "Authorization": `Bearer ${HUGGING_FACE_KEY}`,
                    'api-key': DEEPAI_API_KEY
                },
                method: "POST",
                body: JSON.stringify({ text: prompt as string }),
            });
            const result = await response.blob();
            return result;
        } catch (error) {
            console.error("Error generating image", error);
            return { error: "Could not generate image." };
        }
    };
    const query2 = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setIsModelLoading(true);
        try {
            const response = await fetch("https://api.deepai.org/api/text2img", {
                // const response = await fetch("https://api-inference.huggingface.co/models/Melonie/text_to_image_finetuned", {
                headers: {
                    // "Authorization": `Bearer ${HUGGING_FACE_KEY}`,
                    'api-key': DEEPAI_API_KEY,
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify({ text: prompt as string }),
            });
            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Error generating image", error);
            return { error: "Could not generate image." };
        } finally {
            setIsLoading(true);
            setIsModelLoading(true);
        }
    };

    const generate = async () => {
        try {
            const res = await query();
            if (res instanceof Blob) {
                const objURL = URL.createObjectURL(res);
                setImgUrl(objURL);
            } else if (res.error && res.error === "Model runwayml/stable-diffusion-v1-5 is currently loading") {
                // Retry if model is still loading
                setRetryCount(prevCount => prevCount + 1);
            } else {
                console.error(res.error);
                toast.error(res.error);
            }
        } finally {
            setIsLoading(false);
            setIsModelLoading(false);
        }
    };

    useEffect(() => {
        // Retry image generation if it fails due to model loading
        if (retryCount > 0) {
            generate();
        }
        // eslint-disable-next-line
    }, [retryCount]);

    return (
        <div className="relative flex items-center justify-start w-full h-full max-w-2xl pt-40 mx-auto sm:pt-0">
            <div className="flex flex-col items-center justify-start w-full py-8">
                <h2 className="w-full text-xl font-semibold text-start lg:text-2xl">
                    Image Generator
                </h2>
                <div className="relative flex flex-col items-start justify-start w-full max-w-lg py-8 mr-auto">
                    <form onSubmit={query2} className="w-full">
                        <Label className="relative w-full">
                            <span className="text-muted-foreground ml-0.5">
                                Prompt
                            </span>
                            <Input
                                name="prompt"
                                value={prompt}
                                disabled={isLoading}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Enter a prompt"
                                className="w-full mt-1"
                            />
                        </Label>
                        {isLoading && isModelLoading && (
                            <div className="flex items-center justify-start w-full mt-4">
                                <span className="px-3 py-1.5 text-sm rounded-md bg-red-100 text-red-500">
                                    Model is loading. Please wait...
                                </span>
                            </div>
                        )}
                        <Button
                            size="sm"
                            type="submit"
                            disabled={isLoading}
                            className="mt-4 ml-0.5"
                        >
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                                <Sparkles className="w-4 h-4 mr-2" />
                            )}
                            Generate
                        </Button>
                    </form>

                    <div className="flex flex-col items-start w-full mt-12">
                        <div className="flex itec' justify-between w-full">
                            <span className="text-base font-medium">
                                Generated Image
                            </span>
                        </div>
                        <div className="grid w-full grid-cols-1 gap-8 mt-4 md:grid-cols-2">
                            {!imgUrl && !isLoading && (
                                <div className="flex items-center justify-start w-full mt-4">
                                    <span className="text-muted-foreground">
                                        Enter a prompt to generate an image
                                    </span>
                                </div>
                            )}
                            {isLoading && (
                                <div className="flex items-center justify-center w-full h-60">
                                    <Skeleton className="w-full h-full" />
                                </div>
                            )}
                            {imgUrl && !isLoading && (
                                <div className="relative flex flex-col w-full">
                                    <Image
                                        src={imgUrl! || "https://huggingface.co/Melonie/text_to_image_finetuned/resolve/main/image_1.png"}
                                        alt="Generated Image"
                                        width={500}
                                        height={500}
                                        unoptimized
                                        className="object-cover w-full rounded-lg h-60"
                                    />
                                    <Button variant="outline" className="mt-4" asChild onClick={handleDownload}>
                                        <Link href={imgUrl! && imgUrl!} download="briefly_image.png" target="_blank">
                                            <Download className="w-4 h-4 mr-2" />
                                            Download
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Container
