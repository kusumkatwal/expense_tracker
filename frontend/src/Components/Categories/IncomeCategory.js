import { useEffect } from "react";
import { useGlobalContext } from "../../context/globalContext";


function IncomeCategory() {

    const {categoryData, monthlyCategory} = useGlobalContext();

    useEffect(() => {
        monthlyCategory()
    },[])
        return ( <>
            <h1> Sorting Incomy By Category</h1>
            <div className="category-div">
                {
                    categoryData.map((categoryItem) => {
                        const { _id: categoryID, totalAmount: categoryTotalAmount } = categoryItem;
                        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                    const month = months[categoryID.month - 1];
                        return(
                            <div className="category" key={`${categoryID.category}`}>
                                <h5>{`${month},${categoryID.year}`}</h5>
                                <h5>{`${categoryID.category}`}</h5>
                                <p>Rs {categoryTotalAmount}</p>
                                </div>
                        )
                    })
                }
            </div>
    </>)
}

export default IncomeCategory;