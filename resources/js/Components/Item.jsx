import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import ItemForm from "./ItemForm";

dayjs.extend(relativeTime);

export default function Item({ item }) {
    const { auth } = usePage().props;
    const [editing, setEditing] = useState(false);
    const { data, setData, patch, clearErrors, reset, errors } = useForm({
        name: item.name,
        description: item.description,
        price: item.price,
        count: item.count,
    });

    return (
        <div className=" edited-item">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600 -scale-x-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
            </svg>
            <div className="flex-1">
                <div className="flex justify-between items-center ">
                    <div>
                        <span className="text-gray-300">{item.user.name}</span>
                        <small className="ml-2 text-sm text-gray-300">
                            {dayjs(item.created_at).fromNow()}
                        </small>
                        {item.created_at !== item.updated_at && (
                            <small className="text-sm text-gray-600">
                                {" "}
                                &middot; Edited
                            </small>
                        )}
                    </div>
                    {item.user.id === auth.user.id && (
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-gray-400"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <button
                                    className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-200 hover:bg-gray-100 focus:bg-gray-600 transition duration-150 ease-in-out link-item "
                                    onClick={() => setEditing(true)}
                                >
                                    Edit
                                </button>
                                <Dropdown.Link
                                    as="button"
                                    href={route("items.destroy", item.id)}
                                    method="delete"
                                >
                                    Delete
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    )}
                </div>
                {editing ? (
                    <ItemForm item={item} setEditing={setEditing} />
                ) : (
                    <div className="item">
                        <p>{item.name}</p>
                        <p>{item.description}</p>
                        <p>{item.price}</p>
                        <p>{item.count}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
