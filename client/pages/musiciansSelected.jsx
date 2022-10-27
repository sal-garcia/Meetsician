import React, { useContext, useEffect } from 'react';
import { UserContext } from '../lib/MainContext';
import MusiciansAccounts from '../components/musicians-account';

function MusiciansSelected() {
  const context = useContext(UserContext);
  // console.log(context, 'context');
  useEffect(() => {
    const params = new URLSearchParams(window.location.href);
    const instrument = params.get('instrument');
    // console.log(params, 'params');
    // console.log(window.location, 'window');
    fetch(`/api/musiciantypes?instrument=${instrument}`)
      .then(response => response.json())
      .then(data => {
        // console.log(data);
      });

    //         console.log(data.data);
    //         if (data.data.length > 0) {

    //           let temp = '';
    //           data.data.forEach(itemData => {
    //             temp += '<tr>';
    //             temp += '<td>' + itemData.id + '</td>';
    //             temp += '<td>' + itemData.employee_name + '</td>';
    //             temp += '<td>' + itemData.employee_salary + '</td></tr>';
    //           });
    //           document.getElementById('data').innerHTML = temp;
    //         }
    //       }
    //     );
    //   }
    // );

  }, []);
  return (
    <div className="d-flex align-content-around flex-wrap">
      <pre className='purple'>{JSON.stringify(context)}</pre>
      <MusiciansAccounts />
      <MusiciansAccounts />

    </div>
  );
}
export default MusiciansSelected;
