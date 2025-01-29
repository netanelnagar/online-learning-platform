import { MouseEventHandler, useState } from "react";
import { Plus, X } from "lucide-react";
import Card from "../../Components/Ui/Card";
import Input from "../../Components/Ui/Input";
import Textarea from "../../Components/Ui/Textarea";
import Button from "../../Components/Ui/Button";
import { ICourse, ILesson } from "../../types/types";

interface IEditCourse {
    course: ICourse;
    handleBack: MouseEventHandler;
    handleSave: (data: ICourse) => void;
}

export function EditCourse({ course, handleBack, handleSave }: IEditCourse) {
    const [editedCourse, setEditedCourse] = useState(course);
    const [newLesson, setNewLesson] = useState<Partial<ILesson>>({});



    const addLesson = () => {
        if (newLesson.title && newLesson.videoUrl) {
            setEditedCourse({
                ...editedCourse,
                lessons: [...editedCourse.lessons, newLesson as ILesson]
            });
            setNewLesson({});
        }
    };



    return (
        <>
            <button onClick={handleBack} className="my-4 ml-3">← Back</button>
            <Card className="p-6">

                <div className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium">Title</label>
                        <Input
                            value={editedCourse.title}
                            onChange={(e) => setEditedCourse({ ...editedCourse, title: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Description</label>
                        <Textarea
                            value={editedCourse.description}
                            onChange={(e) => setEditedCourse({ ...editedCourse, description: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Price</label>
                        <Input
                            type="number"
                            value={editedCourse.price}
                            onChange={(e) => setEditedCourse({ ...editedCourse, price: Number(e.target.value) })}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Thumbnail URL</label>
                        <Input
                            value={editedCourse.thumbnail}
                            onChange={(e) => setEditedCourse({ ...editedCourse, thumbnail: e.target.value })}
                        />
                    </div>

                    <div>
                        <h3 className="mb-2 font-semibold">Lessons</h3>
                        <div className="space-y-4">
                            {editedCourse.lessons.map((lesson, index) => (
                                <Card key={index} className="p-4">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h4 className="font-medium">{lesson.title}</h4>
                                            <p className="text-sm text-gray-500">{lesson.duration} minutes</p>
                                        </div>
                                        <Button
                                        // variant="ghost"
                                        // size="icon"
                                        // onClick={() => {
                                        //     const newLessons = [...editedCourse.lessons];
                                        //     newLessons.splice(index, 1);
                                        //     setEditedCourse({ ...editedCourse, lessons: newLessons });
                                        // }}
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </Card>
                            ))}

                            <Card className="p-4">
                                <div className="space-y-2">
                                    <Input
                                        placeholder="Lesson Title"
                                        value={newLesson.title || ""}
                                        onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                                    />
                                    <Input
                                        placeholder="Video URL"
                                        value={newLesson.videoUrl || ""}
                                        onChange={(e) => setNewLesson({ ...newLesson, videoUrl: e.target.value })}
                                    />
                                    <Input
                                        placeholder="Duration (minutes)"
                                        type="number"
                                        value={newLesson.duration || ""}
                                        onChange={(e) => setNewLesson({ ...newLesson, duration: Number(e.target.value) })}
                                    />
                                    <Button onClick={addLesson} className="flex mx-auto text-sm">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Lesson
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    </div>

                    <Button onClick={() => { setNewLesson({}); handleSave(editedCourse) }} className="w-full text-sm">Save</Button>
                </div>
            </Card>
        </>
    );
}