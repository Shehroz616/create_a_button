'use client';

import { useContext, useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Circle, Transformer } from 'react-konva';
import { ShapesContext } from '@/context/context';
import { CopyPlus, Trash2} from 'lucide-react';

const KonvaCanvas = () => {
    const { shapes, setShapes, shapesTopBar, setshapesTopBar } = useContext(ShapesContext);
    const [selectedShapeId, setSelectedShapeId] = useState(null);
    const [containerSize, setContainerSize] = useState({ width: 500, height: 500 });
    const [popupPosition, setPopupPosition] = useState(null);
    const transformerRef = useRef(null);
    const stageRef = useRef(null);
    const containerRef = useRef(null);

    const handleSelect = (id, x, y, rect) => {
        setSelectedShapeId(id);
        const { width, height } = rect;
        let xx = x+width/2
        setPopupPosition({ xx, y });
        setshapesTopBar(true);
    };

    useEffect(() => {
        const selectedNode = stageRef.current?.findOne(`#${selectedShapeId}`);
        if (selectedNode) {
            transformerRef.current.nodes([selectedNode]);
            transformerRef.current.getLayer().batchDraw();
            const { x, y, width, height } = selectedNode.getClientRect();
            setPopupPosition({ x: x + width / 2, y });
        } else {
            transformerRef.current.nodes([]);
        }
    }, [selectedShapeId, shapes]);

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const { offsetWidth, offsetHeight } = containerRef.current;
                setContainerSize({
                    width: offsetWidth * 0.4,
                    height: offsetHeight * 0.6,
                });
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleDragMove = (shape) => {
        const newShapes = shapes.map((s) => {
            if (s.id === shape.id) {
                return { ...s, x: shape.x, y: shape.y };
            }
            return s;
        });
        setShapes(newShapes);
        if (shape.id === selectedShapeId) {
            // setPopupPosition({ x: shape.x, y: shape.y });
        }
    };

    const handleDelete = () => {
        const newShapes = shapes.filter((s) => s.id !== selectedShapeId);
        setShapes(newShapes);
        setSelectedShapeId(null);
        setPopupPosition(null);
        setshapesTopBar(false);
    };

    const handleDuplicate = () => {
        const shapeToDuplicate = shapes.find((s) => s.id === selectedShapeId);
        if (shapeToDuplicate) {
            const newShape = { ...shapeToDuplicate, id: Date.now(), x: shapeToDuplicate.x + 10, y: shapeToDuplicate.y + 10 };
            console.log(newShape)
            setShapes([...shapes, newShape]);
        }
    };

    const boxSize = containerSize.width / 20;
    const rows = Math.ceil(containerSize.height / boxSize);
    const cols = Math.ceil(containerSize.width / boxSize);

    return (
        <div className='w-full flex items-center justify-center' style={{height: 'calc(100% - 65px)'}} ref={containerRef}>
            <div className='bg-gray-100 border border-gray-300' style={{ position: 'relative', width: '40%', height: '60%' }}>
                {/* Checkerboard Background */}
                {/* <Stage width={containerSize.width} height={containerSize.height}>
                    <Layer>
                        {Array.from({ length: rows }, (_, row) =>
                            Array.from({ length: cols }, (_, col) => (
                                <Rect
                                    key={`${row}-${col}`}
                                    x={col * boxSize}
                                    y={row * boxSize}
                                    width={boxSize}
                                    height={boxSize}
                                    fill={(row + col) % 2 === 0 ? '#ccc' : '#fff'}
                                />
                            ))
                        )}
                    </Layer>
                </Stage> */}

                {/* Transparent Canvas Overlay */}
                <Stage ref={stageRef} width={containerSize.width} height={containerSize.height} style={{ position: 'absolute', top: 0, left: 0 }}
                    onMouseDown={(e) => {
                        if (e.target === e.target.getStage()) {
                            setSelectedShapeId(null);
                            setPopupPosition(null);
                            setshapesTopBar(false);
                        }
                    }}
                >
                    <Layer>
                        {shapes.map((shape) => {
                            const commonProps = {
                                id: shape.id.toString(),
                                x: shape.x,
                                y: shape.y,
                                draggable: true,
                                onClick: (e) => handleSelect(shape.id, e.target.x(), e.target.y(), e.target.getClientRect()),
                                onTap: (e) => handleSelect(shape.id, e.target.x(), e.target.y(), e.target.getClientRect()),
                                onDragMove: (e) => handleDragMove({ ...shape, x: e.target.x(), y: e.target.y() }),
                            };

                            if (shape.type === 'rectangle') {
                                return <Rect key={shape.id} {...commonProps} width={150} height={80} fill="gray" 
                                        onTransformEnd={(e) => {
                                            const node = e.target;
                                            const { width, height } = node.getClientRect();
                                            const newShapes = shapes.map((s) =>
                                                s.id === shape.id ? { ...s, width: width, height: height } : s
                                            );
                                            console.log(newShapes)
                                            setShapes(newShapes);
                                            setPopupPosition({ x: node.x() + width / 2, y: node.y() });
                                        }}/>;
                            } else if (shape.type === 'circle') {
                                return <Circle key={shape.id} {...commonProps} radius={80} fill="gray" 
                                        onTransformEnd={(e) => {
                                            const node = e.target;
                                            const { width, height } = node.getClientRect();
                                            const newShapes = shapes.map((s) =>
                                                s.id === shape.id ? { ...s, width: width, height: height } : s
                                            );
                                            console.log(width, height)
                                            setShapes(newShapes);
                                            setPopupPosition({ x: node.x() + width / 2, y: node.y() });
                                        }}/>;
                            } else if (shape.type === 'square') {
                                return <Rect key={shape.id} {...commonProps} width={100} height={100} fill="gray" 
                                        onTransformEnd={(e) => {
                                            const node = e.target;
                                            const { width, height } = node.getClientRect();
                                            const newShapes = shapes.map((s) =>
                                                s.id === shape.id ? { ...s, width: width, height: height } : s
                                            );
                                            setShapes(newShapes);
                                            console.log(width, height)
                                            setPopupPosition({ x: node.x() + width / 2, y: node.y() });
                                        }}/>;
                            }
                            return null;
                        })}
                        <Transformer ref={transformerRef} boundBoxFunc={(oldBox, newBox) => (newBox.width < 20 || newBox.height < 20 ? oldBox : newBox)} />
                    </Layer>
                </Stage>

                {/* Tooltip Popup */}
                {popupPosition && (
                    <div
                        style={{
                            position: 'absolute',
                            top: popupPosition.y - 50,
                            left: popupPosition.x?popupPosition.x:popupPosition.xx,
                            transform: 'translateX(-50%)',
                            background: '#f3f4f6',
                            padding: '5px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'center',
                            boxShadow: '1px 2px 10px rgba(0, 0, 0, 0.3)',
                            animation: 'slideUp 0.2s ease-out',
                        }}
                    >
                        <button onClick={handleDelete}><Trash2 strokeWidth={1} size={20}/></button>
                        <button onClick={handleDuplicate}><CopyPlus strokeWidth={1} size={20} /></button>
                    </div>
                )}
            </div>
        </div>
    );
};
 
export default KonvaCanvas;