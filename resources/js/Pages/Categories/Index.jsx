import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head } from "@inertiajs/react";
import Category from "@/Components/Category";
import "./Index.scss";

export default function Index({ auth, categories }) {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const { data, setData, post, patch, processing, reset, errors } = useForm({
        name: selectedCategory ? selectedCategory.name : "",
        description: selectedCategory ? selectedCategory.description : "",
    });

    useEffect(() => {
        if (selectedCategory) {
            setData({
                name: selectedCategory.name,
                description: selectedCategory.description,
            });
        } else {
            reset();
        }
    }, [selectedCategory, setData, reset]);

    const submit = (e) => {
        e.preventDefault();
        if (selectedCategory) {
            patch(route("categories.update", selectedCategory.id), {
                onSuccess: () => {
                    reset();
                    setSelectedCategory(null);
                },
            });
        } else {
            post(route("categories.store"), {
                onSuccess: () => reset(),
            });
        }

        data.name = "";
        data.description = "";
    };

    return (
        <AuthenticatedLayout>
            <Head title="Categories" />

            <div className="categories-container">
                <form onSubmit={submit} className="form">
                    <label htmlFor="name">Name</label>
                    <input
                        name="name"
                        value={data.name}
                        placeholder="Enter product name"
                        onChange={(e) => setData("name", e.target.value)}
                    ></input>
                    <InputError message={errors.name} className="mt-2" />

                    <label htmlFor="description">Description</label>
                    <textarea
                        value={data.description || ""}
                        placeholder="Enter product description"
                        onChange={(e) => setData("description", e.target.value)}
                    ></textarea>
                    <InputError message={errors.descrption} className="mt-2" />

                    <PrimaryButton className="mt-4" disabled={processing}>
                        {selectedCategory ? "Update" : "Add"}
                    </PrimaryButton>
                </form>

                <div className="categories-list">
                    {categories.map((category) => (
                        <Category
                            key={category.id}
                            category={category}
                            onEdit={() => setSelectedCategory(category)}
                        />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
