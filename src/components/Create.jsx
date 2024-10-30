'use client';

import { useContext, useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Circle, Transformer } from 'react-konva';
import { ShapesContext } from '@/context/context';

const KonvaCanvas = () => {
    const { shapes, setShapes } = useContext(ShapesContext);
    const [selectedShapeId, setSelectedShapeId] = useState(null);
    const [containerSize, setContainerSize] = useState({ width: 500, height: 500 });
    const [popupPosition, setPopupPosition] = useState(null);
    const transformerRef = useRef(null);
    const stageRef = useRef(null);
    const containerRef = useRef(null);

    const handleSelect = (id, x, y) => {
        setSelectedShapeId(id);
        setPopupPosition({ x, y });
    };

    useEffect(() => {
        const selectedNode = stageRef.current?.findOne(`#${selectedShapeId}`);
        if (selectedNode) {
            transformerRef.current.nodes([selectedNode]);
            transformerRef.current.getLayer().batchDraw();
        } else {
            transformerRef.current.nodes([]);
        }
    }, [selectedShapeId]);

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
    };

    const handleDelete = () => {
        const newShapes = shapes.filter((s) => s.id !== selectedShapeId);
        setShapes(newShapes);
        setSelectedShapeId(null);
        setPopupPosition(null);
    };

    const handleDuplicate = () => {
        const shapeToDuplicate = shapes.find((s) => s.id === selectedShapeId);
        if (shapeToDuplicate) {
            const newShape = { ...shapeToDuplicate, id: Date.now(), x: shapeToDuplicate.x + 10, y: shapeToDuplicate.y + 10 };
            setShapes([...shapes, newShape]);
        }
    };

    const boxSize = containerSize.width / 40;
    const rows = Math.ceil(containerSize.height / boxSize);
    const cols = Math.ceil(containerSize.width / boxSize);

    return (
        <div className='w-full flex items-center justify-center' ref={containerRef}>
            <div style={{ position: 'relative', width: '40%', height: '60%' }}>
                {/* Checkerboard Background */}
                <Stage width={containerSize.width} height={containerSize.height}>
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
                </Stage>

                {/* Transparent Canvas Overlay */}
                <Stage ref={stageRef} width={containerSize.width} height={containerSize.height} style={{ position: 'absolute', top: 0, left: 0 }}
                    onMouseDown={(e) => {
                        if (e.target === e.target.getStage()) {
                            setSelectedShapeId(null);
                            setPopupPosition(null);
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
                                onClick: (e) => handleSelect(shape.id, e.target.x(), e.target.y()),
                                onTap: (e) => handleSelect(shape.id, e.target.x(), e.target.y()),
                                onDragMove: (e) => handleDragMove({ ...shape, x: e.target.x(), y: e.target.y() }),
                            };
                            if (shape.type === 'rectangle') {
                                return <Rect key={shape.id} {...commonProps} width={150} height={80} fill="gray" 
                                        onTransformEnd={(e) => {
                                            const node = e.target;
                                            const newShapes = shapes.map((s) =>
                                                s.id === shape.id ? { ...s, width: node.width(), height: node.height() } : s
                                            );
                                            setShapes(newShapes);
                                        }}/>;
                            } else if (shape.type === 'circle') {
                                return <Circle key={shape.id} {...commonProps} radius={80} fill="gray" 
                                        onTransformEnd={(e) => {
                                            const node = e.target;
                                            const newShapes = shapes.map((s) =>
                                                s.id === shape.id ? { ...s, width: node.width(), height: node.height() } : s
                                            );
                                            setShapes(newShapes);
                                        }}/>;
                            } else if (shape.type === 'square') {
                                return <Rect key={shape.id} {...commonProps} width={100} height={100} fill="gray" 
                                        onTransformEnd={(e) => {
                                            const node = e.target;
                                            const newShapes = shapes.map((s) =>
                                                s.id === shape.id ? { ...s, width: node.width(), height: node.height() } : s
                                            );
                                            setShapes(newShapes);
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
                            left: popupPosition.x + containerSize.width / 2,
                            transform: 'translate(-50%, -100%)',
                            background: '#fff',
                            padding: '5px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'center',
                            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <button onClick={handleDelete}>Delete</button>
                        <button onClick={handleDuplicate}>Duplicate</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default KonvaCanvas;
