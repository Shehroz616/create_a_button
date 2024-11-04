'use client';

import { useContext, useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Circle, Transformer, Text } from 'react-konva';
import { ShapesContext } from '@/context/context';
import { CopyPlus, Trash2} from 'lucide-react';

const KonvaCanvas = () => {
    const { shapes, setShapes, shapesTopBar, setshapesTopBar, selectedShapeId, setSelectedShapeId } = useContext(ShapesContext);
    const [containerSize, setContainerSize] = useState({ width: 500, height: 500 });
    const [popupPosition, setPopupPosition] = useState(null);
    const [textPosition, setTextPosition] = useState(null);
    const [editingText, setEditingText] = useState('');
    const [textFocus, setTextFocus] = useState(false);
    const transformerRef = useRef(null);
    const stageRef = useRef(null);
    const containerRef = useRef(null);

    const handleSelect = (id, x, y, rect) => {
        setSelectedShapeId(id);
        const { width, height } = rect;
        let xx = x+width/2
        setPopupPosition({ xx, y });
        setTextPosition({ x, y });

        setshapesTopBar(true);
    };

    useEffect(() => {
        const selectedNode = stageRef.current?.findOne(`#${selectedShapeId}`);
        if (selectedNode) {
            transformerRef.current.nodes([selectedNode]);
            transformerRef.current.getLayer().batchDraw();
            const { x, y, width, height } = selectedNode.getClientRect();
            setPopupPosition({ x: x + width / 2, y });
            setTextPosition({ x, y });
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
        setTextPosition(null);
        setshapesTopBar(false);
    };

    const handleDuplicate = () => {
        const shapeToDuplicate = shapes.find((s) => s.id === selectedShapeId);
        if (shapeToDuplicate) {
            const newShape = { ...shapeToDuplicate, id: Date.now(), x: shapeToDuplicate.x + 20, y: shapeToDuplicate.y + 20 };
            setShapes([...shapes, newShape]);
        }
    };

    const handleTextChange = (e) => {
        const newText = e.target.value;
        setEditingText(newText);
        const newShapes = shapes.map((shape) => {
          if (shape.id === selectedShapeId) {
            return { ...shape, text: newText };
          }
          return shape;
        });
        setShapes(newShapes);
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
                            setTextPosition(null);
                            setshapesTopBar(false);
                            setTextFocus(false);
                            setEditingText(null);
                        }
                    }}
                >
                    <Layer>
                        {shapes.map((shape) => {
                            const commonProps = {
                                id: shape.id.toString(),
                                x: shape.x,
                                y: shape.y,
                                fill: shape.fill,
                                width: shape.width,
                                height: shape.height,
                                radius: shape.radius,
                                draggable: true,
                                onClick: (e) => handleSelect(shape.id, e.target.x(), e.target.y(), e.target.getClientRect()),
                                onTap: (e) => handleSelect(shape.id, e.target.x(), e.target.y(), e.target.getClientRect()),
                                onDragMove: (e) => handleDragMove({ ...shape, x: e.target.x(), y: e.target.y() }),
                                onTransformEnd: (e) => {
                                    const node = e.target;
                                    const width = node.width() * node.scaleX();
                                    const height = node.height() * node.scaleY();
                                    const newShapes = shapes.map((s) =>
                                        s.id === shape.id ? { ...s, width: width, height: height } : s
                                    );
                                    setPopupPosition({ x: node.x() + width / 2, y: node.y() });
                                    setTextPosition({ x: node.x(), y: node.y() });
                                    setShapes(newShapes);
                                    node.scaleX(1);
                                    node.scaleY(1);
                                }
                            };

                            if (shape.type === 'rectangle') {
                                return <Rect key={shape.id} {...commonProps} />;
                            } else if (shape.type === 'circle') {
                                return <Circle key={shape.id} {...commonProps} />;
                            } else if (shape.type === 'square') {
                                return <Rect key={shape.id} {...commonProps} />;
                            } else if (shape.type === 'text') {
                                return <Text onDblClick={()=>{setEditingText(shape.text);setTextFocus(true);}} key={shape.id} {...commonProps} text={shape.text} fontSize={shape.fontSize}/>;
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

                {textFocus && selectedShapeId && shapes.find((shape) => shape.id === selectedShapeId)?.type === 'text' && (
                    <textarea 
                        onChange={handleTextChange} 
                        className='border-0 p-0 bg-gray-100 absolute outline-none'
                        style={{
                            top: textPosition.y - 5,
                            left: textPosition.x - 5,
                            padding: '5px',
                            width: shapes.find((shape) => shape.id === selectedShapeId)?.width +5,
                            height: shapes.find((shape) => shape.id === selectedShapeId)?.height +5,
                            lineHeight: 1,
                            fontSize: shapes.find((shape) => shape.id === selectedShapeId)?.fontSize,
                        }}>
                        {editingText}</textarea>
                )}
            </div>
        </div>
    );
};
 
export default KonvaCanvas;