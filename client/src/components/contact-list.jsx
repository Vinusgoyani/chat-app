import useAppStore from "@/store";
import React,{useEffect} from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { getColor } from "@/lib/utils";

const ContactList = ({ contacts, isChannel = false }) => {
    const {
        selectedChatData,
        setSelectedChatData,
        setSelectedChatType,
        selectedChatType,
        setSelectedChatMessages,
    } = useAppStore();
    
    useEffect(() => {
    }, [selectedChatData])
    

    const handleClick = (contact) => {
        if (isChannel) setSelectedChatType("channel");
        else setSelectedChatType("contact");
        setSelectedChatData(contact);
        if (selectedChatData && selectedChatData._id !== contact._id) {
            setSelectedChatMessages([]);
        }
    };

    return (
        <div className="mt-5">
            {contacts.map((contact) => (
                <div
                    key={contact._id}
                    className={`pl-10 py-2 transition-all duration-300 cursor-pointer ${selectedChatData && selectedChatData._id === contact._id
                            ? "bg-orange-600 "
                            : "hover:bg-[#f1f1f111]"
                        }`}
                    onClick={()=>handleClick(contact)}
                >
                    <div className="flex gap-5 items-center justify-start text-neutral-300">
                        {!isChannel && (
                            <Avatar className="h-10 w-10 rounded-full overflow-hidden">
                                {contact.image ? (
                                    <AvatarImage
                                        src={`http://localhost:8747/${contact.image}`}
                                        alt="profile"
                                        className="object-cover w-full h-full bg-black rounded-full"
                                    />
                                ) : (
                                    <div
                                        className={`${selectedChatData && selectedChatData._id === contact._id
                                                ? "bg-[#ffffff22] border border-white/50"
                                                : getColor(contact.color)
                                            } uppercase w-10 h-10 text-lg border-[3px] flex items-center justify-center rounded-full ${getColor(
                                                contact.color
                                            )}`}
                                    >
                                        {contact.firstName
                                            ? contact.firstName.split("").shift()
                                            : contact.email.split("").shift()}
                                    </div>
                                )}
                            </Avatar>
                        )}
                        {isChannel && (
                            <div className="bg-[#ffffff22] h-10 w-10 flex justify-center items-center rounded-full">#</div>
                        )}
                        {isChannel ? (
                            <span>{contact.name}</span>
                        ) : (
                            <span>{`${contact.firstName} ${contact.lastName}`}</span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ContactList;
