import React, { useState } from 'react';
import './styles.css';
import Modal from './modal';
import DeductionModal from './DeductionModal';

const HomePage = () => {

    const initialBasicSalary = 0;
    const initialAllowances = [];
    const initialDeductions = [];

    const [basicSalary, setBasicSalary] = useState(initialBasicSalary);
    const [allowances, setAllowances] = useState(initialAllowances);
    const [deductions, setDeductions] = useState(initialDeductions);

    // const [basicSalary, setBasicSalary] = useState(100000);
    // const [allowances, setAllowances] = useState([
    //     { name: 'Travel', amount: '10,000.00', epfEtf: true },
    //     { name: 'Insurance', amount: '6,500.00', epfEtf: false },
    // ]);
    // const [deductions, setDeductions] = useState([
    //     { name: 'No Pay', amount: '8,000.00', epfEtf: false },
    // ]);

    const handleBasicSalaryChange = (event) => {
        setBasicSalary(parseFloat(event.target.value));
    };

    const handleAllowanceChange = (index, field, value) => {
        const updatedAllowances = [...allowances];
        updatedAllowances[index][field] = value;
        setAllowances(updatedAllowances);
        setIsEditModalOpen(!isEditOpen);
    };

    const [isEditOpen, setIsEditModalOpen] = useState(false);
    // const handleAllowanceChange = () => {
        
    // };

    const handleDeductionChange = (index, field, value) => {
        const updatedDeductions = [...deductions];
        updatedDeductions[index][field] = value;
        setDeductions(updatedDeductions);
    };

    const calculateGrossEarning = () => {
        return basicSalary + allowances.reduce((total, allowance) => total + parseFloat(allowance.amount), 0);
    };

    const calculateGrossDeduction = () => {
        return deductions.reduce((total, deduction) => total + parseFloat(deduction.amount), 0);
    };

    const calculateNetSalary = () => {
        return calculateGrossEarning() - calculateGrossDeduction();
    };

    const calculateEmployerEpf = () => {
        return calculateGrossEarning() * 0.12;
    };

    const calculateEmployerEtf = () => {
        return calculateGrossEarning() * 0.03;
    };

    const calculateCtc = () => {
        return calculateGrossEarning() + calculateEmployerEpf() + calculateEmployerEtf();
    };

    const calculateApit = () => {
        const grossEarning = calculateGrossEarning();
        if (grossEarning <= 100000) {
            return 0;
        } else if (grossEarning <= 141667) {
            return (grossEarning - 100000) * 0.06;
        } else if (grossEarning <= 183333) {
            return (grossEarning - 141667) * 0.12 + 2500;
        } else if (grossEarning <= 225000) {
            return (grossEarning - 183333) * 0.18 + 5500;
        } else if (grossEarning <= 266667) {
            return (grossEarning - 225000) * 0.24 + 10000;
        } else if (grossEarning <= 308333) {
            return (grossEarning - 266667) * 0.30 + 15000;
        } else {
            return (grossEarning - 308333) * 0.36 + 21000;
        }
    };

   

    const [isAllowanceModalOpen, setIsAllowanceModalOpen] = useState(false);
    const toggleAllowanceModal = () => {
        setIsAllowanceModalOpen(!isAllowanceModalOpen);
    };

    const [isDeductionModalOpen, setIsDeductionModalOpen] = useState(false);
    const toggleDeductionModal = () => {
        setIsDeductionModalOpen(!isDeductionModalOpen);
    };

    const handleAddAllowance = (newAllowance) => {
        setAllowances([...allowances, newAllowance]);
    };

    const handleAddDeduction = (newDeduction) => {
        setDeductions([...deductions, newDeduction]);
    };

    const handleDeleteAllowance = (index) => {
        const updatedAllowances = [...allowances];
        updatedAllowances.splice(index, 1);
        setAllowances(updatedAllowances);
    };

    const handleDeleteDeduction = (index) => {
        const updatedDeductions = [...deductions];
        updatedDeductions.splice(index, 1);
        setDeductions(updatedDeductions);
    };

    const handleReset = () => {
        setBasicSalary(initialBasicSalary);
        setAllowances(initialAllowances);
        setDeductions(initialDeductions);
    };

    return (
        <div className="container">
            <div className="flex-container">
                <div className="calculator bg-gray-50 border border-gray-100 rounded-lg !pb-[263px]">
                    <div className='flex item-center justify-between'>
                        <h2 className='font-bold text-black text-lg text-left'>Calculate Your Salary</h2>
                        <button onClick={handleReset} className='flex items-center gap-2 text-blue-500 font-medium text-base'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M22.0001 12C22.0001 16.9706 17.9707 21 13.0001 21C11.1525 21.0061 9.34893 20.4363 7.8401 19.37C7.71954 19.2831 7.64286 19.148 7.6301 19C7.61816 18.8559 7.66922 18.7136 7.7701 18.61L8.4901 17.88C8.65911 17.7127 8.92255 17.6876 9.1201 17.82C10.2663 18.5925 11.6179 19.0036 13.0001 19C16.8661 19 20.0001 15.866 20.0001 12C20.0001 8.13401 16.8661 5 13.0001 5C9.1341 5 6.0001 8.13401 6.0001 12H8.3601C8.49568 11.998 8.62602 12.0523 8.7201 12.15L8.9201 12.35C9.01475 12.4439 9.068 12.5717 9.068 12.705C9.068 12.8383 9.01475 12.9661 8.9201 13.06L5.3901 16.6C5.19228 16.7918 4.87791 16.7918 4.6801 16.6L1.1501 13.06C1.05544 12.9661 1.0022 12.8383 1.0022 12.705C1.0022 12.5717 1.05544 12.4439 1.1501 12.35L1.3501 12.15C1.44417 12.0523 1.57451 11.998 1.7101 12H4.0001C4.0001 7.02944 8.02953 3 13.0001 3C17.9707 3 22.0001 7.02944 22.0001 12Z" fill="#0052EA" />
                            </svg>
                            Reset
                        </button>
                    </div>
                    <div className="input-group">
                        <label htmlFor="basicSalary" className='text-left mt-6 font-semibold text-base text-black'>Basic Salary:</label>
                        <input
                            className='mt-2'
                            type="number"
                            id="basicSalary"
                            value={basicSalary}
                            onChange={handleBasicSalaryChange}
                        />
                    </div>
                    <h3 className='text-left mt-6 font-semibold text-base text-black'>Earnings</h3>
                    <div className="input-group">
                        <label className='mt-1 text-sm font-normal text-gray-200 text-left'>Allowance, Fixed Allowance, Bonus and etc.</label>
                        <button onClick={toggleAllowanceModal} className='flex items-center gap-2 mt-6 text-blue-500 font-medium text-base'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <g clip-path="url(#clip0_3147_19)">
                                    <path d="M19 11.5V12.5C19 12.6326 18.9473 12.7598 18.8536 12.8536C18.7598 12.9473 18.6326 13 18.5 13H13V18.5C13 18.6326 12.9473 18.7598 12.8536 18.8536C12.7598 18.9473 12.6326 19 12.5 19H11.5C11.3674 19 11.2402 18.9473 11.1464 18.8536C11.0527 18.7598 11 18.6326 11 18.5V13H5.5C5.36739 13 5.24021 12.9473 5.14645 12.8536C5.05268 12.7598 5 12.6326 5 12.5V11.5C5 11.3674 5.05268 11.2402 5.14645 11.1464C5.24021 11.0527 5.36739 11 5.5 11H11V5.5C11 5.36739 11.0527 5.24021 11.1464 5.14645C11.2402 5.05268 11.3674 5 11.5 5H12.5C12.6326 5 12.7598 5.05268 12.8536 5.14645C12.9473 5.24021 13 5.36739 13 5.5V11H18.5C18.6326 11 18.7598 11.0527 18.8536 11.1464C18.9473 11.2402 19 11.3674 19 11.5Z" fill="#0052EA" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_3147_19">
                                        <rect width="24" height="24" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            Add New Allowance
                        </button>
                        <Modal isOpen={isAllowanceModalOpen} toggleModal={toggleAllowanceModal} onAddAllowance={handleAddAllowance} /> {/* Render the Modal component */}
                    </div>
                    <div className='mt-6'>
                        {allowances.map((allowance, index) => (
                            <div key={index} className='flex items-center justify-between py-3 border-b border-gray-100'>
                                <span className='text-black text-base font-normal'>{allowance.name}</span>
                                <span className='text-black text-base font-normal'>{allowance.amount}</span>
                                <span className='text-gray-200 text-sm font-normal flex items-center'>EPF/ETF: {allowance.epfEtf ? '' : 'No'}{allowance.epfEtf && (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="ml-1 h-4 w-4 text-green-500"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                )}</span>
                                <div className='flex items-center gap-2'>
                                    <button onClick={() => handleDeleteAllowance(index)} className='flex items-center gap-2 text-blue-500 font-medium text-base'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                            <circle cx="16" cy="16" r="16" fill="#EFEFEF" />
                                            <path d="M21.8499 20.44C21.9445 20.5339 21.9978 20.6617 21.9978 20.795C21.9978 20.9283 21.9445 21.0561 21.8499 21.15L21.1499 21.85C21.056 21.9446 20.9282 21.9979 20.7949 21.9979C20.6615 21.9979 20.5337 21.9446 20.4399 21.85L15.9999 17.41L11.5599 21.85C11.466 21.9446 11.3382 21.9979 11.2049 21.9979C11.0715 21.9979 10.9437 21.9446 10.8499 21.85L10.1499 21.15C10.0552 21.0561 10.002 20.9283 10.002 20.795C10.002 20.6617 10.0552 20.5339 10.1499 20.44L14.5899 16L10.1499 11.56C10.0552 11.4661 10.002 11.3383 10.002 11.205C10.002 11.0717 10.0552 10.9439 10.1499 10.85L10.8499 10.15C10.9437 10.0553 11.0715 10.0021 11.2049 10.0021C11.3382 10.0021 11.466 10.0553 11.5599 10.15L15.9999 14.59L20.4399 10.15C20.5337 10.0553 20.6615 10.0021 20.7949 10.0021C20.9282 10.0021 21.056 10.0553 21.1499 10.15L21.8499 10.85C21.9445 10.9439 21.9978 11.0717 21.9978 11.205C21.9978 11.3383 21.9445 11.4661 21.8499 11.56L17.4099 16L21.8499 20.44Z" fill="#212121" />
                                        </svg>
                                    </button>
                                    <button onClick={() => handleAllowanceChange(index, 'amount', '10,000.00')} className='flex items-center gap-2 text-blue-500 font-medium text-base'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                            <circle cx="16" cy="16" r="16" fill="#EFEFEF"></circle>
                                            <g clip-path="url(#clip0_1304_413)">
                                                <path d="M20.284 14.2097C20.3652 14.2926 20.4107 14.4041 20.4107 14.5202C20.4107 14.6363 20.3652 14.7477 20.284 14.8307L13.1359 22.0073C12.9644 22.1804 12.7591 22.3163 12.5328 22.4065L8.68384 23.9678C8.60324 24.0002 8.51488 24.0083 8.42973 23.991C8.34459 23.9736 8.26642 23.9316 8.20494 23.8702C8.11609 23.8135 8.05034 23.727 8.01946 23.6262C7.98858 23.5254 7.9946 23.417 8.03643 23.3202L9.56183 19.4702C9.65203 19.2438 9.78789 19.0385 9.96092 18.867L17.1179 11.7081C17.1591 11.6665 17.2081 11.6335 17.2622 11.611C17.3162 11.5885 17.3742 11.5769 17.4327 11.5769C17.4912 11.5769 17.5492 11.5885 17.6032 11.611C17.6573 11.6335 17.7063 11.6665 17.7475 11.7081L20.284 14.2097ZM23.6097 8.97579L23.0244 8.3903C22.7751 8.14069 22.437 8.00029 22.0843 7.99998H21.4103C21.2327 7.99778 21.0564 8.03119 20.8919 8.09822C20.7274 8.16526 20.578 8.26457 20.4525 8.3903L18.8472 10.0137C18.766 10.0966 18.7205 10.2081 18.7205 10.3242C18.7205 10.4403 18.766 10.5518 18.8472 10.6347L21.3393 13.1629C21.3805 13.2045 21.4296 13.2375 21.4836 13.26C21.5377 13.2825 21.5956 13.2941 21.6542 13.2941C21.7127 13.2941 21.7707 13.2825 21.8247 13.26C21.8787 13.2375 21.9278 13.2045 21.969 13.1629L23.6097 11.5484C23.7354 11.4228 23.8347 11.2734 23.9017 11.1088C23.9687 10.9443 24.0021 10.768 23.9999 10.5903V9.91612C23.9996 9.56333 23.8592 9.2251 23.6097 8.97579Z" fill="#333333"></path>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1304_413">
                                                    <rect width="24" height="24" fill="white" transform="translate(4 4)"></rect>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <h3 className='text-left mt-6 font-semibold text-base text-black border-t pt-4 border-gray-100'>Deductions</h3>
                    <div className="input-group">
                        <label className='mt-1 text-sm font-normal text-gray-200 text-left'>Salary Advances, Loan Deductions and all</label>
                        <button onClick={toggleDeductionModal} className='flex items-center gap-2 mt-6 text-blue-500 font-medium text-base'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <g clip-path="url(#clip0_3147_19)">
                                    <path d="M19 11.5V12.5C19 12.6326 18.9473 12.7598 18.8536 12.8536C18.7598 12.9473 18.6326 13 18.5 13H13V18.5C13 18.6326 12.9473 18.7598 12.8536 18.8536C12.7598 18.9473 12.6326 19 12.5 19H11.5C11.3674 19 11.2402 18.9473 11.1464 18.8536C11.0527 18.7598 11 18.6326 11 18.5V13H5.5C5.36739 13 5.24021 12.9473 5.14645 12.8536C5.05268 12.7598 5 12.6326 5 12.5V11.5C5 11.3674 5.05268 11.2402 5.14645 11.1464C5.24021 11.0527 5.36739 11 5.5 11H11V5.5C11 5.36739 11.0527 5.24021 11.1464 5.14645C11.2402 5.05268 11.3674 5 11.5 5H12.5C12.6326 5 12.7598 5.05268 12.8536 5.14645C12.9473 5.24021 13 5.36739 13 5.5V11H18.5C18.6326 11 18.7598 11.0527 18.8536 11.1464C18.9473 11.2402 19 11.3674 19 11.5Z" fill="#0052EA" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_3147_19">
                                        <rect width="24" height="24" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            Add New Deduction
                        </button>
                        <DeductionModal isOpen={isDeductionModalOpen} toggleModal={toggleDeductionModal} onAddDeduction={handleAddDeduction} />
                    </div>
                    <div className='mt-6'>
                        {deductions.map((deduction, index) => (
                            <div key={index} className='flex items-center justify-between py-3 border-b border-gray-100'>
                                <span className='text-black text-base font-normal'>{deduction.name}</span>
                                <span className='text-black text-base font-normal'>{deduction.amount}</span>
                                <span className='text-gray-200 text-sm font-normal'>EPF/ETF: {deduction.epfEtf ? 'Yes' : 'No'}</span>
                                <div className='flex items-center gap-2'>
                                    <button onClick={() => handleDeleteDeduction(index)} className='flex items-center gap-2 text-blue-500 font-medium text-base'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                            <circle cx="16" cy="16" r="16" fill="#EFEFEF" />
                                            <path d="M21.8499 20.44C21.9445 20.5339 21.9978 20.6617 21.9978 20.795C21.9978 20.9283 21.9445 21.0561 21.8499 21.15L21.1499 21.85C21.056 21.9446 20.9282 21.9979 20.7949 21.9979C20.6615 21.9979 20.5337 21.9446 20.4399 21.85L15.9999 17.41L11.5599 21.85C11.466 21.9446 11.3382 21.9979 11.2049 21.9979C11.0715 21.9979 10.9437 21.9446 10.8499 21.85L10.1499 21.15C10.0552 21.0561 10.002 20.9283 10.002 20.795C10.002 20.6617 10.0552 20.5339 10.1499 20.44L14.5899 16L10.1499 11.56C10.0552 11.4661 10.002 11.3383 10.002 11.205C10.002 11.0717 10.0552 10.9439 10.1499 10.85L10.8499 10.15C10.9437 10.0553 11.0715 10.0021 11.2049 10.0021C11.3382 10.0021 11.466 10.0553 11.5599 10.15L15.9999 14.59L20.4399 10.15C20.5337 10.0553 20.6615 10.0021 20.7949 10.0021C20.9282 10.0021 21.056 10.0553 21.1499 10.15L21.8499 10.85C21.9445 10.9439 21.9978 11.0717 21.9978 11.205C21.9978 11.3383 21.9445 11.4661 21.8499 11.56L17.4099 16L21.8499 20.44Z" fill="#212121" />
                                        </svg>
                                    </button>
                                    <button onClick={() => handleDeductionChange(index, 'amount', '10,000.00')} className='flex items-center gap-2 text-blue-500 font-medium text-base'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                            <circle cx="16" cy="16" r="16" fill="#EFEFEF"></circle>
                                            <g clip-path="url(#clip0_1304_413)">
                                                <path d="M20.284 14.2097C20.3652 14.2926 20.4107 14.4041 20.4107 14.5202C20.4107 14.6363 20.3652 14.7477 20.284 14.8307L13.1359 22.0073C12.9644 22.1804 12.7591 22.3163 12.5328 22.4065L8.68384 23.9678C8.60324 24.0002 8.51488 24.0083 8.42973 23.991C8.34459 23.9736 8.26642 23.9316 8.20494 23.8702C8.11609 23.8135 8.05034 23.727 8.01946 23.6262C7.98858 23.5254 7.9946 23.417 8.03643 23.3202L9.56183 19.4702C9.65203 19.2438 9.78789 19.0385 9.96092 18.867L17.1179 11.7081C17.1591 11.6665 17.2081 11.6335 17.2622 11.611C17.3162 11.5885 17.3742 11.5769 17.4327 11.5769C17.4912 11.5769 17.5492 11.5885 17.6032 11.611C17.6573 11.6335 17.7063 11.6665 17.7475 11.7081L20.284 14.2097ZM23.6097 8.97579L23.0244 8.3903C22.7751 8.14069 22.437 8.00029 22.0843 7.99998H21.4103C21.2327 7.99778 21.0564 8.03119 20.8919 8.09822C20.7274 8.16526 20.578 8.26457 20.4525 8.3903L18.8472 10.0137C18.766 10.0966 18.7205 10.2081 18.7205 10.3242C18.7205 10.4403 18.766 10.5518 18.8472 10.6347L21.3393 13.1629C21.3805 13.2045 21.4296 13.2375 21.4836 13.26C21.5377 13.2825 21.5956 13.2941 21.6542 13.2941C21.7127 13.2941 21.7707 13.2825 21.8247 13.26C21.8787 13.2375 21.9278 13.2045 21.969 13.1629L23.6097 11.5484C23.7354 11.4228 23.8347 11.2734 23.9017 11.1088C23.9687 10.9443 24.0021 10.768 23.9999 10.5903V9.91612C23.9996 9.56333 23.8592 9.2251 23.6097 8.97579Z" fill="#333333"></path>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1304_413">
                                                    <rect width="24" height="24" fill="white" transform="translate(4 4)"></rect>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="salary-summary bg-gray-50 border border-gray-100 rounded-lg">
                    <h2 className='font-bold text-black text-lg text-left'>Your salary</h2>
                    <table className='mt-6'>
                        <thead>
                            <tr>
                                <th className='text-sm font-semibold text-gray-200'>Items</th>
                                <th className='text-sm font-semibold text-gray-200'>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='text-black text-base font-normal'>Basic Salary</td>
                                <td className='text-black text-base font-normal'>{basicSalary.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td className='text-black text-base font-normal'>Gross Earning</td>
                                <td className='text-black text-base font-normal'>{calculateGrossEarning().toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td className='text-black text-base font-normal'>Gross Deduction</td>
                                <td className='text-black text-base font-normal'>{calculateGrossDeduction().toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td className='text-black text-base font-normal'>Employee EPF (8%)</td>
                                <td className='text-black text-base font-normal'>{(calculateGrossEarning() * 0.08).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td className='text-black text-base font-normal'>APIT</td>
                                <td className='text-black text-base font-normal'>{calculateApit().toFixed(2)}</td>
                            </tr>
                            <td colSpan="2" className='mt-6'>
                                <div className='border-gray-100 border rounded-lg p-3'>
                                    <div className='flex justify-between'>
                                        <span className='text-black text-base font-semibold'>Net Salary (Take Home)</span>
                                        <span className='text-black text-base font-semibold'>{calculateNetSalary().toFixed(2)}</span>
                                    </div>
                                </div>
                            </td>
                            <tr className='mt-6'>
                                <td className='text-gray-200 text-sm font-semibold'>Contribution from the Employer</td>
                                <td className='text-black text-base font-normal'></td>
                            </tr>
                            <tr>
                                <td className='text-black text-base font-normal'>Employer EPF (12%)</td>
                                <td className='text-black text-base font-normal'>{calculateEmployerEpf().toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td className='text-black text-base font-normal'>Employer ETF (3%)</td>
                                <td className='text-black text-base font-normal'>{calculateEmployerEtf().toFixed(2)}</td>
                            </tr>
                            <td className='!pt-8 !pb-[100px]'>
                                <td className='text-black text-base font-normal'>CTC (Cost to Company)</td>
                                <td className='text-black text-base font-normal'>{calculateCtc().toFixed(2)}</td>
                            </td>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
