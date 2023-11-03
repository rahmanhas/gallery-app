import React from 'react';
import { useRef, useState } from "react";
import addImg from "../assets/images/addImage.jpg";
import img1 from "../assets/images/image-1.webp";
import img2 from "../assets/images/image-2.webp";
import img3 from "../assets/images/image-3.webp";
import img4 from "../assets/images/image-4.webp";
import img5 from "../assets/images/image-5.webp";
import img6 from "../assets/images/image-6.webp";
import img7 from "../assets/images/image-7.webp";
import img8 from "../assets/images/image-8.webp";
import img9 from "../assets/images/image-9.webp";
import img10 from "../assets/images/image-10.jpeg";
import img11 from "../assets/images/image-11.jpeg";

export const imgGallery = [
    // Define an array to store image data
    {
        id: 1, img: img1, isChecked: false,  // Track if the image is selected
    },
    { id: 2, img: img2, isChecked: false, },
    { id: 3, img: img3, isChecked: false, },
    { id: 4, img: img4, isChecked: false, },
    { id: 5, img: img5, isChecked: false, },
    { id: 6, img: img6, isChecked: false, },
    { id: 7, img: img7, isChecked: false, },
    { id: 8, img: img8, isChecked: false, },
    { id: 9, img: img9, isChecked: false, },
    { id: 10, img: img10, isChecked: false, },
    { id: 11, img: img11, isChecked: false, }
];

const ImageCart = ({
    image, address, handleSelectedImg, handleDragStart, handleDrop, draggedAddress, handleDragOver,
}) => {
    return (
        <div
            // Set TailwindCSS classes based on conditions
            className={
                address === 0
                    ? `col-span-2 row-span-2 border border-[#dfe0e3] rounded-sm  relative cursor-grabbing transition-all ${draggedAddress === address ? "border border-[#dfe0e3]" : ""}`
                    : `border border-[#dfe0e3] rounded-sm  relative cursor-grabbing transition-all ${draggedAddress === address ? "border border-[#dfe0e3]" : ""}`
            }
            draggable
            onDragStart={(e) => handleDragStart(e, address)}
            onDrop={(e) => handleDrop(e, address)}
            onDragOver={(e) => handleDragOver(e, address)}
        >
            <img
                src={image.img}
                alt=""
                className={`${
                    draggedAddress === address ? "scale-50" : ""
                } ${
                    image.isChecked ? "opacity-50" : ""
                }`}
            />
            {/* ... (image selection and hover effects) */}
            <div
                className={
                    image.isChecked
                        ? `absolute h-full w-full left-0 top-0 bottom-0 right-0  transition-all`
                        : `bg-[rgba(0,0,0,0.7)] absolute h-full w-full left-0 top-0 bottom-0 right-0 opacity-0 transition-all hover:opacity-50 hover:rounded-sm`
                }
            >
                <input
                    checked={image.isChecked}
                    onChange={() => handleSelectedImg(image.id)}
                    className="absolute top-5 left-5 w-5 h-5"
                    type="checkbox"
                    name="checkbox"
                    id="checkbox"
                />
            </div>
        </div>
    );
};

const Home = () => {
    const [selectedImg, setSelectedImg] = useState(imgGallery);
    const [deleteImage, setDeleteImage] = useState([]);
    const [draggedAddress, setDraggedAddress] = useState(null);
    const fileInput = useRef();

    // Function to handle image selection
    const handleSelectedImg = (id) => {
        const updateSelectedImg = selectedImg.map((img) => {
            return img.id === id ? { ...img, isChecked: !img.isChecked } : img;
            // Update the selected image and create an array of selected images
            // based on the 'isChecked' property
        });

        const deleteItemCount = updateSelectedImg.filter((image) => {
            if (image.isChecked) {
                return image;
            }
        });
        setDeleteImage(deleteItemCount);
        setSelectedImg(updateSelectedImg); 
    };

    // Function to delete selected images
    const handleDeleteImage = () => {
        const remainingImage = selectedImg.filter((image) => {
            if (!image.isChecked) {
                return image;
            }
        });
        setSelectedImg(remainingImage);
        setDeleteImage([]);
    };

    // Function to open the file input for image upload
    const handleFileClick = () => {
        fileInput.current.click();
    };

    // Function to process uploaded images and add them to the gallery
    const handleImageUpload = (e) => {
        const files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const id = selectedImg.length + i + 1;
            const img_path = URL.createObjectURL(file);
            const newImage = { id, img: img_path, isChecked: false };
            setSelectedImg((prevImg) => [...prevImg, newImage]);
        }
        e.target.value = null;
        console.log(selectedImg);
    };

    // Function to reset selected images
    const handleSelectedChange = () => {
        const updateSelectedImg = selectedImg.map((img) => {
            return { ...img, isChecked: false };
        });
        setSelectedImg(updateSelectedImg);
        setDeleteImage([]);
    };

    // Custom drag-and-drop functions
    const handleDragStart = (e, address) => {
        // Handle the start of a drag operation
        e.dataTransfer.setData("address", address);
        setDraggedAddress(address);
    };
    const handleDrop = (e, newAddress) => {
        // Handle the drop of a dragged image
        const startAddress = e.dataTransfer.getData("address");
        const updatedBoxes = [...selectedImg];
        const [draggedBox] = updatedBoxes.splice(startAddress, 1);
        updatedBoxes.splice(newAddress, 0, draggedBox);
        setSelectedImg(updatedBoxes);
        setDraggedAddress(null);
    };
    const handleDragOver = (e, address) => {
        // Handle the drag-over operation during a drag-and-drop
        e.preventDefault();
        if (address !== draggedAddress) {
            setDraggedAddress(address);
        }
    };

    return (
        <div className='w-full flex justify-center items-center bg-[#edf2f7]'>
            <div className="w-11/12 rounded-xl mx-auto my-5 bg-white ">
                {deleteImage.length > 0 ? (
                    <>
                        <nav className=" px-2 py-2 flex flex-row bg-white rounded-t-md justify-between items-center  mx-auto border-b-2 border-b-slate-300">
                            <div className="flex items-center justify-between">
                                <input
                                    checked={true}
                                    onChange={handleSelectedChange}
                                    className="w-7 h-7"
                                    type="checkbox"
                                    name=""
                                    id=""
                                />
                                <p className="ml-5 text-xl font-bold ">
                                    {deleteImage.length === 1
                                        ? `${deleteImage.length} File Selected`
                                        : `${deleteImage.length} Files Selected`}
                                </p>
                            </div>

                            <div className='flex justify-center items-center'>
                                <button
                                    onClick={handleDeleteImage}
                                    className="px-2 py-2 rounded-sm border-none text-lg text-red-600 font-medium hover:underline"
                                >
                                    {deleteImage.length === 1
                                        ? `Delete file`
                                        : `Delete files`}
                                </button>
                            </div>
                        </nav>
                    </>
                ) : (
                    <>
                        <nav className=" text-2xl bg-white rounded-t-md font-bold  mx-auto py-5 px-4 border-b-2 border-b-[#ebebed]">
                            <h1>Gallery</h1>
                        </nav>
                    </>
                )}

                <section className="grid rounded-sm bg-white lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-7  mx-auto py-4 px-4">
                    {selectedImg?.map((image, address) => {
                        return (
                            <ImageCart
                                key={address}
                                image={image}
                                address={address}
                                handleSelectedImg={handleSelectedImg}
                                handleDrop={handleDrop}
                                handleDragStart={handleDragStart}
                                draggedAddress={draggedAddress}
                                handleDragOver={handleDragOver}
                            />
                        );
                    })}

                    <div
                        className="relative border-2 border-dashed rounded-md  flex flex-col justify-center items-center w-[100%] cursor-pointer"
                        onClick={handleFileClick}
                    >
                        <img
                            className="mx-auto"
                            width="1200"
                            height="1200"
                            src={addImg}
                            alt="Add Images"
                        />
                    </div>
                    <input
                        type="file"
                        id="fileInput"
                        className="hidden"
                        onChange={handleImageUpload}
                        accept="image/*"
                        ref={fileInput}
                    />
                </section>
            </div>
        </div>
    );
};

export default Home;