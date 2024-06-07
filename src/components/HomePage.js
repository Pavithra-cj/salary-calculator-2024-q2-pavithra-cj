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
    };

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

    const calculateApid = () => {
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
                                <span className='text-gray-200 text-sm font-normal'>EPF/ETF: {allowance.epfEtf ? 'Yes' : 'No'}</span>
                                <div className='flex items-center gap-2'>
                                    <button onClick={() => handleDeleteAllowance(index)} className='flex items-center gap-2 text-blue-500 font-medium text-base'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M19 6.75L19 2.25C19 1.10457 17.8954 0 16.75 0H7.25C6.10457 0 5 1.10457 5 2.25V6.75C5 7.89543 6.10457 9 7.25 9H16.75C17.8954 9 19 7.89543 19 6.75Z" fill="#0052EA" />
                                            <path d="M14.25 12.75L14.25 17.25C14.25 18.3954 13.0954 19 12 19H12C10.9046 19 9.75 18.3954 9.75 17.25V12.75C9.75 11.6046 10.9046 11 12 11H12C13.0954 11 14.25 11.6046 14.25 12.75Z" fill="#0052EA" />
                                            <path d="M9.75 12.75L9.75 17.25C9.75 18.3954 8.59543 19 7.5 19H7.5C6.40457 19 5.25 18.3954 5.25 17.25V12.75C5.25 11.6046 6.40457 11 7.5 11H7.5C8.59543 11 9.75 11.6046 9.75 12.75Z" fill="#0052EA" />
                                        </svg>
                                    </button>
                                    <button onClick={() => handleAllowanceChange(index, 'amount', '10,000.00')} className='flex items-center gap-2 text-blue-500 font-medium text-base'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M16.875 16.875L20.375 13.375C20.775 12.975 20.775 12.375 20.375 11.975L16.875 8.475C16.475 8.075 15.875 8.075 15.475 8.475L12 11.975L8.525 8.475C8.125 8.075 7.525 8.075 7.125 8.475L3.625 11.975C3.225 12.375 3.225 12.975 3.625 13.375L7.125 16.875C7.525 17.275 8.125 17.275 8.525 16.875L12 13.375L15.475 16.875C15.875 17.275 16.475 17.275 16.875 16.875Z" fill="#0052EA" />
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
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M19 6.75L19 2.25C19 1.10457 17.8954 0 16.75 0H7.25C6.10457 0 5 1.10457 5 2.25V6.75C5 7.89543 6.10457 9 7.25 9H16.75C17.8954 9 19 7.89543 19 6.75Z" fill="#0052EA" />
                                            <path d="M14.25 12.75L14.25 17.25C14.25 18.3954 13.0954 19 12 19H12C10.9046 19 9.75 18.3954 9.75 17.25V12.75C9.75 11.6046 10.9046 11 12 11H12C13.0954 11 14.25 11.6046 14.25 12.75Z" fill="#0052EA" />
                                            <path d="M9.75 12.75L9.75 17.25C9.75 18.3954 8.59543 19 7.5 19H7.5C6.40457 19 5.25 18.3954 5.25 17.25V12.75C5.25 11.6046 6.40457 11 7.5 11H7.5C8.59543 11 9.75 11.6046 9.75 12.75Z" fill="#0052EA" />
                                        </svg>
                                    </button>
                                    <button onClick={() => handleDeductionChange(index, 'amount', '10,000.00')} className='flex items-center gap-2 text-blue-500 font-medium text-base'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M16.875 16.875L20.375 13.375C20.775 12.975 20.775 12.375 20.375 11.975L16.875 8.475C16.475 8.075 15.875 8.075 15.475 8.475L12 11.975L8.525 8.475C8.125 8.075 7.525 8.075 7.125 8.475L3.625 11.975C3.225 12.375 3.225 12.975 3.625 13.375L7.125 16.875C7.525 17.275 8.125 17.275 8.525 16.875L12 13.375L15.475 16.875C15.875 17.275 16.475 17.275 16.875 16.875Z" fill="#0052EA" />
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
                                <td className='text-black text-base font-normal'>{calculateApid().toFixed(2)}</td>
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
