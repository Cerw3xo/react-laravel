import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head } from "@inertiajs/react";
import Item from "@/Components/Item";

export default function Index({ auth, items }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: "",
        description: "",
        price: "",
        count: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("items.store"), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Item" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <textarea
                        value={data.name}
                        placeholder="What's on your mind?"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={(e) => setData("name", e.target.value)}
                    ></textarea>
                    <InputError message={errors.name} className="mt-2" />

                    <textarea
                        value={data.description}
                        placeholder="What's on your mind?"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={(e) => setData("description", e.target.value)}
                    ></textarea>
                    <InputError message={errors.descrption} className="mt-2" />

                    <textarea
                        value={data.price}
                        placeholder="What's on your mind?"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={(e) => setData("price", e.target.value)}
                    ></textarea>
                    <InputError message={errors.price} className="mt-2" />

                    <textarea
                        value={data.count}
                        placeholder="What's on your mind?"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={(e) => setData("count", e.target.value)}
                    ></textarea>
                    <InputError message={errors.count} className="mt-2" />

                    <PrimaryButton className="mt-4" disabled={processing}>
                        Add
                    </PrimaryButton>
                </form>

                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {items.map((item) => (
                        <Item key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
