import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head } from "@inertiajs/react";
import Item from "@/Components/Item";
import "./Index.scss";

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

            <div className="item-container">
                <form onSubmit={submit}>
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        name="name"
                        value={data.name}
                        placeholder="Enter product name"
                        className="form-textarea"
                        onChange={(e) => setData("name", e.target.value)}
                    ></input>
                    <InputError message={errors.name} className="mt-2" />

                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <textarea
                        value={data.description}
                        placeholder="Enter product description"
                        className="form-textarea"
                        onChange={(e) => setData("description", e.target.value)}
                    ></textarea>
                    <InputError message={errors.descrption} className="mt-2" />

                    <div className="input-container">
                        <div className="input-group">
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
                        <div className="input-group">
                            <label htmlFor="form-abel">Quantity</label>
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
                    </div>

                    <PrimaryButton className="mt-4" disabled={processing}>
                        Add
                    </PrimaryButton>
                </form>

                <div className="item-list">
                    {items.map((item) => (
                        <Item key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
