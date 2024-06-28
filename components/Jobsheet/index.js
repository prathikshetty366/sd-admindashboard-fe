import React, { useState } from 'react';
import styles from "./Jobsheet.module.scss";
import Image from 'next/image';
import upload from '@/public/assets/bookingDetails/upload.png';

function Jobsheet({ generateJobsheet }) {
    const [jobsheetItems, setJobSheetItems] = useState([
        {
            item: "",
            quantity: 1,
            price: 0
        }
    ]);
    const [jobsheetData, setJobsheetData] = useState({
        fuelStatus: "20%",
        odometerReading: "463788",
    });
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [uploadingProgress, setUploadingProgress] = useState(false);

    const addItem = () => {
        setJobSheetItems([
            ...jobsheetItems,
            { item: "", quantity: 1, price: 0 }
        ]);
    };

    const removeItem = (index) => {
        const newJobSheetItems = jobsheetItems.filter((_, i) => i !== index);
        setJobSheetItems(newJobSheetItems);
    };

    const handleChange = (index, field, value) => {
        const newJobSheetItems = jobsheetItems.map((item, i) => {
            if (i === index) {
                return { ...item, [field]: value };
            }
            return item;
        });
        setJobSheetItems(newJobSheetItems);
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const filePreviews = files.map((file) => URL.createObjectURL(file));
        setPreviews(filePreviews);
        const compressOptions = {
            maxWidth: 800,
            maxHeight: 600,
            quality: 0.6,
            mimeType: 'image/jpeg'
        };

        Promise.all(files.map(file => {
            return new Promise((resolve, reject) => {
                new ImageCompressor(file, {
                    ...compressOptions,
                    success(result) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                            resolve(event.target.result);
                        };
                        reader.onerror = (error) => {
                            reject(error);
                        };
                        reader.readAsDataURL(result);
                    },
                    error(error) {
                        reject(error);
                    }
                });
            });
        })).then(base64Strings => {
            setSelectedFiles(base64Strings);
            setPreviews(files.map(file => URL.createObjectURL(file)));
        }).catch(error => {
            console.error('Error converting files to base64:', error);
        });
    };

    const uploadServiceImages = async () => {
        setUploadingProgress(true);
        generateJobsheet(jobsheetData, jobsheetItems, selectedFiles);
        setUploadingProgress(false);
    };

    return (
        <div className={styles.jobsheetWrapper}>
            <div className={styles.information}>
                <input
                    placeholder='Please enter the odo reading'
                    className={styles.jobInput}
                    onChange={(e) => setJobsheetData({ ...jobsheetData, odometerReading: e.target.value })}
                />
                <input
                    placeholder='Please enter the fuel percentage'
                    className={styles.jobInput}
                    onChange={(e) => setJobsheetData({ ...jobsheetData, fuelStatus: e.target.value })}
                />
            </div>
            {jobsheetItems.map((item, index) => (
                <div className={styles.jobsheetItems} key={index}>
                    <input
                        placeholder='Please enter the item name'
                        className={styles.jobInput}
                        value={item.item}
                        onChange={(e) => handleChange(index, 'item', e.target.value)}
                    />
                    <input
                        placeholder='Please enter the item quantity'
                        className={styles.jobInput}
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                    />
                    <input
                        placeholder='Please enter the item price'
                        className={styles.jobInput}
                        type="number"
                        value={item.price}
                        onChange={(e) => handleChange(index, 'price', e.target.value)}
                    />
                    {index === jobsheetItems.length - 1 && (
                        <button onClick={addItem}>Add</button>
                    )}
                    {jobsheetItems.length > 1 && (
                        <button onClick={() => removeItem(index)}>Remove</button>
                    )}
                </div>
            ))}
            <div className={styles.imageContainers}>
                <label htmlFor="fileUpload" className={styles.uploadLabel}>
                    <p>Please upload service images by clicking below</p>
                    <Image src={upload} width={60} height={60} alt="Upload" />
                    <input
                        id="fileUpload"
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className={styles.fileInput}
                    />
                </label>
                <div className={styles.previewContainer}>
                    {previews.map((preview, index) => (
                        <div key={index} className={styles.previewImage}>
                            <Image src={preview} alt={`Preview ${index + 1}`} width={100} height={100} />
                        </div>
                    ))}
                </div>
                <button disabled={uploadingProgress} onClick={uploadServiceImages}>Generate Jobsheet</button>
            </div>
        </div>
    );
}

export default Jobsheet;
