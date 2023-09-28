import React, { useEffect, useState } from "react";

interface Token {
    name: string;
    liquidity: string;
}

const ITEMS_PER_PAGE = 3;

const LiquidityBlock = () => {
    
    const [tokenData, setTokenData] = useState<Token[] | null>(null);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/gecko');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const responseData = await response.json();
                setTokenData(responseData.liquidity);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const paginatedTokenData = tokenData?.slice(
        currentPage * ITEMS_PER_PAGE,
        (currentPage + 1) * ITEMS_PER_PAGE
    );

    const totalPages = Math.ceil((tokenData?.length || 0) / ITEMS_PER_PAGE);

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
    };

    return (
        <div className="my-4 mx-4 rounded-2xl p-4 flex flex-col bg-gray-800 h-[170px]">
            <div className="flex flex-col justify-between flex-grow">
                <div className="mb-2 flex items-center justify-start">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#21d3cc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        <h2 className="text-lg font-semibold text-gray-200 ml-2">Liquidity</h2>
                    </div>
                    <div className="flex gap-1 ml-auto">
                        <button onClick={handlePreviousPage} disabled={currentPage === 0} id="navBtnPrev" className={`inline-flex items-center border border-transparent font-medium shadow-sm focus:outline-none text-sm rounded-full p-1 ${currentPage === 0 ? 'pointer-events-none bg-gray-600/30 text-gray-500' : 'bg-gray-600/30 text-gray-500 hover:bg-gray-600/30 hover:text-gray-500'}`} aria-label="Prev">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="" width="14" height="14">
                                <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd"></path>
                            </svg>
                        </button>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages - 1} id="navBtnNext" className="inline-flex items-center border border-transparent font-medium shadow-sm focus:outline-none text-sm rounded-full p-1 bg-violet-600/60 text-violet-200 hover:bg-violet-600/70 hover:text-violet-200" aria-label="Next">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="rotate-180" width="14" height="14">
                                <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="keen-slider flex-grow">
                    {paginatedTokenData?.map((token, index) => (
                        <div
                            key={index}
                            className="keen-slider__slide lazy__slide"
                            style={{ minWidth: '311px', maxWidth: '311px', transform: 'translate3d(0px, 0px, 0px)' }}
                        >
                            <table className="mb-2 w-full text-sm text-gray-400">
                                <tr key={index}>
                                    <td style={{ width: '200px', textAlign: 'left' }}>
                                        {currentPage * ITEMS_PER_PAGE + index + 1}. {token.name}
                                    </td>
                                    <td className="text-right text-white">{token.liquidity} USD</td>
                                </tr>
                            </table>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center gap-2">
                    <button
                        aria-label="Slide 1"
                        className={`bg-violet-600 h-2 w-2 rounded-full ${currentPage === 0 ? 'bg-violet-600' : 'bg-gray-600'}`}
                    ></button>
                    <button
                        aria-label="Slide 2"
                        className={`bg-gray-600 h-2 w-2 rounded-full ${currentPage === 1 ? 'bg-violet-600' : 'bg-gray-600'}`}
                    ></button>
                </div>
            </div>
        </div>
    );
}

export default LiquidityBlock;