import { useState } from "react";
import { GraduationCap, Star, Users, Mail, MessageSquare } from "lucide-react";
import Card from "../Components/Ui/Card";
import Button from "../Components/Ui/Button";
import Input from "../Components/Ui/Input";
import Textarea from "../Components/Ui/Textarea";
import Footer from "./Footer";

export function Contact(): JSX.Element {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);

        setFormData({ name: "", email: "", phone: "", message: "" });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    return (
        <div className="flex flex-col min-h-full overflow-y-auto relative">
            <a href="https://wa.me/+972555686119" // Replace with your WhatsApp link
                target="_blank"
                rel="noopener noreferrer"
                className="fixed flex items-center justify-center w-16 h-16 text-white transition-colors duration-200 bg-green-500 rounded-full shadow-lg bottom-16 right-6 hover:bg-green-600">
                <MessageSquare className="w-8 h-8 " />
            </a>
            <div className="flex-grow md:place-content-center">
                <div className="container px-4 pt-8 m-auto">
                    <Card className="max-w-2xl mx-auto mb-8">
                        <h2 className="my-3 text-2xl font-bold text-center text-primary">Contact Us</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div>
                                <label htmlFor="name" className="block text-lg font-bold text-gray-700">Name</label>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-2 mt-1 border rounded-md"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-lg font-bold text-gray-700">Email</label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-2 mt-1 border rounded-md"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-lg font-bold text-gray-700">Phone</label>
                                <Input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full p-2 mt-1 border rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-lg font-bold text-gray-700">Message</label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full p-2 mt-1 border rounded-md focus:ring-primary"
                                    required
                                />
                            </div>
                            <Button type="submit" className="px-4 py-2 text-white">
                                Send Message
                            </Button>
                        </form>
                    </Card>
                </div>
            </div>
            <Footer />
        </div>
    );
}
