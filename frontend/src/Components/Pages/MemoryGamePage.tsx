import { Route, Routes } from "react-router-dom";
import { AboutMemoryGame } from "../MemoryGameArea/aboutMemoryGame/AboutMemoryGame";
import { MemoryGame } from "../MemoryGameArea/MemoryGame/MemoryGame";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

export interface HeaderOption {
    name: string;
    code: string;
}

export default function MemoryGamePage() {
    const [subject, setSubject] = useState({ name: 'fruits', code: 'OPT1' });
    const [isOpen, setIsOpen] = useState(false);

    const onOptionChange = (e: DropdownChangeEvent) => {
        setSubject(e.value);
    };

    const options: HeaderOption[] = [
        { name: 'fruits', code: 'OPT1' },
        { name: 'animals', code: 'OPT2' },
        { name: 'persons', code: 'OPT3' },
        { name: 'vehicle', code: 'OPT3' },
    ];
    return (
        <div className="w-100 pt-3">
            <div className="flex flex-column justify-content-center">
                <h5 className="center">
                    welcome to memoryGame

                </h5>
                <h5 className="center">witch subject u want?</h5>
                <br />
                <div className="center">
                    {/* <h2 className="p-m-0">My Application Header</h2> */}
                    <Dropdown
                        value={subject}
                        options={options}
                        onChange={onOptionChange}
                        optionLabel="name"
                        placeholder="Select an Option"
                    />
                </div>
            </div>
            <Button className="p-button-raised p-button-primary center" onClick={() => setIsOpen(true)}>
                Start Game
            </Button>
            <Dialog visible={isOpen} className="dialog-size" onHide={() => { setIsOpen(false); }}>
                <MemoryGame subject={subject} setSubject={setSubject} />
            </Dialog>
            {/* <Routes>
                <Route path="/" element={<MemoryGame subject={subject} setSubject={setSubject} />} />
                <Route path="/Game" element={<MemoryGame subject={subject} setSubject={setSubject}/>} />
            </Routes> */}
        </div>
    )
}
