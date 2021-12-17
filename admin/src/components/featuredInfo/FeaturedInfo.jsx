import "./featuredInfo.css";
import {ArrowDownward, ArrowUpward} from "@mui/icons-material"
export default function FeaturedInfo() {
    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">Vanue</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">2400</span>
                    <span className="featuredMoneyRate">
                        -2,4<ArrowDownward className="featuredIcon negative"/>
                    </span>
                </div>
                <span className="featuredSub">Last Month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Jhon</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">1234</span>
                    <span className="featuredMoneyRate">
                        +2,4<ArrowUpward className="featuredIcon"/>
                    </span>
                </div>
                <span className="featuredSub">Last Month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Akshan</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">3210</span>
                    <span className="featuredMoneyRate">
                        -3,4<ArrowDownward className="featuredIcon negative"/>
                    </span>
                </div>
                <span className="featuredSub">Last Month</span>
            </div>
        </div>
    )
}
