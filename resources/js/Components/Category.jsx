import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown";

export default function Category({ category, onEdit }) {
    const { auth } = usePage().props;

    return (
        <div className="edited-categories-item">
            <div className="flex-1">
                <div className="flex justify-between items-center ">
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
                                onClick={onEdit}
                            >
                                Edit
                            </button>
                            <Dropdown.Link
                                as="button"
                                href={route("categories.destroy", category.id)}
                                method="delete"
                            >
                                Delete
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
                <div className="edit-categories-list">
                    <p>{category.name}</p>
                    <p>{category.description}</p>
                </div>
            </div>
        </div>
    );
}
