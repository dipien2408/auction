import "./widgetLg.css"

export default function WidgetLg() {
    const Button = ({type}) => {
        return <button className={"widgetLgButton " + type} >{type}</button>;
    }
    return (
        <div className="widgetLg">
            <h3 className="widgetLgTitle">Last Transactions</h3>
            <table className="widgetLgTable">
                <tbody>
                <tr className="widgetLgTr">
                    <th className="widgetLgTh">Customer</th>
                    <th className="widgetLgTh">Date</th>
                    <th className="widgetLgTh">Amount</th>
                    <th className="widgetLgTh">Status</th>
                </tr>
                <tr className="widgetLgTr">
                    <td className="widgetLgUser">
                        <img src="https://firebasestorage.googleapis.com/v0/b/ec-pj-f6c33.appspot.com/o/ava1.jpg?alt=media&token=https://firebasestorage.googleapis.com/v0/b/ec-pj-f6c33.appspot.com/o/ava1.jpg?alt=media&token=ce2b2793-0e73-4179-afd9-a94c915b01e2"
                         alt="" className="widgetLgImage" />
                        <span className="widgetLgName">Susan</span>
                    </td>
                    <td className="widgetLgDate">2 Jun 2021</td>
                    <td className="widgetLgAmount">$122</td>
                    <td className="widgetLgStatus">
                        <Button type="Approved"/>
                    </td>
                </tr>
                <tr className="widgetLgTr">
                    <td className="widgetLgUser">
                        <img src="https://firebasestorage.googleapis.com/v0/b/ec-pj-f6c33.appspot.com/o/ava1.jpg?alt=media&token=https://firebasestorage.googleapis.com/v0/b/ec-pj-f6c33.appspot.com/o/ava1.jpg?alt=media&token=ce2b2793-0e73-4179-afd9-a94c915b01e2"
                         alt="" className="widgetLgImage" />
                        <span className="widgetLgName">Susan</span>
                    </td>
                    <td className="widgetLgDate">2 Jun 2021</td>
                    <td className="widgetLgAmount">$122</td>
                    <td className="widgetLgStatus">
                        <Button type="Declined"/>
                    </td>
                </tr>
                <tr className="widgetLgTr">
                    <td className="widgetLgUser">
                        <img src="https://firebasestorage.googleapis.com/v0/b/ec-pj-f6c33.appspot.com/o/ava1.jpg?alt=media&token=https://firebasestorage.googleapis.com/v0/b/ec-pj-f6c33.appspot.com/o/ava1.jpg?alt=media&token=ce2b2793-0e73-4179-afd9-a94c915b01e2"
                         alt="" className="widgetLgImage" />
                        <span className="widgetLgName">Susan</span>
                    </td>
                    <td className="widgetLgDate">2 Jun 2021</td>
                    <td className="widgetLgAmount">$122</td>
                    <td className="widgetLgStatus">
                        <Button type="Pending"/>
                    </td>
                </tr>
                <tr className="widgetLgTr">
                    <td className="widgetLgUser">
                        <img src="https://firebasestorage.googleapis.com/v0/b/ec-pj-f6c33.appspot.com/o/ava1.jpg?alt=media&token=https://firebasestorage.googleapis.com/v0/b/ec-pj-f6c33.appspot.com/o/ava1.jpg?alt=media&token=ce2b2793-0e73-4179-afd9-a94c915b01e2"
                         alt="" className="widgetLgImage" />
                        <span className="widgetLgName">Susan</span>
                    </td>
                    <td className="widgetLgDate">2 Jun 2021</td>
                    <td className="widgetLgAmount">$122</td>
                    <td className="widgetLgStatus">
                        <Button type="Approved"/>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}
