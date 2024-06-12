import Layout from '@/components/Layout/Layout'
import React, { useEffect, useState } from 'react'
import styles from "./bookingDetails.module.scss"
import { useRouter } from 'next/router'
import { fetchServiceDetailsById, fileUpload, updateServiceStatus } from '@/app/services/service'
import ServiceDropdown from '@/components/ServiceDropDown'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image'
import upload from '@/public/assets/bookingDetails/upload.png'

function ServiceDetails() {
    const router = useRouter()
    const { id } = router.query
    const [serviceInfo, setServiceInfo] = useState({})
    const [recentStatus, setRecentStatus] = useState({})
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previews, setPreviews] = useState([]);


    const options = [
        { id: 1, name: "booked" },
        { id: 2, name: "accepted" },
        { id: 3, name: "picked" },
        { id: 4, name: "repairing" },
        { id: 5, name: "billing" },
        { id: 6, name: "readyToDeliver" },
        { id: 7, name: "delivered" }
    ];
    useEffect(() => {
        fetchServiceInfoById()
    }, [id])
    const fetchServiceInfoById = async () => {
        try {
            const response = await fetchServiceDetailsById(id)
            if (response.success) {
                setServiceInfo(response.data)
                const mostRecent = response.data.serviceHistory.reduce((latest, current) => {
                    return new Date(latest.createdAt) > new Date(current.createdAt) ? latest : current;
                });
                setRecentStatus(mostRecent)
                filterOptions(mostRecent.serviceStatus);

            }
        } catch (error) {
            console.log(error)
        }
    }
    console.log(serviceInfo.serviceHistory, "service info")
    const handleStatusChange = async (serviceId) => {
        try {
            const serviceStatus = options.filter((status) => status.id == serviceId)
            const response = await updateServiceStatus({ id, serviceStatus: serviceStatus[0].name })
            console.log(response)
            if (response.success) {
                toast.success("Status updated.")
                fetchServiceInfoById()
            }
        } catch (error) {
            console.log(error)
        }
    }
    const filterOptions = (currentStatus) => {
        const currentIndex = options.findIndex(option => option.name === currentStatus);
        if (currentIndex !== -1 && currentIndex < options.length - 1) {
            setFilteredOptions([options[currentIndex + 1]]);
        } else {
            setFilteredOptions([]);
        }
    };


    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);
        const filePreviews = files.map((file) => URL.createObjectURL(file));
        setPreviews(filePreviews);
    };
    const uploadServiceImages = async () => {
        try {
            const uploadPromises = selectedFiles.map(async (file) => {
                const formData = new FormData();
                formData.append('image', file);

                // Call the fileUpload function for each file
                return await fileUpload(formData);
            });

            // Wait for all promises to resolve
            const responses = await Promise.all(uploadPromises);
            console.log(responses); // Handle responses as needed
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };

    return (
        <Layout>
            <div className={styles.container}>
                <h2>Service Information</h2>
                <div className={styles.statusWrapper}>
                    <h3>Service Information</h3>
                    <ServiceDropdown options={filteredOptions} onSelect={handleStatusChange} />
                </div>
                <div className={styles.serviceInfo}>
                    <div className={styles.item}>
                        <label>Service Pickup Date</label>
                        <p>{serviceInfo?.serviceScheduledDate}</p>
                    </div>
                    <div className={styles.item}>
                        <label>Service Slot</label>
                        <p>{serviceInfo?.selectedSlot}</p>
                    </div>
                    <div className={styles.item}>
                        <label>address</label>
                        <p>{serviceInfo?.address ? serviceInfo?.address : "null"}</p>
                    </div>
                    <div className={styles.item}>
                        <label>Drop Type</label>
                        <p>{serviceInfo?.vehicleDropType}</p>
                    </div>
                    <div className={styles.item}>
                        <label>Pickup Type</label>
                        <p>{serviceInfo?.vehiclePickupType}</p>
                    </div>
                    <div className={styles.item}>
                        <label>User Contact</label>
                        <p>{serviceInfo?.contact}</p>
                    </div>
                    <div className={styles.item}>
                        <label>Contact Name</label>
                        <p>{serviceInfo?.contactName}</p>
                    </div>
                    <div className={styles.item}>
                        <label>Current Status</label>
                        <p style={{ color: "green", fontWeight: "bold" }}>{recentStatus?.serviceStatus?.toUpperCase()}</p>
                    </div>

                </div>

                <h3>User Information</h3>
                <div className={styles.userInfo}>
                    <div className={styles.item}>
                        <label>First Name</label>
                        <p>{serviceInfo?.user?.firstName}</p>
                    </div>
                    <div className={styles.item}>
                        <label>Last Name</label>
                        <p>{serviceInfo?.user?.lastName}</p>
                    </div>
                    <div className={styles.item}>
                        <label>Contact</label>
                        <p>{serviceInfo?.user?.phoneNumber}</p>
                    </div>
                    <div className={styles.item}>
                        <label>Referral Code</label>
                        <p>{serviceInfo?.user?.referralCode}</p>
                    </div>
                    <div className={styles.item}>
                        <label>Referral Points</label>
                        <p>{serviceInfo?.user?.referralPoints ? serviceInfo?.user?.referralPoints : 0}</p>
                    </div>
                    <div className={styles.item}>
                        <label>Coins earned</label>
                        <p>{serviceInfo?.user?.coinsEarned}</p>
                    </div>
                    <div className={styles.item}>
                        <label>Singup Date</label>
                        <p>{serviceInfo?.user?.createdAt}</p>
                    </div>
                </div>
                <h3>Vehicle Information</h3>

                <div className={styles.vehicleInfo}>
                    <div className={styles.item}>
                        <label>Registration</label>
                        <p>{serviceInfo?.vehicle?.licensePlate}</p>
                    </div>
                    <div className={styles.item}>
                        <label>Owner name</label>
                        <p>{serviceInfo?.vehicle?.ownerName}</p>
                    </div>
                    <div className={styles.item}>
                        <label>Insurance Expiry</label>
                        <p>{serviceInfo?.vehicle?.insuranceExpiry}</p>
                    </div>
                    <div className={styles.item}>
                        <label>Vehicle Class</label>
                        <p>{serviceInfo?.vehicle?.vehicleClass}</p>
                    </div>
                    <div className={styles.item}>
                        <label>Registration Date</label>
                        <p>{serviceInfo?.vehicle?.registrationDate}</p>
                    </div>
                    <div className={styles.item}>
                        <label>Chassis Number</label>
                        <p>{serviceInfo?.vehicle?.chassisNumber}</p>
                    </div>
                    <div className={styles.item}>
                        <label>Engine Number</label>
                        <p>{serviceInfo?.vehicle?.engineNumber}</p>
                    </div>
                    <div className={styles.item}>
                        <label>Fuel Type</label>
                        <p>{serviceInfo?.vehicle?.fuelType}</p>
                    </div>
                    <div className={styles.item}>
                        <label>Brand/ Model</label>
                        <p>{serviceInfo?.vehicle?.brandName} / {serviceInfo?.vehicle?.brandModel}</p>
                    </div>
                    <div className={styles.item}>
                        <label>CC</label>
                        <p>{serviceInfo?.vehicle?.cubicCapacity}</p>
                    </div>
                    <div className={styles.item}>
                        <label>Color</label>
                        <p>{serviceInfo?.vehicle?.color}</p>
                    </div>
                    <div className={styles.item}>
                        <label>Rc Status</label>
                        <p>{serviceInfo?.vehicle?.rcStatus}</p>
                    </div>
                </div>
                <h3>Garage Information</h3>
                <div className={styles.userInfo}>
                    <div className={styles.item}>
                        <label>Garage Name</label>
                        <p>{serviceInfo?.garage?.name}</p>
                    </div>
                    <div className={styles.item}>
                        <label>Owner Name</label>
                        <p>{serviceInfo?.garage?.ownername}</p>
                    </div>
                    <div className={styles.item}>
                        <label>address</label>
                        <p>{serviceInfo?.garage?.address}</p>
                    </div>
                    <div className={styles.item}>
                        <label>Contact</label>
                        <p>{serviceInfo?.garage?.ownerContact}</p>
                    </div>

                </div>
                {recentStatus.serviceStatus === "repairing" && (
                    <div className={styles.imageContainers}>
                        <label htmlFor="fileUpload" className={styles.uploadLabel}>
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
                        {
                            previews.length ? (
                                <button onClick={uploadServiceImages}>Upload</button>
                            ) : null
                        }
                    </div>
                )}
            </div>
            <ToastContainer />
        </Layout>
    )
}

export default ServiceDetails