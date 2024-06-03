import React, { useState } from "react";
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './newService.module.scss';
import { assignVehicleToCustomer, createBooking, fetchAvailableSlots, fetchRcInfo, signupCustomer, updateCustomer } from "@/app/services/signupCustomer";
import { verifyOtp } from "@/app/services/login";
import Dropdown from "../Dropdown";

function NewService({ modalIsOpen, garages, completion }) {
    const [completed, setCompleted] = useState(false)
    const [step, setStep] = useState(1);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [userInfo, setUserInfo] = useState({ firstName: '', lastName: '', email: '' });
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [roles, setRoles] = useState();
    const [isNewUser, setIsNewUser] = useState(true);
    const [vehicleInfo, setVehicleInfo] = useState();
    const [customerToken, setCustomerToken] = useState();
    const [garageId, setGarageId] = useState('')
    const [availableSlots, setAvailableSlots] = useState()
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [otpVerified, setOtpVerified] = useState(false)
    const [existingVehicles, setExistingVehicles] = useState([])

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            width: "100%",
            transform: 'translate(-50%, -50%)',
            backgroundColor: "transparent",
            margin: "0",
            overflow: "scroll",
            padding: "0",
            border: 'none',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
    };

    const handleNextStep = () => {
        setStep(prevStep => prevStep + 1);
    };

    const handlePrevStep = () => {
        if (existingVehicles.length) {
            if (step === 6 || (step === 4 && otpVerified)) {
                setStep(2);
            } else {
                setStep(prevStep => prevStep - 1);
            }
        } else {
            setStep(prevStep => prevStep - 1);
        }
    };


    const validatePhoneNumber = (number) => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(number);
    };

    const handlePhoneNumberSubmit = async () => {
        try {
            if (validatePhoneNumber(phoneNumber)) {
                const response = await signupCustomer(phoneNumber, "5a67ca68-2272-46ff-b0dd-379fb311ca43");
                if (response.success) {
                    toast.success('Phone number validated successfully.');
                    handleNextStep();
                } else {
                    toast.error('Failed to validate phone number.');
                }
            } else {
                toast.error('Invalid phone number');
            }
        } catch (error) {
            toast.error('Error during phone number submission');
            console.error('Error during phone number submission:', error);
        }
    };

    const handleOtpSubmit = async () => {
        try {
            if (otp.length === 4) {
                const response = await verifyOtp(phoneNumber, otp);
                if (response.success) {
                    setUserInfo({
                        firstName: response.data.user.firstName,
                        lastName: response.data.user.lastName,
                        email: response.data.user.email
                    });
                    setCustomerToken(response.data.accessToken);
                    setIsNewUser(response.data.user.isNewUser);
                    setOtpVerified(true)
                    setExistingVehicles(response?.data?.vehicle)
                    toast.success('OTP verified successfully.');
                    if (!response?.data?.vehicle.length) {
                        handleNextStep();
                    }
                } else {
                    toast.error('Invalid OTP.');
                }
            } else {
                toast.error('Invalid OTP');
            }
        } catch (error) {
            toast.error('Error during OTP verification');
            console.error('Error during OTP verification:', error);
        }
    };

    const handleUserInfoUpdate = async () => {
        try {
            const response = await updateCustomer(userInfo, customerToken);
            if (response.success) {
                toast.success('User information updated successfully.');
                handleNextStep();
            } else {
                toast.error('Failed to update user information.');
            }
        } catch (error) {
            toast.error('Error during user information update');
            console.error('Error during user information update:', error);
        }
    };

    const handleVehicleReg = async () => {
        try {
            const response = await fetchRcInfo(vehicleNumber, customerToken);
            if (response.success) {
                setVehicleInfo(response.data);
                toast.success('Vehicle registration info fetched successfully.');
                handleNextStep();
            } else {
                toast.error('Failed to fetch vehicle registration info.');
            }
        } catch (error) {
            toast.error('Error during vehicle registration info fetch');
            console.error('Error during vehicle registration info fetch:', error);
        }
    };

    const handleAssignToCustomer = async () => {
        try {
            const response = await assignVehicleToCustomer(vehicleInfo.id, customerToken);
            if (response.success) {
                toast.success('Vehicle assigned to customer successfully.');
                handleNextStep();
            } else {
                toast.error('Failed to assign vehicle to customer.');
            }
        } catch (error) {
            toast.error('Error during vehicle assignment');
            console.error('Error during vehicle assignment:', error);
        }
    };

    const handleServiceBooking = async () => {
        const payload = {

            "vehicleId": vehicleInfo.id,
            "vehicleDropType": "self",
            "vehiclePickupType": "self",
            "contact": phoneNumber,
            "contactName": userInfo.firstName,
            "garageId": garageId,
            "serviceScheduledDate": `${selectedDate}T02:00:00Z`,
            "selectedSlot": selectedSlot,
            "address": {
                "pickupAddressId": "",
                "dropAddressId": "",
                "sameForPickupDrop": true
            }

        }
        const response = await createBooking(payload, customerToken)
        if (response.success) {
            toast.success('service created successfully.');
            setCompleted(true)
            completion(completed)
            // handleNextStep();
        } else {
            toast.error('Failed to assign vehicle to customer.');
        }
    }

    const handleGrageSelection = async (garageId) => {
        try {
            const availableSlots = await fetchAvailableSlots(garageId, customerToken)
            if (availableSlots.success) {
                setGarageId(garageId)
                setAvailableSlots(availableSlots.data)
                handleNextStep();

            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleSlotSelection = (date, slot) => {
        console.log(slot, "slot")
        setSelectedDate(date);
        setSelectedSlot(slot);
    };
    console.log(garageId, ">>>>>>>>>>")

    return (
        <div>
            <ToastContainer />
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className={styles.newServiceContainer}>
                    <div className={styles.wrapper}>
                        <button className={styles.close} onClick={completion}>Close</button>
                        {step === 1 && (
                            <div className={styles.item}>
                                <label className={styles.label}>Enter customer phone number</label>
                                <input
                                    type="number"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                                <button className={styles.button} onClick={handlePhoneNumberSubmit}>Next</button>
                            </div>
                        )}
                        {step === 2 && (

                            <div className={styles.item}>
                                {!otpVerified ? (
                                    <>
                                        <label className={styles.label}>Enter OTP</label>
                                <input
                                    type="number"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                                    </>
                                ) : (
                                    <div className={styles.existingVehicleWrapper}>
                                        <lable>Choose From Existing Vehicle</lable>
                                        <div className={styles.existingVehicle}>
                                            {existingVehicles.map((vehicle) => {
                                                return <p onClick={() => { setVehicleInfo(vehicle.vehicle); setStep(6) }} key={vehicle.id}>{vehicle.vehicle.licensePlate}</p>
                                            })}
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <button className={styles.button} onClick={handlePrevStep}>Back</button>
                                    {!existingVehicles.length && (
                                        <button className={styles.button} onClick={handleOtpSubmit}>Next</button>

                                    )}
                                    {existingVehicles.length && (
                                        
                                    <button className={styles.button} onClick={() => setStep(4)}>Add new</button>
                                    )}


                                </div>
                            </div>
                        )}
                        {step === 3 && (
                            <div className={styles.item}>
                                <label className={styles.label}>First Name</label>
                                <input
                                    type="text"
                                    value={userInfo.firstName}
                                    onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
                                />
                                <label className={styles.label}>Last Name</label>
                                <input
                                    type="text"
                                    value={userInfo.lastName}
                                    onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
                                />
                                <label className={styles.label}>Email</label>
                                <input
                                    type="email"
                                    value={userInfo.email}
                                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                                />
                                <div>
                                    <button className={styles.button} onClick={handlePrevStep}>Back</button>
                                    <button className={styles.button} onClick={handleUserInfoUpdate}>Next</button>
                                </div>
                            </div>
                        )}
                        {step === 4 && (
                            <div className={styles.item}>
                                <label className={styles.label}>Vehicle Registration Number</label>
                                <input
                                    type="text"
                                    value={vehicleNumber}
                                    onChange={(e) => setVehicleNumber(e.target.value)}
                                />
                                <div>
                                    <button className={styles.button} onClick={handlePrevStep}>Back</button>
                                    <button className={styles.button} onClick={handleVehicleReg}>Next</button>
                                </div>
                            </div>
                        )}
                        {step === 5 && (
                            <div className={styles.item}>
                                <h4 className={styles.h4}>Confirm Vehicle Details</h4>
                                <div className={styles.vehicleInfo}>
                                    <p>Registration: {vehicleInfo.licensePlate}</p>
                                    <p>Owner Name: {vehicleInfo.ownerName}</p>
                                    <p>Rc Status: {vehicleInfo.rcStatus}</p>


                                </div>
                                <div >
                                    <button className={styles.button} onClick={handlePrevStep}>Back</button>
                                    <button className={styles.button} onClick={handleAssignToCustomer}>Assign to Customer</button>
                                </div>
                            </div>
                        )}
                        {
                            step === 6 && (
                                <div className={styles.item}>
                                    <h4>Choose garage</h4>
                                    <Dropdown options={garages} name="name" onSelect={(id) => handleGrageSelection(id)}
                                    />
                                    <button className={styles.button} onClick={handlePrevStep}>Back</button>

                                </div>
                            )
                        }
                        {step === 7 && (
                            <div className={styles.item}>
                                <h4 className={styles.slotlabel}>Select date and time</h4>
                                <ul>
                                    {availableSlots.map(slot => (
                                        <div className={styles.slotWrapper} key={slot.date}> {/* Wrap each set of slots */}
                                            <li>
                                                <h5>{slot.date}</h5>
                                                <ul>
                                                    {Object.entries(slot.slotTimings).map(([time, available]) => (
                                                        <li key={time} className={selectedSlot === time && slot.date == selectedDate ? styles.active : ""} onClick={() => handleSlotSelection(slot.date, time)}>
                                                            <button className={selectedSlot === time && slot.date == selectedDate ? styles.active : ""} disabled={!available}>
                                                                {time} - {available ? 'Available' : 'Not Available'}
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                        </div>
                                    ))}
                                </ul>
                                <div className={styles.btnHolder}>
                                    <button className={styles.button} onClick={handlePrevStep}>Back</button>
                                    <button className={styles.button} onClick={handleServiceBooking}>CreateService</button>
                                </div>
                            </div>
                        )}



                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default NewService;
