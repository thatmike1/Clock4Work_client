import { useState, useEffect } from 'react';
//components
import Header from '@/components/Header.jsx';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
//react table
import { columns } from '@/lib/columns.js';
//firebase
import { auth, db } from '../lib/firebase.js';
import { onValue, ref } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import DataTable from '@/components/DataTable.jsx';
import { MONTHS } from '@/lib/months.js';
import ManualNewMonth from '@/components/ManualNewMonth.jsx';

const TableView = () => {
  const [userID, setUserID] = useState('');
  const [userName, setUserName] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  const [selectedMonth, setSelectedMonth] = useState(MONTHS[0]); // This will hold the selected month
  const [data, setData] = useState([]); // This will hold the data for the selected month

  //fetching data from db and getting userID
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const username = user.displayName;
        const photoURL = user.photoURL;
        setUserName(username);
        setPhotoURL(photoURL);
        setUserID(uid);
      } else {
        console.log('user is logged out');
      }
    });
  }, []);

  useEffect(() => {
    if (userID) {
      const year = '2024';
      const query = ref(
        db,
        `users/${userID}/attendance/years/${year}/${selectedMonth}`
      );
      onValue(query, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          let formattedData = Object.keys(data)
            .map((key) => {
              // Check if the key is not 'sumOfPaid' or 'sumOfHours'
              if (key !== 'sumOfPaid' && key !== 'sumOfHours') {
                return {
                  id: key,
                  ...data[key],
                };
              }
              return null; // Ignore 'sumOfPaid' and 'sumOfHours'
            })
            .filter((item) => item !== null);

          formattedData = formattedData.sort((a, b) => {
            const aId = parseInt(a.id.replace('attendanceId_', ''), 10);
            const bId = parseInt(b.id.replace('attendanceId_', ''), 10);
            return aId - bId;
          });
          setData(formattedData);
        }
      });
    }
  }, [userID, selectedMonth]);

  const totalHoursWorked = data.reduce((sum, attendance) => {
    // Use the unary plus operator (+) to convert the hoursWorked value to a number
    const hoursWorked = +attendance.hoursWorked || 0;
    return sum + hoursWorked;
  }, 0);

  const totalPaid = data.reduce((sum, attendance) => {
    // Use the unary plus operator (+) to convert the hoursWorked value to a number
    const hoursWorked = +attendance.paid || 0;
    return sum + hoursWorked;
  }, 0);

  return (
    <div className="">
      <Header
        setSelectedMonth={setSelectedMonth}
        selectedMonth={selectedMonth}
        MONTHS={MONTHS}
        auth={auth}
        username={userName}
        photoURL={photoURL}
      />
      <div className="p-1">
        <ResizablePanelGroup
          direction="horizontal"
          className="rounded-lg border"
        >
          <ResizablePanel defaultSize={65}>
            <DataTable
              data={data}
              columns={columns}
              userID={userID}
              selectedMonth={selectedMonth}
              setData={setData}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={35}>
            <div className="h-auto p-4">
              <h2>Celkový počet odpracovaných hodin: {totalHoursWorked}</h2>
              <h2>Celková počet pole zaplaceno: {totalPaid}</h2>

              {/* <ManualNewMonth userID={userID} /> */}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};
export default TableView;
