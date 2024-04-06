import Dashboard from "../homepage/dashboard_card";
import Header from "../common/Header";
import Notification from "../homepage/notification";
const Homepage = () => {
    
    return (
        <>
            <Header />
            <div className="main">
                <div className="main-row">
                    <div className="main-left">
                        <h2 id="main-head">Dashboard</h2>
                        <Dashboard />
                    </div>

                    <div className="main-right">
                        <Notification />
                    </div>

                </div>
                
            </div>

        </>
    );
}
export default Homepage;