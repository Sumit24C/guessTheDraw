    import React, { useEffect, useRef, useState } from 'react'

    interface Point {
        X: number;
        Y: number;
    }

    interface Props {
        onDraw: (
            context: CanvasRenderingContext2D,
            sx: number,
            sy: number,
            cx: number,
            cy: number,
        ) => void;
        onStart: () => void;
        onStop: () => void;
        onEnd: () => void;
        classname?: string;
        height: number;
        width: number;
    }

    function Canvas({
        onDraw,
        onStart,
        onEnd,
        onStop,
        height,
        width,
        classname
    }: Props) {

        const canvasRef = useRef<HTMLCanvasElement>(null);
        const [start, setStart] = useState<Point>({ X: 0, Y: 0 })

        useEffect(() => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            canvas.height = height;
            canvas.width = width;
            canvas.style.height = "100%";
            canvas.style.width = "100%";
        }, [width, height])

        const startDrawing = ({ nativeEvent }: any) => {
            const { offsetX, offsetY } = nativeEvent;
            const canvas = canvasRef.current;
            if (!canvas) return;

            const boundary = canvas.getBoundingClientRect();
            const normalizeX = offsetX / boundary.width;
            const normalizeY = offsetY / boundary.height;
            setStart({ X: normalizeX, Y: normalizeY });
            onStart();
        }

        const finishDrawing = () => {
            onEnd();
        }

        const draw = ({ nativeEvent }: any) => {
            const { offsetX, offsetY } = nativeEvent;
            const canvas = canvasRef.current;
            if (!canvas) return;
            const context = canvas.getContext("2d");
            if (!context) return
            const boundary = canvas.getBoundingClientRect();
            const normalizeX = offsetX / boundary.width;
            const normalizeY = offsetY / boundary.height;
            onDraw(context, start.X, start.Y, normalizeX, normalizeY);
            setStart({ X: normalizeX, Y: normalizeY });
        }

        const canvasLeave = () => {
            onStop();
        }

        return (
            <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}
                onMouseLeave={canvasLeave}
                className={classname}
            >
            </canvas>
        )
    }

    export default React.memo(Canvas);