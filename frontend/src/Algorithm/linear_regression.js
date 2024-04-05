import { useGlobalContext } from '../context/globalContext';

const Algorithm = () => {
    const {incomes, expenses} = useGlobalContext();
    // var value = incomes.amount;
    var x_train;

    function make_prediction(incomes, expenses) {
        x_train = incomes.map((income) => income.amount);
       // console.log(x_train);
        const y_train = expenses.map((record) => record.amount);
        //console.log(y_train);
    
        const [intercept, slope] = coefficient(x_train, y_train);
        // console.log(intercept);
        // console.log(slope)
        //const x_test = test.map((record) => record['total savings accumulated over time']);
        const y_pred = (intercept + 30000 * slope);
        console.log('the predicted val is ' + y_pred.toFixed(2));
    
        return y_pred.toFixed(2);
    }
    
    const coefficient = (x, y) => {
        const x_mean = mean(x);
        const y_mean = mean(y);
        const x_variance = variance(x, x_mean);     //x-mean
        const co_variance = covariance(x, x_mean, y, y_mean);
        // console.log(x_variance)
        // console.log(co_variance)
    
        var slope = co_variance / x_variance;
        var intercept = y_mean - slope * x_mean;
        //console.log(slope)
        // console.log(intercept)
    
        return [intercept, slope];
    
    }
    
    const mean = (X) => {
        var sum = 0;
        for (var i = 0; i < X.length; i++) {
            sum += X[i];
        }
        return (sum / X.length);
    }

    const variance = (X, m) => {
        var sumOfSquares=0;
        for (var i = 0; i < X.length; i++) {
           sumOfSquares += (X[i] - m) ** 2;
        }
        var meanVariance = sumOfSquares/X.length;
        // console.log(meanVariance);
        return (meanVariance);
    }
    
    const covariance = (x, m1, y, m2) => {
        var result = 0;
        for (var i = 0; i < x.length; i++) {
            if(!x[i])
            {
                x[i] = 0
            }
            if(!y[i])
            {
                y[i] = 0
            }
            var a = (x[i] - m1);
            var b = (y[i] - m2);
            var mul = a * b;
            result += mul;
           
        }
        // console.log("mul is " + mul)
        // console.log("result is " + result)
        // console.log(result)
    var mean_result = result/x.length;
    //console.log(result);
        return (mean_result);
    }
   const pred= make_prediction(incomes,expenses)
    return ( 
        <>
        <h1>Your predicted expenses for next month</h1>
       <p>{pred}</p>
        
        </>
    )

}
export default Algorithm;