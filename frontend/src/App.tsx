import { useEffect, useRef, useState } from 'react'
import Canvas from './components/Canvas';

function App() {
    const [drawing, setDrawing] = useState(false);
    const [pencil, setPencil] = useState(0);
    const [height, setHeight] = useState(window.innerHeight / 2);
    const [width, setWidth] = useState(window.innerHeight / 2);

    const containerRef = useRef<HTMLDivElement>(null);
    const onDrawing = (
        context: CanvasRenderingContext2D,
        sx: number,
        sy: number,
        cx: number,
        cy: number,
    ) => {
        console.log(pencil)
        if (!drawing) return
        if (pencil === 0) {
            sx *= width;
            sy *= height;
            cx *= width;
            cy *= height;

            context.beginPath();
            context.moveTo(sx, sy);
            context.lineTo(cx, cy);
            context.fillStyle = "black";
            context.lineWidth = 3;
            context.stroke();
        } else if (pencil == 1) {
            cx *= width;
            cy *= height;
            context.clearRect(cx, cy, 20, 20);
        }
    }

    const startDrawing = () => setDrawing(true);
    const stopDrawing = () => setDrawing(false);
    const onEnd = () => {
        if (drawing) {
            setDrawing(false)
        }
    }

    const selectEraser = () => setPencil(1);
    const selectPencil = () => setPencil(0);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="h-screen w-screen">
            <div
                className='w-full h-96 mx-auto border-2 border-black rounded-md'
                ref={containerRef}
            >
                <Canvas
                    onDraw={onDrawing}
                    onStart={startDrawing}
                    onStop={stopDrawing}
                    onEnd={onEnd}
                    classname='bg-white w-full h-full'
                    height={height}
                    width={width}
                >
                </Canvas>
            </div>
            <div className='mt-4 flex justify-center space-x-4 h-1/12'>
                <button className='border-2 px-2' onClick={selectPencil}>
                    pencil
                </button>
                <button className='border-2 px-2' onClick={selectEraser}>
                    eraser
                </button>
            </div>
        </div>
    )
}

export default App