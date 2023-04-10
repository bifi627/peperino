import { useEffect, useRef, useState } from "react";
import { AppFrame } from "../../components/appFrame/AppFrame";
// const { createCanvas, loadImage } = require('canvas');

const { scanImageData } = require('zbar.wasm');

const ScanPage = () => {
    const [videoStream, setVideoStream] = useState<MediaStream>();
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [response, setResponse] = useState<{ data: string, ms: number }>();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: "environment" } }, audio: false }).then(stream => {
            setVideoStream(stream);
        }).catch(error => alert(error));
    }, []);

    useEffect(() => {
        if (videoStream && videoRef.current) {
            videoRef.current.srcObject = videoStream;
        }
    }, [videoStream, videoRef]);

    // const getImageData = async (src: string) => {
    //     const img = await loadImage(src);
    //     const canvas = createCanvas(img.width, img.height);
    //     const ctx = canvas.getContext('2d');
    //     ctx.drawImage(img, 0, 0);
    //     return ctx.getImageData(0, 0, img.width, img.height);
    // };

    // const captureFrameDummy = async () => {

    //     if (canvasRef.current && videoRef.current) {

    //         const url = './test.png';

    //         const img = await getImageData(url);
    //         console.log(img);
    //         const t0 = new Date().getTime();
    //         const rawRes = await scanImageData(img);
    //         console.log(rawRes);
    //         const res = new TextDecoder().decode(rawRes[0].data)
    //         console.log(res);
    //         const t1 = new Date().getTime();

    //         setResponse({ data: res, ms: t1 - t0 });
    //     }
    // };

    const captureFrame = async () => {

        if (canvasRef.current && videoRef.current) {
            const canvas = canvasRef.current;
            const video = videoRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);
            const img = canvas.getContext("2d")?.getImageData(0, 0, canvas.width, canvas.height);

            const imageData = canvas.toDataURL('image/png');
            // Do something with the captured frame (e.g. send it to a QR code scanner).
            console.log(imageData);

            try {
                const t0 = new Date().getTime();
                const rawRes = await scanImageData(img);
                console.log(rawRes);
                if (rawRes[0]) {
                    const res = new TextDecoder().decode(rawRes[0].data)
                    console.log(res);
                    const t1 = new Date().getTime();
                    setResponse({ data: res, ms: t1 - t0 });
                }
            } catch (error) {
                alert(error);
            }

        }
    };

    return (
        <AppFrame toolbarText="Scanner">
            <video ref={videoRef} style={{ border: "solid 1px red", width: "100%", height: "calc(100% - 200px)" }} autoPlay />
            <button onClick={captureFrame}>Capture Frame</button>
            <p>Data: {`${response?.data}`}</p>
            <p>Ms: {`${response?.ms}`}</p>
            <canvas style={{ display: "none" }} ref={canvasRef}></canvas>
        </AppFrame>
    );
}

export default ScanPage;