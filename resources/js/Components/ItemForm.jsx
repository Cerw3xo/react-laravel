import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

dayjs.extend(relativeTime);

export default function ItemForm({ item, setEditing }) {
    const { auth } = usePage().props;
    const { data, setData, patch, clearErrors, reset, errors } = useForm({
        name: item.name,
        description: item.description,
        price: item.price,
        count: item.count,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route("items.update", item.id), {
            onSuccess: () => setEditing(false),
        });
    };

    return (
        <form onSubmit={submit} className="edited-form">
            <input
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                className="mt-4 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
            ></input>
            <InputError message={errors.name} className="mt-2" />

            <textarea
                value={data.description}
                onChange={(e) => setData("description", e.target.value)}
                className="mt-4 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
            ></textarea>
            <InputError message={errors.description} className="mt-2" />

            <div className="edited-container">
                <input
                    value={data.price}
                    onChange={(e) => setData("price", e.target.value)}
                    className="mt-4 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                ></input>
                <InputError message={errors.price} className="mt-2" />

                <input
                    value={data.count}
                    onChange={(e) => setData("count", e.target.value)}
                    className="mt-4 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                ></input>
                <InputError message={errors.count} className="mt-2" />
            </div>

            <div className="space-x-2">
                <PrimaryButton className="mt-4">Save</PrimaryButton>

                <button
                    className="mt-4"
                    onClick={() => {
                        setEditing(false);
                        reset();
                        clearErrors();
                    }}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
