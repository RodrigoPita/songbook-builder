import { X, GripVertical } from 'lucide-react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

/**
 * Individual sortable song item
 */
const SortableSongItem = ({ song }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: song.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="bg-white border border-gray-200 rounded-lg p-3 mb-2 flex items-center gap-3 hover:shadow-md transition-shadow"
        >
            {/* Drag Handle */}
            <button
                className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 touch-none"
                {...attributes}
                {...listeners}
            >
                <GripVertical className="w-5 h-5" />
            </button>

            {/* Song Info */}
            <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 truncate">{song.title}</p>
                <p className="text-sm text-gray-500 truncate">{song.artist}</p>
            </div>
        </div>
    );
};

/**
 * Reorder Panel Modal
 * @param {object} props
 * @param {boolean} props.isOpen - Whether the panel is open
 * @param {Function} props.onClose - Function to close the panel
 * @param {Array<object>} props.songs - Array of selected songs
 * @param {Function} props.onReorder - Function called when songs are reordered
 */
const ReorderPanel = ({ isOpen, onClose, songs, onReorder }) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = songs.findIndex((song) => song.id === active.id);
            const newIndex = songs.findIndex((song) => song.id === over.id);

            const newOrder = arrayMove(songs, oldIndex, newIndex);
            onReorder(newOrder);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop - Higher z-index to cover sidebar too */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-[60] print:hidden"
                onClick={onClose}
            />

            {/* Panel - Even higher z-index */}
            <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-gray-50 shadow-2xl z-[70] overflow-y-auto print:hidden">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800">Reordenar Músicas</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Close reorder panel"
                    >
                        <X className="w-6 h-6 text-gray-600" />
                    </button>
                </div>

                {/* Instructions */}
                <div className="p-4 bg-blue-50 border-b border-blue-100">
                    <p className="text-sm text-blue-800">
                        Arraste as músicas usando o ícone <GripVertical className="inline w-4 h-4" /> para reorganizar a ordem do songbook.
                    </p>
                </div>

                {/* Sortable List */}
                <div className="p-4">
                    {songs.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">
                            Nenhuma música selecionada
                        </p>
                    ) : (
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={songs.map(s => s.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                {songs.map((song) => (
                                    <SortableSongItem key={song.id} song={song} />
                                ))}
                            </SortableContext>
                        </DndContext>
                    )}
                </div>
            </div>
        </>
    );
};

export default ReorderPanel;
