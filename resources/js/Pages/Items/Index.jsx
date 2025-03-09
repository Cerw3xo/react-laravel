import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head } from "@inertiajs/react";
import Item from "@/Components/Item";
import "./Index.scss";

export default function Index({ auth, items, categories }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    const { data, setData, post, patch, processing, reset, errors } = useForm({
        name: selectedItem ? selectedItem.name : "",
        description: selectedItem ? selectedItem.description : "",
        price: selectedItem ? selectedItem.price : "",
        count: selectedItem ? selectedItem.count : "",
        category_id: selectedItem ? selectedItem.category_id : null,
        img: selectedItem ? selectedItem.img : null,
    });

    useEffect(() => {
        if (selectedItem) {
            setData({
                name: selectedItem.name,
                description: selectedItem.description,
                price: selectedItem.price,
                count: selectedItem.count,
                category_id: selectedItem.category_id,
                img: selectedItem.img,
            });
        } else {
            reset();
        }
    }, [selectedItem, setData, reset]);

    const submit = (e) => {
        e.preventDefault();
        console.log(data);

        if (data.img && !data.img.type.startsWith("image/")) {
            setErrorMessage("Upload Image!");
            return;
        } else {
            setErrorMessage("");
        }

        if (selectedItem) {
            patch(route("items.update", selectedItem.id), {
                onSuccess: () => {
                    reset();
                    setSelectedItem(null);
                },
            });
        } else {
            post(route("items.store"), {
                onSuccess: () => reset(),
            });
        }

        data.name = "";
        data.description = "";
        data.price = "";
        data.count = "";
        data.img = null;
    };

    return (
        <AuthenticatedLayout>
            <Head title="Item" />

            <div className="item-item-container">
                <form onSubmit={submit} encType="multipart/form-data">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        name="name"
                        value={data.name}
                        placeholder="Enter product name"
                        onChange={(e) => setData("name", e.target.value)}
                    ></input>
                    <InputError message={errors.name} className="mt-2" />

                    <label htmlFor="description">Description</label>
                    <textarea
                        value={data.description}
                        placeholder="Enter product description"
                        onChange={(e) => setData("description", e.target.value)}
                    ></textarea>
                    <InputError message={errors.description} className="mt-2" />

                    <div className="item-input-container">
                        <div className="item-input-group">
                            <label className="form-label">Price</label>
                            <input
                                value={data.price}
                                placeholder="Enter product price"
                                className="form-textarea"
                                onChange={(e) =>
                                    setData("price", e.target.value)
                                }
                            ></input>
                            <InputError
                                message={errors.price}
                                className="mt-2"
                            />
                        </div>
                        <div className="item-input-group">
                            <label htmlFor="form-label">Quantity</label>
                            <input
                                value={data.count}
                                placeholder="Enter quantity"
                                className="form-textarea"
                                onChange={(e) =>
                                    setData("count", e.target.value)
                                }
                            ></input>
                            <InputError
                                message={errors.count}
                                className="mt-2"
                            />
                        </div>

                        <div className="item-input-group">
                            <label htmlFor="form-label">Category</label>
                            <select
                                className="category-select"
                                onChange={(e) =>
                                    setData("category_id", +e.target.value)
                                }
                            >
                                <option value="">vyber</option>
                                {categories.map((category) => (
                                    <option
                                        value={category.id}
                                        key={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <input
                        type="file"
                        onChange={(e) => setData("img", e.target.files[0])}
                    />
                    {errorMessage && (
                        <div className="error-message">{errorMessage}</div>
                    )}
                    {data.img && (
                        <img
                            src={URL.createObjectURL(data.img)}
                            alt="Preview"
                        />
                    )}

                    <PrimaryButton className="mt-4" disabled={processing}>
                        {selectedItem ? "Update" : "Add"}
                    </PrimaryButton>
                </form>

                <div className="item-item-list">
                    {items.map((item) => (
                        <Item
                            key={item.id}
                            item={item}
                            onEdit={() => setSelectedItem(item)}
                        />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
