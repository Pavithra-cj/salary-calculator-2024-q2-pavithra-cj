import React, { useState } from 'react';

const Modal = ({ isOpen, toggleModal, onAddAllowance }) => {
    const [earningsName, setEarningsName] = useState('');
    const [amount, setAmount] = useState('');
    const [epfEtf, setEpfEtf] = useState(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newAllowance = {
            name: earningsName,
            amount: amount,
            epfEtf: epfEtf
        };
        onAddAllowance(newAllowance);
        setEarningsName('');
        setAmount('');
        setEpfEtf(true);
        toggleModal();
    };

    return (
        isOpen && (
            <div className="modal-overlay" onClick={toggleModal}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <button className="modal-close" onClick={toggleModal}>
                        &times;
                    </button>
                    <h2 className="text-base font-semibold mb-4 text-left border-gray-100 pb-3 border-b">Add New Earnings</h2>
                    <form className='text-left' onSubmit={handleSubmit}>
                        <div className="mt-8">
                            <label className="block mb-2 text-blue-100 font-semibold text-base" htmlFor="earningsName">
                                Earnings Name:
                            </label>
                            <input
                                type="text"
                                id="earningsName"
                                value={earningsName}
                                onChange={(e) => setEarningsName(e.target.value)}
                                className="w-full p-2 pl-5 text-sm text-gray-700"
                                placeholder="Eg: Travel"
                                required
                            />
                        </div>
                        <div className="mt-6">
                            <label className="block mb-2  text-blue-100 font-semibold text-base" htmlFor="amount">
                                Amount:
                            </label>
                            <input
                                type="text"
                                id="amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full p-2 pl-5 text-sm text-gray-700"
                                placeholder="Eg: 10,000"
                                required
                            />
                        </div>
                        <div className="mt-6 flex items-center gap-1 pb-10">
                            <input
                                type="checkbox"
                                id="epfEtf"
                                checked={epfEtf}
                                onChange={(e) => setEpfEtf(e.target.checked)}
                                className="mr-2 w-auto"
                            />
                            <label className="text-sm text-gray-700 m-0" htmlFor="epfEtf">
                                EPF/ETF
                            </label>
                        </div>
                        <div className="flex justify-end border-t border-gray-100 py-5">
                            <button onClick={toggleModal}
                                type="button"
                                className="text-blue-500 font-bold py-2 px-4 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                            >
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

export default Modal;