'use client';

import { useContext, useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Circle, Text, Transformer } from 'react-konva';
import { ShapesContext } from '@/context/context';

const KonvaCanvas = () => {
    const { shapes, setShapes } = useContext(ShapesContext);
    const [selectedShapeId, setSelectedShapeId] = useState(null);
    const transformerRef = useRef(null);
    const stageRef = useRef(null);

    const handleSelect = (id) => {
        setSelectedShapeId(id);
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

    const handleDragMove = (shape) => {
        const newShapes = shapes.map((s) => {
            if (s.id === shape.id) {
                return {
                    ...s,
                    x: shape.x,
                    y: shape.y,
                };
            }
            return s;
        });
        setShapes(newShapes);
    };

    return (
        <div className='w-full flex items-center justify-center'>
            {/* Canvas Area */}
            <div style={{ position: 'relative', width: '500px', height: '500px' }}>
                {/* Checkerboard Background */}
                <Stage width={500} height={500}>
                    <Layer>
                        {Array.from({ length: 25 }, (_, row) =>
                            Array.from({ length: 25 }, (_, col) => (
                                <Rect
                                    key={`${row}-${col}`}
                                    x={col * 20}
                                    y={row * 20}
                                    width={20}
                                    height={20}
                                    fill={(row + col) % 2 === 0 ? '#ccc' : '#fff'}
                                />
                            ))
                        )}
                    </Layer>
                </Stage>

                {/* Transparent Canvas Overlay */}
                <Stage ref={stageRef} width={500} height={500} style={{ position: 'absolute', top: 0, left: 0 }} onMouseDown={(e) => {
                    if (e.target === e.target.getStage()) {
                        setSelectedShapeId(null);
                    }
                }}>
                    <Layer>
                        {shapes.map((shape) => {
                            const commonProps = {
                                id: shape.id.toString(),
                                x: shape.x,
                                y: shape.y,
                                draggable: true,
                                onClick: () => handleSelect(shape.id),
                                onDragMove: (e) => handleDragMove({ ...shape, x: e.target.x(), y: e.target.y() }),
                            };
                            if (shape.type === 'rectangle') {
                                return <Rect key={shape.id} {...commonProps} width={150} height={80} fill="gray" onTransformEnd={(e) => {
                                    const node = e.target;
                                    const newShapes = shapes.map((s) =>
                                        s.id === shape.id ? { ...s, width: node.width(), height: node.height() } : s
                                    );
                                    setShapes(newShapes);
                                }} />;
                            } else if (shape.type === 'circle') {
                                return <Circle key={shape.id} {...commonProps} radius={80} fill="gray" onTransformEnd={(e) => {
                                    const node = e.target;
                                    const newShapes = shapes.map((s) =>
                                        s.id === shape.id ? { ...s, width: node.width(), height: node.height() } : s
                                    );
                                    setShapes(newShapes);
                                }} />;
                            } else if (shape.type === 'square') {
                                return <Rect key={shape.id} {...commonProps} width={100} height={100} fill="gray" onTransformEnd={(e) => {
                                    const node = e.target;
                                    const newShapes = shapes.map((s) =>
                                        s.id === shape.id ? { ...s, width: node.width(), height: node.height() } : s
                                    );
                                    setShapes(newShapes);
                                }} />;;
                            }
                            return null;
                        })}
                        {/* Transformer for Resizing */}
                        <Transformer ref={transformerRef} boundBoxFunc={(oldBox, newBox) => {
                            // Limit resizing to minimum dimensions
                            if (newBox.width < 20 || newBox.height < 20) return oldBox;
                            return newBox;
                        }} />
                    </Layer>
                </Stage>
            </div>
        </div>
    );
};

export default KonvaCanvas;
